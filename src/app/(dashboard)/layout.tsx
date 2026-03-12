import { createSupabaseServer } from "@/lib/auth/supabase-server";
import Sidebar from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let profile = null;

  try {
    const supabase = await createSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data } = await supabase
        .from("profiles")
        .select("plan, leads_used_this_month, leads_limit, full_name, email")
        .eq("id", user.id)
        .single();
      profile = data;
    }
  } catch {
    // Si Supabase n'est pas configuré, on affiche quand même le dashboard
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar profile={profile} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
