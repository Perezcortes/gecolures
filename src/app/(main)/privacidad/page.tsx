import { FiLock, FiEye, FiDatabase, FiMail } from "react-icons/fi";

export const metadata = {
  title: "Política de Privacidad | Geco Lures",
  description: "Conoce cómo Geco Lures protege y utiliza tus datos personales.",
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0e0e0e] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-4">
            Política de <span className="text-orange-500">Privacidad</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">
            Última actualización: {new Date().toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="space-y-12 text-gray-700 dark:text-zinc-300 font-medium leading-relaxed text-left">
          
          {/* SECCIÓN 1: RESPONSABLE */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FiLock className="text-orange-500 w-6 h-6" />
              <h2 className="text-xl font-black uppercase tracking-widest text-gray-900 dark:text-white">1. Responsable de los Datos</h2>
            </div>
            <p>
              En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares de México, le informamos que <strong>Geco Lures</strong> (representado por Gerardo Garza), con sede en Ciudad Victoria, Tamaulipas, es el responsable del uso y protección de sus datos personales.
            </p>
          </section>

          {/* SECCIÓN 2: DATOS RECOPILADOS */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FiDatabase className="text-orange-500 w-6 h-6" />
              <h2 className="text-xl font-black uppercase tracking-widest text-gray-900 dark:text-white">2. Datos Recopilados y Finalidad</h2>
            </div>
            <p className="mb-4">Para procesar sus pedidos y brindarle el mejor servicio, solicitamos la siguiente información:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Nombre completo.</li>
              <li>Dirección de envío y Código Postal.</li>
              <li>Número de teléfono (WhatsApp) y correo electrónico.</li>
            </ul>
            <p>
              <strong>Sus datos serán utilizados exclusiva y estrictamente para:</strong> Procesar sus compras, generar guías de envío, contactarle en caso de dudas sobre colores personalizados o estatus de su pedido, y para fines de control de calidad interno.
            </p>
          </section>

          {/* SECCIÓN 3: COMPARTICIÓN DE DATOS (PAQUETERÍAS) */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FiEye className="text-orange-500 w-6 h-6" />
              <h2 className="text-xl font-black uppercase tracking-widest text-gray-900 dark:text-white">3. Transferencia de Datos a Terceros</h2>
            </div>
            <p>
              Geco Lures no vende, renta ni lucra con su información personal. Sus datos únicamente son compartidos con terceros en el siguiente escenario estrictamente necesario:
            </p>
            <ul className="list-disc pl-5 mt-4">
              <li><strong>Empresas de Paquetería:</strong> Proporcionamos su nombre, dirección y teléfono a empresas logísticas (Estafeta, DHL, FedEx) con el único fin de que puedan entregar el paquete en su domicilio.</li>
            </ul>
          </section>

          {/* SECCIÓN 4: DERECHOS ARCO */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FiMail className="text-orange-500 w-6 h-6" />
              <h2 className="text-xl font-black uppercase tracking-widest text-gray-900 dark:text-white">4. Derechos ARCO y Contacto</h2>
            </div>
            <p className="mb-4">
              Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición).
            </p>
            <p>
              Para ejercer cualquiera de los derechos ARCO, o si tiene dudas sobre esta política, comuníquese directamente con Gerardo Garza a través de nuestros canales oficiales:
            </p>
            <div className="mt-6 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-md border border-gray-200 dark:border-zinc-800">
              <p className="font-bold text-gray-900 dark:text-white">Geco Lures</p>
              <p className="text-sm">WhatsApp: <a href="https://wa.me/5218341218524" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">+52 1 834 121 8524</a></p>
              <p className="text-sm">Correo: <a href="mailto:gecolures@hotmail.com" className="text-orange-500 hover:underline">gecolures@hotmail.com</a></p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}