import { deleteContact, requireAdmin } from "@/app/admin/actions";
import { dbConnect } from "@/lib/db";
import Contact from "@/lib/models/Contact";
import AdminDeleteForm from "@/components/admin/AdminDeleteForm";

export const dynamic = "force-dynamic";

export default async function AdminContactsPage() {
  await requireAdmin();
  await dbConnect();
  const contacts = (await Contact.find()
    .sort({ createdAt: -1 })
    .lean()) as any[];

  return (
    <div className="grid gap-8">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-navy-900">
          Contact Requests
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Review new inquiries submitted through the contact form.
        </p>
      </div>

      <div className="grid gap-6">
        {contacts.map((contact) => (
          <div
            key={contact._id.toString()}
            className="rounded-3xl bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold text-navy-900">
                {contact.name}
              </div>
              <div className="text-xs text-slate-500">{contact.email}</div>
              {contact.phone ? (
                <div className="text-xs text-slate-500">{contact.phone}</div>
              ) : null}
              {contact.subject ? (
                <div className="text-xs text-slate-500">
                  Subject: {contact.subject}
                </div>
              ) : null}
              <p className="text-sm text-slate-600">{contact.message}</p>
            </div>
            <AdminDeleteForm
              action={deleteContact}
              id={contact._id.toString()}
              buttonLabel="Delete Inquiry"
              pendingLabel="Deleting..."
              successLabel="Inquiry deleted."
              className="mt-4"
            />
          </div>
        ))}
        {contacts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            No contact inquiries yet.
          </div>
        ) : null}
      </div>
    </div>
  );
}
