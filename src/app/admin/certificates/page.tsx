import {
  createCertificate,
  deleteCertificate,
  updateCertificate,
  requireAdmin,
} from "@/app/admin/actions";
import { dbConnect } from "@/lib/db";
import Certificate from "@/lib/models/Certificate";
import FileUploader from "@/components/ui/FileUploader";
import AdminSubmitButton from "@/components/admin/AdminSubmitButton";
import AdminDeleteForm from "@/components/admin/AdminDeleteForm";

export const dynamic = "force-dynamic";

export default async function AdminCertificatesPage() {
  await requireAdmin();
  await dbConnect();
  const certificates = (await Certificate.find()
    .sort({ createdAt: -1 })
    .lean()) as any[];

  return (
    <div className="grid gap-8">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-navy-900">Certificates</div>
        <p className="mt-2 text-sm text-slate-600">
          Upload professional certifications and recognition images.
        </p>
      </div>

      <form
        action={createCertificate}
        className="grid gap-4 rounded-3xl bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-navy-900">Title</label>
            <input
              name="title"
              required
              placeholder="Certificate title"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-navy-900">
              Issuer
            </label>
            <input
              name="issuer"
              placeholder="Issuer"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-navy-900">
              Issued Year
            </label>
            <input
              name="issuedYear"
              placeholder="2025"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-navy-900">
            Upload Image
          </label>
          <FileUploader name="image" />
        </div>
        <AdminSubmitButton
          className="w-fit rounded-full bg-navy-900 px-5 py-2 text-xs font-semibold text-ivory disabled:opacity-70"
          pendingLabel="Adding..."
          successLabel="Certificate added."
        >
          Add Certificate
        </AdminSubmitButton>
      </form>

      <div className="grid gap-6">
        {certificates.map((certificate) => (
          <div
            key={certificate._id.toString()}
            className="rounded-3xl bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <img
                src={certificate.imageUrl}
                alt={certificate.title}
                className="h-28 w-36 rounded-2xl object-cover"
              />
              <form action={updateCertificate} className="grid flex-1 gap-4">
                <input
                  type="hidden"
                  name="id"
                  value={certificate._id.toString()}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-navy-900">
                      Title
                    </label>
                    <input
                      name="title"
                      defaultValue={certificate.title}
                      placeholder="Certificate title"
                      className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-navy-900">
                      Issuer
                    </label>
                    <input
                      name="issuer"
                      defaultValue={certificate.issuer}
                      placeholder="Issuer"
                      className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-navy-900">
                      Issued Year
                    </label>
                    <input
                      name="issuedYear"
                      defaultValue={certificate.issuedYear}
                      placeholder="2025"
                      className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-navy-900">
                      Current Image
                    </label>
                    <input
                      name="currentImage"
                      defaultValue={certificate.imageUrl}
                      readOnly
                      title="Current image URL"
                      className="rounded-xl border border-slate-200 px-4 py-3 text-sm bg-slate-50"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-navy-900">
                    Replace Image
                  </label>
                  <FileUploader name="image" />
                </div>
                <AdminSubmitButton
                  className="w-fit rounded-full bg-navy-900 px-5 py-2 text-xs font-semibold text-ivory disabled:opacity-70"
                  pendingLabel="Saving..."
                  successLabel="Certificate updated."
                >
                  Save Changes
                </AdminSubmitButton>
              </form>
            </div>
            <AdminDeleteForm
              action={deleteCertificate}
              id={certificate._id.toString()}
              buttonLabel="Delete Certificate"
              pendingLabel="Deleting..."
              successLabel="Certificate deleted."
              className="mt-4"
            />
          </div>
        ))}
        {certificates.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            No certificates uploaded yet.
          </div>
        ) : null}
      </div>
    </div>
  );
}
