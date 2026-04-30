"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type AdminLoginFormProps = {
  callbackUrl: string;
};

export default function AdminLoginForm({ callbackUrl }: AdminLoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const loadingToast = toast.loading("Signing in...");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl,
      redirect: false,
    });

    if (result?.error || !result?.ok) {
      toast.error("Invalid credentials. Please try again.", {
        id: loadingToast,
      });
      setError("Invalid credentials. Please try again.");
      return;
    }

    toast.success("Signed in successfully.", { id: loadingToast });

    router.replace(result.url || callbackUrl);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-6">
      <div className="glass-panel w-full max-w-md rounded-3xl p-8">
        <div className="text-sm font-semibold text-navy-900">Admin Login</div>
        <p className="mt-2 text-xs text-slate-500">
          Use your admin credentials to access the dashboard.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-navy-900">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="admin@aaca.in"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-navy-900">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
            />
          </div>
          {error ? <div className="text-xs text-red-600">{error}</div> : null}
          <button
            type="submit"
            className="rounded-full bg-navy-900 px-4 py-3 text-xs font-semibold text-ivory transition hover:bg-navy-800"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
