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
  const supabase = createClient();
  const productoId = params.id as string;

  const [producto, setProducto] = useState<any>(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioBase, setPrecioBase] = useState("");
  const [squadTip, setSquadTip] = useState("");
  const [paqueteIncluye, setPaqueteIncluye] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loadingBase, setLoadingBase] = useState(false);

  const [colores, setColores] = useState<any[]>([]);
  const [tallas, setTallas] = useState<any[]>([]);
  const [variantes, setVariantes] = useState<any[]>([]);

  const [colorInput, setColorInput] = useState("");
  const [clasificacionColor, setClasificacionColor] = useState("Sólido");
  const [imagenSwatchUrl, setImagenSwatchUrl] = useState("");
  const [tallasSeleccionadas, setTallasSeleccionadas] = useState<string[]>([]);
  const [nuevaTallaInput, setNuevaTallaInput] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  
  const [loadingVariante, setLoadingVariante] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const { data: prod } = await supabase.from("productos").select("*, categorias(nombre, slug)").eq("id", productoId).single();
      setProducto(prod);

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
    const { data } = await supabase.from("producto_variantes").select(`id, stock, sku, imagen_principal_url, colores (nombre, swatch_url, clasificacion), especificaciones (valor)`).eq("producto_id", productoId);
    setVariantes(data || []);
  };

  const generarSlug = (texto: string) => texto.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

  const handleActualizarInfoBase = async (e: React.FormEvent) => {
    e.preventDefault(); setError(null); setExito(null); setLoadingBase(true);
    try {
      const slugP = generarSlug(nombre);
      const { error: errUpdate } = await supabase.from("productos").update({ nombre, slug: slugP, descripcion, precio_base: parseFloat(precioBase), squad_tip: squadTip, paquete_incluye: paqueteIncluye, categoria_id: categoriaId }).eq("id", productoId);
      if (errUpdate) throw errUpdate;
      setExito("¡Información del señuelo actualizada!");
      setTimeout(() => setExito(null), 3000);
      setProducto({ ...producto, nombre, slug: slugP });
    } catch (err: any) { setError(err.message); } finally { setLoadingBase(false); }
  };

  const handleCrearTalla = async () => {
    if (!nuevaTallaInput.trim()) return;
    const { data, error } = await supabase.from("especificaciones").insert([{ tipo: "talla", valor: nuevaTallaInput.trim(), orden: 99 }]).select().single();
    if (!error && data) { setTallas([...tallas, data]); setNuevaTallaInput(""); }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value; setColorInput(val);
    const colorExistente = colores.find(c => c.nombre.toLowerCase() === val.toLowerCase());
    if (colorExistente) {
        setImagenSwatchUrl(colorExistente.swatch_url);
        setClasificacionColor(colorExistente.clasificacion || "Sólido");
    }
  };

  const handleCrearVariante = async (e: React.FormEvent) => {
    e.preventDefault(); setError(null); setExito(null);
    if (!imagenUrl || !colorInput.trim() || !imagenSwatchUrl || tallasSeleccionadas.length === 0) return setError("Completa todos los campos obligatorios de la variante.");
    setLoadingVariante(true);
    try {
      let finalColorId = colores.find(c => c.nombre.toLowerCase() === colorInput.trim().toLowerCase())?.id;
      if (!finalColorId) {
        const { data: nuevoColor, error: errColor } = await supabase.from("colores").insert([{ nombre: colorInput.trim(), swatch_url: imagenSwatchUrl, clasificacion: clasificacionColor }]).select().single();
        if (errColor) throw errColor; finalColorId = nuevoColor.id;
      } else {
        await supabase.from("colores").update({ swatch_url: imagenSwatchUrl, clasificacion: clasificacionColor }).eq("id", finalColorId);
      }

      const tallasParaInsertar = tallasSeleccionadas.filter(tallaId => {
        const tallaObj = tallas.find(t => t.id === tallaId);
        return !variantes.some(v => v.colores?.nombre.toLowerCase() === colorInput.trim().toLowerCase() && v.especificaciones?.valor === tallaObj?.valor);
      });

      if (tallasParaInsertar.length > 0) {
        const nuevasVariantes = tallasParaInsertar.map(tallaId => {
          const skuTalla = tallas.find(t => t.id === tallaId)?.valor.replace(/[^a-zA-Z0-9]/g, '') || 'X';
          const skuGenerado = `GEC-${producto?.slug?.substring(0,3).toUpperCase() || 'PRO'}-${colorInput.substring(0,3).toUpperCase()}-${skuTalla}-${Math.floor(Math.random() * 100)}`;
          return { producto_id: productoId, color_id: finalColorId, especificacion_id: tallaId, stock: 999, imagen_principal_url: imagenUrl, sku: skuGenerado };
        });
        const { error: errVariante } = await supabase.from("producto_variantes").insert(nuevasVariantes);
        if (errVariante) throw errVariante;
      }

      setImagenUrl(""); setColorInput(""); setImagenSwatchUrl(""); setTallasSeleccionadas([]);
      setExito("¡Variantes agregadas!"); setTimeout(() => setExito(null), 3000);
      await cargarCatalogos(); await cargarVariantes();
    } catch (err: any) { setError(err.message); } finally { setLoadingVariante(false); }
  };

  if (!producto) return <div className="p-8 text-gray-900 dark:text-white font-bold uppercase tracking-widest text-xs">Cargando base de datos...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-4 border-b border-gray-200 dark:border-zinc-800 pb-6">
        <Link href="/dashboard/catalogo" className="p-2 bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 rounded-md hover:text-orange-500 transition-colors"><FiArrowLeft className="w-5 h-5" /></Link>
        <div>
          <h1 className="text-3xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white">Editar: {producto.nombre}</h1>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400 mt-1">Actualiza información o añade lotes</p>
        </div>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-md flex items-center gap-3 text-sm font-bold uppercase tracking-widest"><FiAlertCircle className="w-5 h-5" />{error}</div>}
      {exito && <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-md flex items-center gap-3 text-sm font-bold uppercase tracking-widest"><FiCheck className="w-5 h-5" />{exito}</div>}

      <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 rounded-lg p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-display font-black uppercase text-orange-500 border-b border-gray-200 dark:border-zinc-800 pb-2">1. Información del Modelo</h2>
        <form onSubmit={handleActualizarInfoBase} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">Nombre del Señuelo</label><input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 rounded-md p-3 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors" /></div>
            <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">Categoría</label><select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 rounded-md p-3 text-sm font-bold uppercase text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors">{categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}</select></div>
          </div>
          <div className="space-y-2 w-full md:w-1/2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">Precio Base (MXN)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
              <input type="number" step="0.01" required value={precioBase} onChange={(e) => setPrecioBase(e.target.value)} className="w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 rounded-md pl-8 pr-3 py-3 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors" />
            </div>
          </div>
          <div className="flex justify-end"><button type="submit" disabled={loadingBase} className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 font-bold uppercase tracking-widest text-xs rounded flex gap-2 transition-colors shadow-md">{loadingBase ? <FiRefreshCw className="animate-spin w-4 h-4" /> : <FiSave className="w-4 h-4" />} Actualizar Info</button></div>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PANEL IZQUIERDO: AGREGAR VARIANTES (AHORA SÍ CON ESTILOS) */}
        <div className="lg:col-span-1 bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 rounded-lg p-6 shadow-sm h-fit">
          <h2 className="text-lg font-display font-black uppercase text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-zinc-800 pb-2">2. Agregar Variantes</h2>
          
          <form onSubmit={handleCrearVariante} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">Foto del Señuelo <span className="text-orange-500">*</span></label>
              <CldUploadWidget uploadPreset="gecolures_preset" options={{ folder: `gecolures/${producto?.categorias?.slug || 'general'}` }} onSuccess={(result: any) => setImagenUrl(result.info.secure_url)}>
                {({ open }) => (
                  <div onClick={() => open()} className={`w-full aspect-[4/3] border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden relative ${imagenUrl ? 'border-orange-500 bg-zinc-50 dark:bg-[#0a0a0a]' : 'border-gray-300 dark:border-zinc-700 bg-zinc-50 dark:bg-[#0a0a0a] hover:border-orange-500'}`}>
                    {imagenUrl ? (
                      <><Image src={imagenUrl} alt="Preview" fill className="object-contain p-4" /><div className="absolute top-2 right-2 bg-green-500 text-white p-1.5 rounded-full"><FiCheck /></div></>
                    ) : (
                      <><FiUploadCloud className="w-8 h-8 text-gray-400 dark:text-zinc-500 mb-2" /><span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-500 text-center px-4">Subir Foto</span></>
                    )}
                  </div>
                )}
              </CldUploadWidget>
            </div>

            <div className="bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 p-4 rounded-lg space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">Color <span className="text-orange-500">*</span></label>
                <input type="text" list="lista-colores" required value={colorInput} onChange={handleColorChange} placeholder="Ej. June Bug" className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 p-2.5 rounded text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors" />
                <datalist id="lista-colores">{colores.map(c => <option key={c.id} value={c.nombre} />)}</datalist>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">Clasificación <span className="text-orange-500">*</span></label>
                <select value={clasificacionColor} onChange={(e) => setClasificacionColor(e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 p-2.5 rounded text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors">
                    <option value="Sólido">Sólido</option>
                    <option value="Cola de Color">Cola de Color</option>
                    <option value="Laminado">Laminado</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">Textura (Swatch) <span className="text-orange-500">*</span></label>
                <div className="flex items-center gap-4">
                  <CldUploadWidget uploadPreset="gecolures_preset" onSuccess={(res: any) => setImagenSwatchUrl(res.info.secure_url)}>
                    {({ open }) => (<button type="button" onClick={() => open()} className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-zinc-800 hover:border-orange-500 text-gray-600 dark:text-zinc-400 p-2 rounded text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2"><FiUploadCloud className="w-4 h-4"/> Subir Textura</button>)}
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

            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-zinc-800">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-400">Tallas a generar <span className="text-orange-500">*</span></label>
              {tallas.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {tallas.map((talla) => {
                    const isSelected = tallasSeleccionadas.includes(talla.id);
                    return (
                      <label key={talla.id} className={`flex items-center justify-center p-3 border rounded text-xs font-bold cursor-pointer transition-colors ${isSelected ? 'bg-orange-500 border-orange-500 text-white shadow-sm' : 'bg-zinc-50 dark:bg-[#0a0a0a] border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 hover:border-orange-500'}`}>
                        <input type="checkbox" className="hidden" checked={isSelected} onChange={(e) => { e.target.checked ? setTallasSeleccionadas([...tallasSeleccionadas, talla.id]) : setTallasSeleccionadas(tallasSeleccionadas.filter(id => id !== talla.id)) }} />
                        {talla.valor}
                      </label>
                    );
                  })}
                </div>
              )}
              <div className="flex gap-2">
                <input type="text" placeholder='Nueva talla (Ej: 6.5")' value={nuevaTallaInput} onChange={(e) => setNuevaTallaInput(e.target.value)} className="flex-1 bg-zinc-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 p-2.5 rounded text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:border-orange-500" />
                <button type="button" onClick={handleCrearTalla} className="bg-gray-200 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 px-4 rounded hover:text-orange-500 hover:bg-orange-500/10 font-bold text-[10px] uppercase tracking-widest transition-colors">Añadir <FiPlus className="inline ml-1" /></button>
              </div>
            </div>

            <button type="submit" disabled={loadingVariante} className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white p-4 font-black uppercase tracking-widest text-sm rounded transition-all shadow-md flex justify-center items-center gap-2 hover:-translate-y-1">
              {loadingVariante ? <FiRefreshCw className="animate-spin w-5 h-5" /> : <FiSave className="w-5 h-5" />} 
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
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-[#0a0a0a] text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500">
                <tr>
                  <th className="p-4">Señuelo</th>
                  <th className="p-4">Color y Talla</th>
                  <th className="p-4">SKU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                {variantes.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-500 dark:text-zinc-500 text-xs font-bold uppercase tracking-widest">
                      No hay variantes registradas aún.
                    </td>
                  </tr>
                ) : (
                  variantes.map((v) => (
                    <tr key={v.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="p-4">
                        <div className="w-14 h-14 bg-zinc-100 dark:bg-black rounded border border-gray-200 dark:border-zinc-800 flex items-center justify-center relative">
                          {v.imagen_principal_url ? (
                            <Image src={v.imagen_principal_url} alt={v.colores?.nombre} fill className="object-contain p-1" />
                          ) : (
                            <FiImage className="text-gray-400 dark:text-zinc-600" />
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-zinc-700" style={{ backgroundImage: `url(${v.colores?.swatch_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                          <p className="text-sm font-bold text-gray-900 dark:text-white uppercase">{v.colores?.nombre}</p>
                        </div>
                        <p className="text-[10px] text-gray-500 dark:text-zinc-500 uppercase tracking-widest mt-1">
                          Talla: {v.especificaciones?.valor}
                        </p>
                      </td>
                      <td className="p-4 font-mono font-bold text-gray-500 dark:text-zinc-400">{v.sku}</td>
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