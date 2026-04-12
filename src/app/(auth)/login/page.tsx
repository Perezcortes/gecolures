"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClient();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert("Error: " + error.message);
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-6">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-[#121212] p-8 border border-zinc-800 rounded-lg">
        <h1 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-6 text-center">
          GECO <span className="text-orange-500">HQ</span>
        </h1>
        <div className="space-y-4">
          <input 
            type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 p-3 text-white rounded focus:border-orange-500 outline-none"
          />
          <input 
            type="password" placeholder="Contraseña" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 p-3 text-white rounded focus:border-orange-500 outline-none"
          />
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-3 rounded transition-colors uppercase tracking-widest text-sm">
            Entrar al Arsenal
          </button>
        </div>
      </form>
    </main>
  );
}