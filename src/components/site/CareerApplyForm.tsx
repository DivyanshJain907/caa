"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { applyCareer } from "@/app/(site)/actions";

const initialState = {
  status: "idle" as const,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="rounded-full bg-navy-900 px-5 py-2 text-xs font-semibold text-ivory transition hover:bg-navy-800"
      disabled={pending}
    >
      {pending ? "Submitting..." : "Submit Application"}
    </button>
  );
}

type CareerApplyFormProps = {
  careerId: string;
};

export default function CareerApplyForm({ careerId }: CareerApplyFormProps) {
  const [state, formAction] = useActionState(applyCareer, initialState);

  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="careerId" value={careerId} />
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-navy-900">Name</label>
          <input
            name="name"
            required
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-navy-900">Email</label>
          <input
            name="email"
            type="email"
            required
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
          />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-navy-900">Phone</label>
          <input
            name="phone"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-navy-900">Resume URL</label>
          <input
            name="resumeUrl"
            placeholder="https://"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-navy-900">Message</label>
        <textarea
          name="message"
          rows={3}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
        />
      </div>
      <div className="flex items-center gap-4">
        <SubmitButton />
        {state.status === "success" ? (
          <span className="text-xs text-emerald-700">{state.message}</span>
        ) : null}
        {state.status === "error" ? (
          <span className="text-xs text-red-600">{state.message}</span>
        ) : null}
      </div>
    </form>
  );
}
