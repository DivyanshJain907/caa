"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createContact } from "@/app/(site)/actions";

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
      {pending ? "Sending..." : "Send Inquiry"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(createContact, initialState);

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-navy-900">Name</label>
          <input
            name="name"
            placeholder="Your name"
            required
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-navy-900">Email</label>
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
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
            placeholder="Phone number"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-navy-900">Subject</label>
          <input
            name="subject"
            placeholder="Inquiry subject"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-navy-900">Message</label>
        <textarea
          name="message"
          placeholder="Your message or inquiry details"
          rows={4}
          required
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
