import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AdminLayoutClient from '@/components/admin/AdminLayoutClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // 1. Verificamos si hay usuario logueado
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // 2. Verificamos si tiene perfil y es administrador
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    redirect('/'); 
  }

  // 3. Pasamos los datos al cliente
  const displayUserName = profile.full_name || user.email?.split('@')[0] || 'Administrador';

  return (
    <AdminLayoutClient userName={displayUserName}>
      {children}
    </AdminLayoutClient>
  );
}