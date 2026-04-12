"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { CldUploadWidget } from "next-cloudinary";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiUploadCloud, FiSave, FiImage, FiCheck, FiRefreshCw, FiPlus, FiAlertCircle } from "react-icons/fi";

export default function EditarProductoPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const productoId = params.id as string;

  const [producto, setProducto] = useState<any>(null);
  
  // === NUEVOS ESTADOS: INFORMACIÓN BASE ===
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioBase, setPrecioBase] = useState("");
  const [squadTip, setSquadTip] = useState("");
  const [paqueteIncluye, setPaqueteIncluye] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loadingBase, setLoadingBase] = useState(false);

  // === ESTADOS: CATÁLOGOS Y VARIANTES ===
  const [colores, setColores] = useState<any[]>([]);
  const [tallas, setTallas] = useState<any[]>([]);
  const [variantes, setVariantes] = useState<any[]>([]);

  // === ESTADOS: FORMULARIO DE VARIANTE ===
  const [colorInput, setColorInput] = useState("");
  const [imagenSwatchUrl, setImagenSwatchUrl] = useState("");
  const [tallasSeleccionadas, setTallasSeleccionadas] = useState<string[]>([]);
  const [nuevaTallaInput, setNuevaTallaInput] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  
  // === ESTADOS: UI ===
  const [loadingVariante, setLoadingVariante] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const { data: prod } = await supabase
        .from("productos")
        .select("*, categorias(nombre, slug)")
        .eq("id", productoId)
        .single();
      
      setProducto(prod);

      // ¡LA MAGIA DE LA PRECARGA! Llenamos los inputs con lo que viene de la BD
      if (prod) {
        setNombre(prod.nombre || "");
        setDescripcion(prod.descripcion || "");
        setPrecioBase(prod.precio_base?.toString() || "");
        setSquadTip(prod.squad_tip || "");
        setPaqueteIncluye(prod.paquete_incluye || "");
        setCategoriaId(prod.categoria_id || "");
      }

      await cargarCatalogos();
      await cargarVariantes();
    }
    loadData();
  }, [productoId]);

  const cargarCatalogos = async () => {
    const { data: cats } = await supabase.from("categorias").select("*").order("nombre");
    const { data: cols } = await supabase.from("colores").select("*").order("nombre");
    const { data: talls } = await supabase.from("especificaciones").select("*").eq("tipo", "talla").order("orden");
    
    if (cats) setCategorias(cats);
    if (cols) setColores(cols);
    if (talls) setTallas(talls);
  };

  const cargarVariantes = async () => {
    const { data } = await supabase
      .from("producto_variantes")
      .select(`
        id, stock, sku, imagen_principal_url,
        colores (nombre, swatch_url),
        especificaciones (valor)
      `)
      .eq("producto_id", productoId);
    setVariantes(data || []);
  };

  const generarSlug = (texto: string) => {
    return texto.toLowerCase().trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // === GUARDAR CAMBIOS DE LA INFO BASE ===
  const handleActualizarInfoBase = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setExito(null);
    setLoadingBase(true);

    try {
      const slugP = generarSlug(nombre);
      const { error: errUpdate } = await supabase
        .from("productos")
        .update({
          nombre,
          slug: slugP,
          descripcion,
          precio_base: parseFloat(precioBase),
          squad_tip: squadTip,
          paquete_incluye: paqueteIncluye,
          categoria_id: categoriaId
        })
        .eq("id", productoId);

      if (errUpdate) throw errUpdate;
      
      setExito("¡Información del señuelo actualizada correctamente!");
      setTimeout(() => setExito(null), 3000);
      
      // Actualizamos el estado local para que el título cambie si editaron el nombre
      setProducto({ ...producto, nombre, slug: slugP });
      
    } catch (err: any) {
      setError("Error al actualizar la base: " + err.message);
    } finally {
      setLoadingBase(false);
    }
  };

  // === GUARDAR NUEVAS VARIANTES ===
  const handleCrearTalla = async () => {
    if (!nuevaTallaInput.trim()) return;
    const { data, error } = await supabase
      .from("especificaciones")
      .insert([{ tipo: "talla", valor: nuevaTallaInput.trim(), orden: 99 }])
      .select().single();
      
    if (!error && data) {
      setTallas([...tallas, data]);
      setNuevaTallaInput("");
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setColorInput(val);
    const colorExistente = colores.find(c => c.nombre.toLowerCase() === val.toLowerCase());
    if (colorExistente) {
      setImagenSwatchUrl(colorExistente.swatch_url);
    }
  };

  const handleCrearVariante = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setExito(null);

    if (!imagenUrl) return setError("Sube la foto del señuelo primero.");
    if (!colorInput.trim()) return setError("El color es obligatorio.");
    if (!imagenSwatchUrl) return setError("Debes subir o seleccionar la textura (swatch) del color.");
    if (tallasSeleccionadas.length === 0) return setError("Selecciona al menos una talla.");
    
    setLoadingVariante(true);

    try {
      let finalColorId = colores.find(c => c.nombre.toLowerCase() === colorInput.trim().toLowerCase())?.id;
      
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

      const tallasParaInsertar = tallasSeleccionadas.filter(tallaId => {
        const tallaObj = tallas.find(t => t.id === tallaId);
        const yaExiste = variantes.some(v => 
          v.colores?.nombre.toLowerCase() === colorInput.trim().toLowerCase() && 
          v.especificaciones?.valor === tallaObj?.valor
        );
        return !yaExiste; 
      });

      if (tallasParaInsertar.length > 0) {
        const nuevasVariantes = tallasParaInsertar.map(tallaId => {
          const tallaObj = tallas.find(t => t.id === tallaId);
          const skuTalla = tallaObj?.valor.replace(/[^a-zA-Z0-9]/g, '') || 'X';
          const slugP = producto?.slug?.substring(0,3).toUpperCase() || 'PRO';
          const slugC = colorInput.substring(0,3).toUpperCase();
          const skuGenerado = `GEC-${slugP}-${slugC}-${skuTalla}-${Math.floor(Math.random() * 100)}`;

          return {
            producto_id: productoId,
            color_id: finalColorId,
            especificacion_id: tallaId,
            stock: 999,
            imagen_principal_url: imagenUrl,
            sku: skuGenerado
          };
        });

        const { error: errVariante } = await supabase.from("producto_variantes").insert(nuevasVariantes);
        if (errVariante) throw errVariante;
      }

      setImagenUrl("");
      setColorInput("");
      setImagenSwatchUrl("");
      setTallasSeleccionadas([]);
      
      setExito("¡Variantes agregadas con éxito al catálogo!");
      setTimeout(() => setExito(null), 3000);
      
      await cargarCatalogos(); 
      await cargarVariantes();

    } catch (err: any) {
      setError("Error al guardar variantes: " + err.message);
    } finally {
      setLoadingVariante(false);
    }
  };

  if (!producto) return <div className="p-8 text-gray-900 dark:text-white">Cargando datos del señuelo...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* CABECERA */}
      <div className="flex items-center gap-4 border-b border-gray-200 dark:border-zinc-800 pb-6">
        <Link href="/dashboard/catalogo" className="p-2 bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 rounded-md hover:text-orange-500 transition-colors">
          <FiArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white">
            Editar: {producto.nombre}
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400 mt-1">
            Modifica la información o agrega nuevos colores
          </p>
        </div>
      </div>

      {/* MENSAJES GLOBALES */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-md flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
          <FiAlertCircle className="w-5 h-5 shrink-0" /> {error}
        </div>
      )}
      {exito && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-md flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
          <FiCheck className="w-5 h-5 shrink-0" /> {exito}
        </div>
      )}

      {/* ZONA 1: EDITAR INFORMACIÓN BASE */}
      <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 rounded-lg p-6 md:p-8 shadow-sm space-y-6">
        <h2 className="text-lg font-display font-black uppercase text-orange-500 border-b border-gray-200 dark:border-zinc-800 pb-2">
          1. Información del Modelo
        </h2>
        
        <form onSubmit={handleActualizarInfoBase} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">Nombre del Señuelo</label>
              <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 rounded-md p-3 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-orange-500" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">Categoría</label>
              <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 rounded-md p-3 text-sm font-bold uppercase text-gray-900 dark:text-white focus:outline-none focus:border-orange-500">
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2 w-full md:w-1/2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">Precio Base (MXN)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
              <input type="number" step="0.01" required value={precioBase} onChange={(e) => setPrecioBase(e.target.value)} className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 rounded-md pl-8 pr-3 py-3 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-orange-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">Descripción Técnica</label>
              <textarea rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 rounded-md p-3 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 resize-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-orange-500 flex items-center gap-2"><span className="material-symbols-outlined text-sm">military_tech</span> Squad Tip</label>
              <textarea rows={3} value={squadTip} onChange={(e) => setSquadTip(e.target.value)} className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-orange-500/30 rounded-md p-3 text-sm font-medium italic text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 resize-none" />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" disabled={loadingBase} className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2.5 font-bold uppercase tracking-widest text-xs rounded transition-colors flex items-center gap-2">
              {loadingBase ? <FiRefreshCw className="w-4 h-4 animate-spin" /> : <FiSave className="w-4 h-4" />} 
              Actualizar Información
            </button>
          </div>
        </form>
      </div>


      {/* ZONA 2: GESTIÓN DE VARIANTES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* PANEL IZQUIERDO: FORMULARIO DE VARIANTE */}
        <div className="lg:col-span-1 bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 rounded-lg p-6 h-fit shadow-sm">
          <h2 className="text-lg font-display font-black uppercase text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-zinc-800 pb-2">
            2. Agregar Variantes
          </h2>

          <form onSubmit={handleCrearVariante} className="space-y-5">
            {/* SUBIDA DE IMAGEN DEL SEÑUELO */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">Foto del Señuelo Completo</label>
              <CldUploadWidget 
                uploadPreset="gecolures_preset"
                options={{ folder: `gecolures/${producto?.categorias?.slug || 'general'}` }}
                onSuccess={(result: any) => setImagenUrl(result.info.secure_url)}
              >
                {({ open }) => (
                  <div onClick={() => open()} className={`w-full aspect-[4/3] border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden relative ${imagenUrl ? 'border-orange-500 bg-zinc-50 dark:bg-black' : 'border-gray-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 hover:border-orange-500'}`}>
                    {imagenUrl ? (
                      <>
                        <Image src={imagenUrl} alt="Preview" fill className="object-contain p-2" />
                        <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full"><FiCheck /></div>
                      </>
                    ) : (
                      <><FiUploadCloud className="w-8 h-8 text-gray-400 dark:text-zinc-500 mb-2" /><span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-500 text-center px-4">Haz clic para subir foto</span></>
                    )}
                  </div>
                )}
              </CldUploadWidget>
            </div>

            {/* PERFIL DEL COLOR Y TEXTURA */}
            <div className="bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 p-4 rounded-lg space-y-4">
              <div className="space-y-2 relative">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">Color (Escribe o Selecciona) *</label>
                <input type="text" list="lista-colores" required placeholder="Ej. June Bug" value={colorInput} onChange={handleColorChange} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 p-2.5 rounded text-sm text-gray-900 dark:text-white focus:border-orange-500 outline-none transition-colors font-bold" />
                <datalist id="lista-colores">
                  {colores.map(c => <option key={c.id} value={c.nombre} />)}
                </datalist>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">Textura (Swatch) *</label>
                <div className="flex items-center gap-4">
                  <CldUploadWidget uploadPreset="gecolures_preset" options={{ folder: `gecolures/colores` }} onSuccess={(res: any) => setImagenSwatchUrl(res.info.secure_url)}>
                    {({ open }) => (
                      <button type="button" onClick={() => open()} className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 hover:border-orange-500 text-gray-600 dark:text-zinc-400 p-2 rounded text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2"><FiUploadCloud className="w-4 h-4" /> Subir Textura</button>
                    )}
                  </CldUploadWidget>
                  {imagenSwatchUrl && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full border border-gray-300 dark:border-zinc-600 shadow-sm" style={{ backgroundImage: `url(${imagenSwatchUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                      <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1"><FiCheck /> Listo</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* TALLAS */}
            <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-zinc-800">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">Tallas a generar</label>
              {tallas.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {tallas.map((talla) => {
                    const isSelected = tallasSeleccionadas.includes(talla.id);
                    return (
                      <label key={talla.id} className={`flex items-center justify-center p-2 border rounded text-xs font-bold cursor-pointer transition-colors ${isSelected ? 'bg-orange-500 border-orange-500 text-white' : 'bg-zinc-50 dark:bg-[#0a0a0a] border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 hover:border-orange-500'}`}>
                        <input type="checkbox" className="hidden" checked={isSelected} onChange={(e) => { e.target.checked ? setTallasSeleccionadas([...tallasSeleccionadas, talla.id]) : setTallasSeleccionadas(tallasSeleccionadas.filter(id => id !== talla.id)) }} />
                        {talla.valor}
                      </label>
                    );
                  })}
                </div>
              )}
              <div className="flex gap-2 mt-2">
                <input type="text" placeholder='Nueva talla (Ej: 6.5")' value={nuevaTallaInput} onChange={(e) => setNuevaTallaInput(e.target.value)} className="flex-1 bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 p-2 rounded text-xs text-gray-900 dark:text-white focus:border-orange-500 outline-none" />
                <button type="button" onClick={handleCrearTalla} className="bg-gray-200 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 px-3 rounded hover:text-orange-500 transition-colors"><FiPlus /></button>
              </div>
            </div>

            <button type="submit" disabled={loadingVariante || (!imagenUrl && !imagenSwatchUrl)} className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 dark:disabled:bg-zinc-800 disabled:text-gray-500 dark:disabled:text-zinc-500 text-white p-3 font-bold uppercase tracking-widest text-xs rounded transition-colors flex justify-center items-center gap-2 shadow-md">
              {loadingVariante ? <FiRefreshCw className="w-4 h-4 animate-spin" /> : <FiSave className="w-4 h-4" />} 
              {loadingVariante ? "Procesando..." : "Guardar Variantes"}
            </button>
          </form>
        </div>

        {/* PANEL DERECHO: LISTA DE VARIANTES */}
        <div className="lg:col-span-2 bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden h-fit shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center">
            <h2 className="text-lg font-display font-black uppercase text-gray-900 dark:text-white">Variantes Activas</h2>
            <span className="bg-zinc-100 dark:bg-zinc-900 text-orange-500 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
              {variantes.length} Variantes
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 dark:bg-[#0a0a0a] text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500">
                <tr>
                  <th className="p-4">Señuelo</th>
                  <th className="p-4">Color y Talla</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4 text-right">Disponibilidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                {variantes.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500 dark:text-zinc-500 text-xs font-bold uppercase tracking-widest">
                      No hay colores o tallas registradas aún.
                    </td>
                  </tr>
                ) : (
                  variantes.map((v) => (
                    <tr key={v.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="p-4">
                        <div className="w-16 h-16 bg-zinc-100 dark:bg-black rounded border border-gray-200 dark:border-zinc-800 flex items-center justify-center p-1 relative">
                          {v.imagen_principal_url ? (
                            <Image src={v.imagen_principal_url} alt={v.colores?.nombre} fill className="object-contain rounded p-1" />
                          ) : (
                            <FiImage className="text-gray-400 dark:text-zinc-600" />
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-zinc-700" style={{ backgroundImage: `url(${v.colores?.swatch_url})`, backgroundSize: 'cover' }} />
                          <p className="text-sm font-bold text-gray-900 dark:text-white uppercase">{v.colores?.nombre}</p>
                        </div>
                        <p className="text-[10px] text-gray-500 dark:text-zinc-500 uppercase tracking-widest">
                          Talla: {v.especificaciones?.valor}
                        </p>
                      </td>
                      <td className="p-4 text-xs font-mono font-bold text-gray-500 dark:text-zinc-400">{v.sku}</td>
                      <td className="p-4 text-right">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest bg-green-500/10 text-green-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Activa
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}