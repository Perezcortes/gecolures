"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegistroPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);
  
  const supabase = createClient();
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        // Esta "data" extra es la que nuestro Trigger de SQL va a atrapar 
        // para guardarla en tu tabla 'profiles'
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) {
      setMessage({ text: error.message, type: "error" });
    } else {
      setMessage({ 
        text: "¡Reclutamiento exitoso! Revisa tu correo para confirmar tu cuenta.", 
        type: "success" 
      });
      // Opcional: Redirigir al login después de un par de segundos
      // setTimeout(() => router.push("/login"), 3000);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-6">
      <form onSubmit={handleSignUp} className="w-full max-w-md bg-[#121212] p-8 border border-zinc-800 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-2 text-center">
          ÚNETE AL <span className="text-orange-500">SQUAD</span>
        </h1>
        <p className="text-zinc-400 text-xs text-center font-bold uppercase tracking-widest mb-6">
          Crea tu cuenta de acceso
        </p>

        {message && (
          <div className={`p-3 mb-4 rounded text-xs font-bold uppercase tracking-widest text-center ${message.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
            {message.text}
          </div>
        )}

        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Nombre Completo" 
            value={fullName}
            required
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 p-3 text-white rounded focus:border-orange-500 outline-none transition-colors"
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 p-3 text-white rounded focus:border-orange-500 outline-none transition-colors"
          />
          <input 
            type="password" 
            placeholder="Contraseña (mínimo 6 caracteres)" 
            value={password}
            required
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 p-3 text-white rounded focus:border-orange-500 outline-none transition-colors"
          />
          <button 
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-black py-3 rounded transition-colors uppercase tracking-widest text-sm"
          >
            {loading ? "Procesando..." : "Registrarse"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-orange-500 hover:text-white transition-colors">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}