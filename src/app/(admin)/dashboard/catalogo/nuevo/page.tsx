"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { CldUploadWidget } from "next-cloudinary";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiSave, FiAlertCircle, FiUploadCloud, FiCheck, FiPlus, FiRefreshCw } from "react-icons/fi";

type Categoria = {
    id: string;
    nombre: string;
    slug: string;
};

export default function NuevoProductoMaestroPage() {
    const router = useRouter();
    const supabase = createClient();

    // === ESTADOS: PRODUCTO BASE ===
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precioBase, setPrecioBase] = useState("");
    const [squadTip, setSquadTip] = useState("");
    const [paqueteIncluye, setPaqueteIncluye] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [categoriaSlug, setCategoriaSlug] = useState("general");

    // === ESTADOS: CATÁLOGOS ===
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [tallasBD, setTallasBD] = useState<any[]>([]);
    const [coloresBD, setColoresBD] = useState<any[]>([]);

    // === ESTADOS: VARIANTE Y COLOR ===
    const [imagenSenueloUrl, setImagenSenueloUrl] = useState("");
    const [imagenSwatchUrl, setImagenSwatchUrl] = useState("");
    const [colorInput, setColorInput] = useState("");
    const [tallasSeleccionadas, setTallasSeleccionadas] = useState<string[]>([]);
    const [nuevaTallaInput, setNuevaTallaInput] = useState("");

    // === ESTADOS: UI ===
    const [loading, setLoading] = useState(false);
    const [cargandoDatos, setCargandoDatos] = useState(true); // <-- NUEVO: Bloqueador inicial
    const [error, setError] = useState<string | null>(null);
    const [exito, setExito] = useState<string | null>(null);

    useEffect(() => {
        async function cargarCatalogosIniciales() {
            // Cargar Categorías
            const { data: cats } = await supabase.from("categorias").select("id, nombre, slug").order("nombre");
            if (cats && cats.length > 0) {
                setCategorias(cats);
                setCategoriaId(cats[0].id);
                setCategoriaSlug(cats[0].slug || "general");
            }

            // Cargar Tallas y Colores
            const { data: talls } = await supabase.from("especificaciones").select("*").eq("tipo", "talla").order("orden");
            const { data: cols } = await supabase.from("colores").select("*").order("nombre");

            if (talls) setTallasBD(talls);
            if (cols) setColoresBD(cols);

            setCargandoDatos(false); // Quitamos el bloqueador al terminar
        }
        cargarCatalogosIniciales();
    }, [supabase]);

    // Manejador cuando cambia la categoría
    const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setCategoriaId(selectedId);
        const cat = categorias.find(c => c.id === selectedId);
        if (cat) setCategoriaSlug(cat.slug || "general");
    };

    const generarSlug = (texto: string) => {
        return texto.toLowerCase().trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleCrearTalla = async () => {
        if (!nuevaTallaInput.trim()) return;
        const { data, error } = await supabase
            .from("especificaciones")
            .insert([{ tipo: "talla", valor: nuevaTallaInput.trim(), orden: 99 }])
            .select().single();

        if (!error && data) {
            setTallasBD([...tallasBD, data]);
            setNuevaTallaInput("");
        }
    };

    const handleSubmitMaster = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setExito(null);

        if (!imagenSenueloUrl) return setError("Debes subir una foto del señuelo.");
        if (!colorInput.trim()) return setError("Debes especificar un color.");
        if (!imagenSwatchUrl) return setError("Debes subir la foto de textura (swatch) del color.");
        if (tallasSeleccionadas.length === 0) return setError("Debes seleccionar al menos una talla.");

        setLoading(true);

        try {
            // 1. CREAR EL PRODUCTO BASE
            const slugP = generarSlug(nombre);
            const { data: nuevoProducto, error: errorProducto } = await supabase
                .from("productos")
                .insert([{
                    nombre,
                    slug: slugP,
                    descripcion,
                    precio_base: parseFloat(precioBase),
                    squad_tip: squadTip,
                    paquete_incluye: paqueteIncluye,
                    categoria_id: categoriaId,
                    is_active: true
                }])
                .select().single();

            if (errorProducto) throw errorProducto;
            const productoGeneradoId = nuevoProducto.id;

            // 2. RESOLVER COLOR
            let finalColorId = coloresBD.find(c => c.nombre.toLowerCase() === colorInput.trim().toLowerCase())?.id;

            if (!finalColorId) {
                const { data: nuevoColor, error: errColor } = await supabase
                    .from("colores")
                    .insert([{ nombre: colorInput.trim(), swatch_url: imagenSwatchUrl }])
                    .select().single();

                if (errColor) throw errColor;
                finalColorId = nuevoColor.id;
            } else {
                await supabase.from("colores").update({ swatch_url: imagenSwatchUrl }).eq("id", finalColorId);
            }

            // 3. GENERAR LAS VARIANTES
            const nuevasVariantes = tallasSeleccionadas.map(tallaId => {
                const tallaObj = tallasBD.find(t => t.id === tallaId);
                const skuTalla = tallaObj?.valor.replace(/[^a-zA-Z0-9]/g, '') || 'X';
                const slugC = colorInput.substring(0, 3).toUpperCase();

                const skuGenerado = `GEC-${slugP.substring(0, 3).toUpperCase()}-${slugC}-${skuTalla}-${Math.floor(Math.random() * 100)}`;

                return {
                    producto_id: productoGeneradoId,
                    color_id: finalColorId,
                    especificacion_id: tallaId,
                    stock: 999,
                    imagen_principal_url: imagenSenueloUrl,
                    sku: skuGenerado
                };
            });

            const { error: errVariantes } = await supabase.from("producto_variantes").insert(nuevasVariantes);
            if (errVariantes) throw errVariantes;

            // 4. ÉXITO
            setExito("¡Arsenal forjado con éxito! Redirigiendo al catálogo...");
            setTimeout(() => {
                router.push("/dashboard/catalogo");
            }, 1500);

        } catch (err: any) {
            setError(err.message || "Ocurrió un error al ensamblar el producto.");
            setLoading(false);
        }
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setColorInput(val);
        const colorExistente = coloresBD.find(c => c.nombre.toLowerCase() === val.toLowerCase());
        if (colorExistente) {
            setImagenSwatchUrl(colorExistente.swatch_url);
        }
    };

    // Bloqueador hasta que carguen las categorías
    if (cargandoDatos) {
        return <div className="p-8 text-gray-900 dark:text-white font-bold uppercase tracking-widest text-xs">Preparando estación de forja...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            <div className="flex items-center gap-4 border-b border-gray-200 dark:border-zinc-800 pb-6">
                <Link href="/dashboard/catalogo" className="p-2 bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 rounded-md hover:text-orange-500 transition-colors">
                    <FiArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white">
                        Forjar Nuevo Señuelo
                    </h1>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400 mt-1">
                        Centro de Ensamblaje Todo en Uno
                    </p>
                </div>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-md flex items-center gap-3 text-sm font-bold uppercase tracking-widest">
                    <FiAlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            {exito && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-md flex items-center gap-3 text-sm font-bold uppercase tracking-widest">
                    <FiCheck className="w-5 h-5" />
                    {exito}
                </div>
            )}

            <form onSubmit={handleSubmitMaster} className="space-y-8">

                {/* BLOQUE 1: INFO BASE */}
                <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 rounded-lg p-6 md:p-8 shadow-sm space-y-6">
                    <h2 className="font-display font-black text-lg uppercase text-orange-500 border-b border-gray-200 dark:border-zinc-800 pb-2">1. ADN del Producto</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">
                                Nombre del Señuelo <span className="text-orange-500">*</span>
                            </label>
                            <input
                                type="text" required
                                value={nombre} onChange={(e) => setNombre(e.target.value)}
                                placeholder="Ej: Geco Craw"
                                className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 rounded-md p-3 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">
                                Categoría <span className="text-orange-500">*</span>
                            </label>
                            <select
                                value={categoriaId} onChange={handleCategoriaChange}
                                className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 rounded-md p-3 text-sm font-bold uppercase text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                            >
                                {categorias.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2 w-full md:w-1/2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">
                            Precio Base (MXN) <span className="text-orange-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                            <input
                                type="number" step="0.01" required
                                value={precioBase} onChange={(e) => setPrecioBase(e.target.value)}
                                placeholder="185.00"
                                className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 rounded-md pl-8 pr-3 py-3 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">
                                Descripción Técnica
                            </label>
                            <textarea
                                rows={3}
                                value={descripcion} onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Describe la acción, material y uso sugerido..."
                                className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 rounded-md p-3 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                            />
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">
                                    El paquete incluye
                                </label>
                                <textarea
                                    rows={3}
                                    value={paqueteIncluye} onChange={(e) => setPaqueteIncluye(e.target.value)}
                                    placeholder="Ej: 8 señuelos de plástico suave infundidos con sal..."
                                    className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 rounded-md p-3 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-orange-500 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">military_tech</span> Squad Tip (Opcional)
                            </label>
                            <textarea
                                rows={3}
                                value={squadTip} onChange={(e) => setSquadTip(e.target.value)}
                                placeholder="Ej: Móntalo en un Texas Rig ligero para penetrar cobertura..."
                                className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-orange-500/30 rounded-md p-3 text-sm font-medium italic text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* BLOQUE 2: COLOR Y FABRICACIÓN */}
                <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 rounded-lg p-6 md:p-8 shadow-sm space-y-6">
                    <h2 className="font-display font-black text-lg uppercase text-orange-500 border-b border-gray-200 dark:border-zinc-800 pb-2">2. Configuración de Lote y Color</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* IZQUIERDA: Fotos */}
                        <div className="lg:col-span-5 space-y-6">

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">
                                    Foto Principal del Señuelo <span className="text-orange-500">*</span>
                                </label>
                                {/* TRUCO REACT: Usamos key={categoriaSlug} para obligar al widget a recrearse si cambias la categoría */}
                                <CldUploadWidget
                                    key={categoriaSlug}
                                    uploadPreset="gecolures_preset"
                                    options={{ folder: `gecolures/${categoriaSlug}` }}
                                    onSuccess={(res: any) => setImagenSenueloUrl(res.info.secure_url)}
                                >
                                    {({ open }) => (
                                        <div
                                            onClick={() => open()}
                                            className={`w-full aspect-[4/3] border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden relative ${imagenSenueloUrl ? 'border-orange-500 bg-zinc-50 dark:bg-[#0a0a0a]' : 'border-gray-300 dark:border-zinc-700 bg-zinc-50 dark:bg-[#0a0a0a] hover:border-orange-500'}`}
                                        >
                                            {imagenSenueloUrl ? (
                                                <>
                                                    <Image src={imagenSenueloUrl} alt="Preview" fill className="object-contain p-4" />
                                                    <div className="absolute top-2 right-2 bg-green-500 text-white p-1.5 rounded-full shadow-lg"><FiCheck className="w-4 h-4" /></div>
                                                </>
                                            ) : (
                                                <>
                                                    <FiUploadCloud className="w-8 h-8 text-gray-400 dark:text-zinc-500 mb-2" />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-500 text-center px-4">Subir Señuelo Completo</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </CldUploadWidget>
                            </div>

                            {/* Perfil del Color y Textura */}
                            <div className="bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 p-4 rounded-lg space-y-4">
                                <div className="space-y-2 relative">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">
                                        Nombre del Color <span className="text-orange-500">*</span>
                                    </label>
                                    <input
                                        type="text" list="lista-colores-base" required
                                        placeholder="Ej. June Bug"
                                        value={colorInput} onChange={handleColorChange}
                                        className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 p-2.5 rounded text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-orange-500"
                                    />
                                    <datalist id="lista-colores-base">
                                        {coloresBD.map(c => <option key={c.id} value={c.nombre} />)}
                                    </datalist>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">
                                        Textura (Swatch) <span className="text-orange-500">*</span>
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <CldUploadWidget
                                            uploadPreset="gecolures_preset"
                                            options={{ folder: `gecolures/colores` }}
                                            onSuccess={(res: any) => setImagenSwatchUrl(res.info.secure_url)}
                                        >
                                            {({ open }) => (
                                                <button
                                                    type="button" onClick={() => open()}
                                                    className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 hover:border-orange-500 text-gray-600 dark:text-zinc-400 p-2 rounded text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
                                                >
                                                    <FiUploadCloud className="w-4 h-4" /> Subir Textura
                                                </button>
                                            )}
                                        </CldUploadWidget>

                                        {imagenSwatchUrl && (
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-8 h-8 rounded-full border border-gray-300 dark:border-zinc-600 shadow-sm"
                                                    style={{ backgroundImage: `url(${imagenSwatchUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                                />
                                                <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1"><FiCheck /> Listo</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* DERECHA: Tallas */}
                        <div className="lg:col-span-7 space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">
                                Tallas a Fabricar en este Color <span className="text-orange-500">*</span>
                            </label>

                            {tallasBD.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {tallasBD.map((talla) => {
                                        const isSelected = tallasSeleccionadas.includes(talla.id);
                                        return (
                                            <label
                                                key={talla.id}
                                                className={`flex items-center justify-center p-3 border rounded text-xs font-bold cursor-pointer transition-colors ${isSelected
                                                        ? 'bg-orange-500 border-orange-500 text-white shadow-sm'
                                                        : 'bg-zinc-50 dark:bg-[#0a0a0a] border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 hover:border-orange-500'
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox" className="hidden"
                                                    checked={isSelected}
                                                    onChange={(e) => {
                                                        if (e.target.checked) setTallasSeleccionadas([...tallasSeleccionadas, talla.id]);
                                                        else setTallasSeleccionadas(tallasSeleccionadas.filter(id => id !== talla.id));
                                                    }}
                                                />
                                                {talla.valor}
                                            </label>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Agregar Talla Rápida */}
                            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-zinc-800">
                                <input
                                    type="text"
                                    placeholder='Nueva talla rápida (Ej: 6.5")'
                                    value={nuevaTallaInput}
                                    onChange={(e) => setNuevaTallaInput(e.target.value)}
                                    className="flex-1 bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 p-2.5 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:border-orange-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleCrearTalla}
                                    className="bg-gray-200 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 px-4 rounded hover:text-orange-500 hover:bg-orange-500/10 transition-colors font-bold text-[10px] uppercase tracking-widest"
                                >
                                    Añadir <FiPlus className="inline ml-1" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* BOTÓN FINAL */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit" disabled={loading}
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 dark:disabled:bg-zinc-700 text-white px-10 py-4 font-black uppercase tracking-widest text-sm rounded-md shadow-xl transition-all hover:-translate-y-1"
                    >
                        {loading ? <FiRefreshCw className="w-5 h-5 animate-spin" /> : <FiSave className="w-5 h-5" />}
                        {loading ? "FORJANDO ARSENAL..." : "LANZAR AL CATÁLOGO"}
                    </button>
                </div>

            </form>
        </div>
    );
}