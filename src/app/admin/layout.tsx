import { getServerSession } from "next-auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { authOptions } from "@/lib/auth";
import { Toaster } from "sonner";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-right" richColors closeButton />
      {session?.user ? (
        <div className="flex">
          <AdminSidebar />
          <div className="flex flex-1 flex-col">
            <AdminTopbar userName={session.user.name} />
            <main className="flex-1 px-6 py-8 lg:px-10">{children}</main>
          </div>
        </div>
      ) : (
        <main>{children}</main>
      )}
    </div>
  );
}
