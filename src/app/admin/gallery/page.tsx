import {
  createGalleryItem,
  deleteGalleryItem,
  updateGalleryItem,
  requireAdmin,
} from "@/app/admin/actions";
import { dbConnect } from "@/lib/db";
import GalleryItem from "@/lib/models/GalleryItem";
import FileUploader from "@/components/ui/FileUploader";
import AdminSubmitButton from "@/components/admin/AdminSubmitButton";
import AdminDeleteForm from "@/components/admin/AdminDeleteForm";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  await requireAdmin();
  await dbConnect();
  const gallery = (await GalleryItem.find()
    .sort({ createdAt: -1 })
    .lean()) as any[];

  return (
    <div className="grid gap-8">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-navy-900">Gallery</div>
        <p className="mt-2 text-sm text-slate-600">
          Upload and manage gallery images.
        </p>
      </div>

      <form
        action={createGalleryItem}
        className="grid gap-4 rounded-3xl bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-navy-900">Title</label>
            <input
              name="title"
              required
              placeholder="Image title"
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
          successLabel="Gallery item added."
        >
          Add Gallery Item
        </AdminSubmitButton>
      </form>

      <div className="grid gap-6">
        {gallery.map((item) => (
          <div
            key={item._id.toString()}
            className="rounded-3xl bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-28 w-36 rounded-2xl object-cover"
              />
              <form action={updateGalleryItem} className="grid flex-1 gap-4">
                <input type="hidden" name="id" value={item._id.toString()} />
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-navy-900">
                    Title
                  </label>
                  <input
                    name="title"
                    defaultValue={item.title}
                    placeholder="Image title"
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-navy-900">
                      Current Image
                    </label>
                    <input
                      name="currentImage"
                      defaultValue={item.imageUrl}
                      readOnly
                      title="Current image URL"
                      className="rounded-xl border border-slate-200 px-4 py-3 text-sm bg-slate-50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-navy-900">
                      Replace Image
                    </label>
                    <FileUploader name="image" />
                  </div>
                </div>
                <AdminSubmitButton
                  className="w-fit rounded-full bg-navy-900 px-5 py-2 text-xs font-semibold text-ivory disabled:opacity-70"
                  pendingLabel="Saving..."
                  successLabel="Gallery item updated."
                >
                  Save Changes
                </AdminSubmitButton>
              </form>
            </div>
            <AdminDeleteForm
              action={deleteGalleryItem}
              id={item._id.toString()}
              buttonLabel="Delete Item"
              pendingLabel="Deleting..."
              successLabel="Gallery item deleted."
              className="mt-4"
            />
          </div>
        ))}
        {gallery.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            No gallery items uploaded yet.
          </div>
        ) : null}
      </div>
    </div>
  );
}
