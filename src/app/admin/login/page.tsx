import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ callbackUrl?: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/admin/dashboard");
  }

  const params = await searchParams;
  const callbackUrl = params?.callbackUrl || "/admin/dashboard";

  return <AdminLoginForm callbackUrl={callbackUrl} />;
}
