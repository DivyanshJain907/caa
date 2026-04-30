import {
  createCareer,
  deleteCareer,
  updateCareer,
  requireAdmin,
} from "@/app/admin/actions";
import { dbConnect } from "@/lib/db";
import Career from "@/lib/models/Career";
import AdminSubmitButton from "@/components/admin/AdminSubmitButton";
import AdminDeleteForm from "@/components/admin/AdminDeleteForm";

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  await requireAdmin();
  await dbConnect();
  const careers = (await Career.find().sort({ createdAt: -1 }).lean()) as any[];

  type Application = {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    resumeUrl?: string;
    message?: string;
  };

  return (
    <div className="grid gap-8">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-navy-900">Careers</div>
        <p className="mt-2 text-sm text-slate-600">
          Manage job openings and review applications.
        </p>
      </div>

      <form
        action={createCareer}
        className="grid gap-4 rounded-3xl bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-navy-900">Title</label>
            <input
              name="title"
              required
              placeholder="Job title"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-navy-900">
              Location
            </label>
            <input
              name="location"
              required
              placeholder="Location"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-navy-900">Type</label>
            <input
              name="type"
              required
              placeholder="Full-time, part-time, etc."
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-navy-900">
              Experience
            </label>
            <input
              name="experience"
              placeholder="Years of experience"
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
            placeholder="Short job description"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
          />
        </div>
        <AdminSubmitButton
          className="w-fit rounded-full bg-navy-900 px-5 py-2 text-xs font-semibold text-ivory disabled:opacity-70"
          pendingLabel="Adding..."
          successLabel="Job opening added."
        >
          Add Job Opening
        </AdminSubmitButton>
      </form>

      <div className="grid gap-6">
        {careers.map((career) => (
          <div
            key={career._id.toString()}
            className="rounded-3xl bg-white p-6 shadow-sm"
          >
            <form action={updateCareer} className="grid gap-4">
              <input type="hidden" name="id" value={career._id.toString()} />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-navy-900">
                    Title
                  </label>
                  <input
                    name="title"
                    defaultValue={career.title}
                    placeholder="Job title"
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-navy-900">
                    Location
                  </label>
                  <input
                    name="location"
                    defaultValue={career.location}
                    placeholder="Location"
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-navy-900">
                    Type
                  </label>
                  <input
                    name="type"
                    defaultValue={career.type}
                    placeholder="Full-time, part-time, etc."
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-navy-900">
                    Experience
                  </label>
                  <input
                    name="experience"
                    defaultValue={career.experience}
                    placeholder="Years of experience"
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
                  defaultValue={career.description}
                  placeholder="Short job description"
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                />
              </div>
              <AdminSubmitButton
                className="w-fit rounded-full bg-navy-900 px-5 py-2 text-xs font-semibold text-ivory disabled:opacity-70"
                pendingLabel="Saving..."
                successLabel="Job opening updated."
              >
                Save Changes
              </AdminSubmitButton>
            </form>

            <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="text-xs font-semibold text-navy-900">
                Applications ({career.applications?.length ?? 0})
              </div>
              <div className="mt-3 grid gap-3">
                {((career.applications ?? []) as Application[]).map((app) => (
                  <div
                    key={app._id.toString()}
                    className="rounded-xl border border-white/70 bg-white p-3 text-xs text-slate-600"
                  >
                    <div className="font-semibold text-navy-900">
                      {app.name}
                    </div>
                    <div>Email: {app.email}</div>
                    {app.phone ? <div>Phone: {app.phone}</div> : null}
                    {app.resumeUrl ? (
                      <div>
                        Resume:{" "}
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {app.resumeUrl}
                        </a>
                      </div>
                    ) : null}
                    {app.message ? <div>Message: {app.message}</div> : null}
                  </div>
                ))}
                {(career.applications ?? []).length === 0 ? (
                  <div className="text-xs text-slate-500">
                    No applications yet.
                  </div>
                ) : null}
              </div>
            </div>

            <AdminDeleteForm
              action={deleteCareer}
              id={career._id.toString()}
              buttonLabel="Delete Job Opening"
              pendingLabel="Deleting..."
              successLabel="Job opening deleted."
              className="mt-4"
            />
          </div>
        ))}
        {careers.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            No careers posted yet.
          </div>
        ) : null}
      </div>
    </div>
  );
}
