import {
  createService,
  deleteService,
  updateService,
  requireAdmin,
} from "@/app/admin/actions";
import { dbConnect } from "@/lib/db";
import Service from "@/lib/models/Service";
import FileUploader from "@/components/ui/FileUploader";
import AdminSubmitButton from "@/components/admin/AdminSubmitButton";
import AdminDeleteForm from "@/components/admin/AdminDeleteForm";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  await requireAdmin();
  await dbConnect();
  const services = (await Service.find()
    .sort({ createdAt: -1 })
    .lean()) as any[];

  return (
    <div className="grid gap-8">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-navy-900">Services</div>
        <p className="mt-2 text-sm text-slate-600">
          Add, edit, or remove service offerings.
        </p>
      </div>

      <form
        action={createService}
        className="grid gap-4 rounded-3xl bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-navy-900">Title</label>
            <input
              name="title"
              required
              placeholder="Service title"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-navy-900">
              Category
            </label>
            <input
              name="category"
              required
              placeholder="Category"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-navy-900">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            required
            placeholder="Short description"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-navy-900">
            Upload Image (optional)
          </label>
          <FileUploader name="image" />
        </div>
        <AdminSubmitButton
          className="w-fit rounded-full bg-navy-900 px-5 py-2 text-xs font-semibold text-ivory disabled:opacity-70"
          pendingLabel="Adding..."
          successLabel="Service added."
        >
          Add Service
        </AdminSubmitButton>
      </form>

      <div className="grid gap-6">
        {services.map((service) => (
          <div
            key={service._id.toString()}
            className="rounded-3xl bg-white p-6 shadow-sm"
          >
            <form action={updateService} className="grid gap-4">
              <input type="hidden" name="id" value={service._id.toString()} />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-navy-900">
                    Title
                  </label>
                  <input
                    name="title"
                    defaultValue={service.title}
                    placeholder="Service title"
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-navy-900">
                    Category
                  </label>
                  <input
                    name="category"
                    defaultValue={service.category}
                    placeholder="Category"
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-navy-900">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={service.description}
                  placeholder="Short description"
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                />
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
                successLabel="Service updated."
              >
                Save Changes
              </AdminSubmitButton>
            </form>
            <AdminDeleteForm
              action={deleteService}
              id={service._id.toString()}
              buttonLabel="Delete Service"
              pendingLabel="Deleting..."
              successLabel="Service deleted."
              className="mt-4"
            />
          </div>
        ))}
        {services.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            No services added yet.
          </div>
        ) : null}
      </div>
    </div>
  );
}
