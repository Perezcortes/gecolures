import Link from "next/link";
import { FiShield, FiTruck, FiRefreshCcw, FiDroplet } from "react-icons/fi";

export const metadata = {
  title: "Términos y Condiciones | Geco Lures",
  description: "Términos, condiciones de venta y políticas de envío de Geco Lures.",
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0e0e0e] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-4">
            Términos y <span className="text-orange-500">Condiciones</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">
            Última actualización: {new Date().toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="space-y-12 text-gray-700 dark:text-zinc-300 font-medium leading-relaxed text-left">
          
          {/* SECCIÓN 1: COMPRAS */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FiDroplet className="text-orange-500 w-6 h-6" />
              <h2 className="text-xl font-black uppercase tracking-widest text-gray-900 dark:text-white">1. Pedidos y Personalización</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Venta mínima:</strong> En Geco Lures apoyamos a todos los pescadores, por lo que puedes realizar pedidos desde <strong>1 sola bolsa</strong> de señuelos de nuestro catálogo estándar.</li>
              <li><strong>Colores Personalizados:</strong> Ofrecemos la fabricación de colores personalizados y combinaciones especiales. Para hacer válida esta opción, se requiere un pedido mínimo de <strong>6 a 8 bolsas</strong> del mismo diseño/color.</li>
              <li>Todos los pedidos están sujetos a disponibilidad de inventario y materia prima.</li>
            </ul>
          </section>

          {/* SECCIÓN 2: ENVÍOS */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FiTruck className="text-orange-500 w-6 h-6" />
              <h2 className="text-xl font-black uppercase tracking-widest text-gray-900 dark:text-white">2. Envíos y Paquetería</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>Realizamos envíos a toda la República Mexicana.</li>
              <li>Trabajamos principalmente con las paqueterías <strong>Estafeta, DHL y FedEx</strong> para garantizar la entrega segura de tu arsenal.</li>
              <li><strong>Costos de envío:</strong> El costo exacto del envío depende directamente de la zona o Código Postal de destino y será calculado al momento de finalizar tu compra o cotización.</li>
              <li>Una vez entregado el paquete a la paquetería, te proporcionaremos un número de guía para su rastreo. Los tiempos de entrega dependen exclusivamente de la empresa transportista.</li>
            </ul>
          </section>

          {/* SECCIÓN 3: DEVOLUCIONES (AQUÍ ESTÁ LA PROTECCIÓN DEL CLIENTE) */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FiRefreshCcw className="text-orange-500 w-6 h-6" />
              <h2 className="text-xl font-black uppercase tracking-widest text-gray-900 dark:text-white">3. Política de Cambios y Devoluciones</h2>
            </div>
            <p className="mb-4">Para garantizar la calidad y evitar malas prácticas (daños intencionales a los plásticos posteriores a la entrega), nuestras políticas de devolución son estrictas:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Registro de Calidad:</strong> Para seguridad de ambas partes, <strong>tomamos fotografías detalladas de cada pedido antes de ser embalado y enviado</strong>. Esto certifica que el producto sale en perfectas condiciones de nuestras instalaciones.</li>
              <li><strong>Errores de Envío:</strong> Si por un error de Geco Lures recibes un modelo, tamaño o color distinto al que solicitaste en tu orden, procederemos con el cambio o devolución sin costo adicional para ti.</li>
              <li><strong>Daños por mal uso:</strong> No aceptamos devoluciones por señuelos rasgados, cortados ("mochados") o dañados tras haber sido sacados de su empaque o utilizados en el agua.</li>
              <li>Cualquier reclamación por error de envío debe hacerse en las primeras 48 horas tras recibir el paquete, contactándonos directamente a nuestros canales oficiales con evidencia fotográfica del empaque cerrado.</li>
            </ul>
          </section>

          {/* SECCIÓN 4: CONTACTO */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FiShield className="text-orange-500 w-6 h-6" />
              <h2 className="text-xl font-black uppercase tracking-widest text-gray-900 dark:text-white">4. Atención al Pescador</h2>
            </div>
            <p>Si tienes alguna duda sobre tu orden o quieres cotizar un color personalizado, Gerardo Garza y el equipo de Geco Lures están a tu disposición:</p>
            <ul className="mt-4 space-y-1 font-bold">
              <li>WhatsApp Directo: <a href="https://wa.me/5218341218524" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">+52 1 834 121 8524</a></li>
              <li>Correo Electrónico: <a href="mailto:gecolures@hotmail.com" className="text-orange-500 hover:underline">gecolures@hotmail.com</a></li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}