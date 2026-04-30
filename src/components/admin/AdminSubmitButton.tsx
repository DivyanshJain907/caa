"use client";

import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

type AdminSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
  pendingLabel?: string;
  successLabel?: string;
};

export default function AdminSubmitButton({
  children,
  className,
  pendingLabel = "Submitting...",
  successLabel = "Saved successfully.",
}: AdminSubmitButtonProps) {
  const { pending } = useFormStatus();
  const wasPending = useRef(false);
  const toastId = useRef<string | number | null>(null);

  useEffect(() => {
    if (pending && !wasPending.current) {
      toastId.current = toast.loading(pendingLabel);
    }

    if (!pending && wasPending.current && toastId.current !== null) {
      toast.success(successLabel, { id: toastId.current });
      toastId.current = null;
    }

    wasPending.current = pending;
  }, [pending, pendingLabel, successLabel]);

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingLabel : children}
    </button>
  );
}
