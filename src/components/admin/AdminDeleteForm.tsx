"use client";

import { useState } from "react";
import { toast } from "sonner";

type AdminDeleteFormProps = {
  action: (formData: FormData) => Promise<unknown>;
  id: string;
  buttonLabel: string;
  pendingLabel: string;
  successLabel: string;
  className?: string;
};

export default function AdminDeleteForm({
  action,
  id,
  buttonLabel,
  pendingLabel,
  successLabel,
  className = "",
}: AdminDeleteFormProps) {
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pending) {
      return;
    }

    setPending(true);

    try {
      const formData = new FormData(event.currentTarget);
      const toastId = toast.loading(pendingLabel);

      try {
        await action(formData);
        toast.success(successLabel, { id: toastId });
      } catch {
        toast.error("Unable to delete. Please try again.", { id: toastId });
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={pending}
        className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 disabled:opacity-70"
      >
        {pending ? pendingLabel : buttonLabel}
      </button>
    </form>
  );
}
