import {
  createTeamMember,
  deleteTeamMember,
  updateTeamMember,
  requireAdmin,
} from "@/app/admin/actions";
import { dbConnect } from "@/lib/db";
import TeamMember from "@/lib/models/TeamMember";
import FileUploader from "@/components/ui/FileUploader";
import AdminSubmitButton from "@/components/admin/AdminSubmitButton";
import AdminDeleteForm from "@/components/admin/AdminDeleteForm";

export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  await requireAdmin();
  await dbConnect();
  const team = (await TeamMember.find()
    .sort({ createdAt: -1 })
    .lean()) as any[];

  return (
    <div className="grid gap-8">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-navy-900">Team Members</div>
        <p className="mt-2 text-sm text-slate-600">
          Manage leadership and staff profiles displayed on the website.
        </p>
      </div>

      <form
        action={createTeamMember}
        className="grid gap-4 rounded-3xl bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-navy-900">Name</label>
            <input
              name="name"
              required
              placeholder="Full name"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-navy-900">Role</label>
            <input
              name="role"
              required
              placeholder="Role (e.g., CEO)"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-navy-900">
            Specialization
          </label>
          <input
            name="specialization"
            required
            placeholder="Specialization"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-navy-900">
            About (optional)
          </label>
          <textarea
            name="about"
            placeholder="Brief bio or about information"
            rows={3}
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
          successLabel="Team member added."
        >
          Add Team Member
        </AdminSubmitButton>
      </form>

      <div className="grid gap-6">
        {team.map((member) => (
          <div
            key={member._id.toString()}
            className="rounded-3xl bg-white p-6 shadow-sm"
          >
            <form action={updateTeamMember} className="grid gap-4">
              <input type="hidden" name="id" value={member._id.toString()} />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-navy-900">
                    Name
                  </label>
                  <input
                    name="name"
                    defaultValue={member.name}
                    placeholder="Full name"
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-navy-900">
                    Role
                  </label>
                  <input
                    name="role"
                    defaultValue={member.role}
                    placeholder="Role (e.g., CEO)"
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-navy-900">
                  Specialization
                </label>
                <input
                  name="specialization"
                  defaultValue={member.specialization}
                  placeholder="Specialization"
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-navy-900">
                  About (optional)
                </label>
                <textarea
                  name="about"
                  defaultValue={member.about || ""}
                  placeholder="Brief bio or about information"
                  rows={3}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-navy-900">
                  Replace Image
                </label>
                <FileUploader
                  name="image"
                  defaultImageUrl={member.imageUrl || null}
                />
              </div>
              <AdminSubmitButton
                className="w-fit rounded-full bg-navy-900 px-5 py-2 text-xs font-semibold text-ivory disabled:opacity-70"
                pendingLabel="Saving..."
                successLabel="Team member updated."
              >
                Save Changes
              </AdminSubmitButton>
            </form>
            <AdminDeleteForm
              action={deleteTeamMember}
              id={member._id.toString()}
              buttonLabel="Delete Member"
              pendingLabel="Deleting..."
              successLabel="Team member deleted."
              className="mt-4"
            />
          </div>
        ))}
        {team.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            No team members added yet.
          </div>
        ) : null}
      </div>
    </div>
  );
}
