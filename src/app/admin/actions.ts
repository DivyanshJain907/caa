"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import { saveUploadedFile } from "@/lib/uploads";
import Service from "@/lib/models/Service";
import TeamMember from "@/lib/models/TeamMember";
import GalleryItem from "@/lib/models/GalleryItem";
import Certificate from "@/lib/models/Certificate";
import Career from "@/lib/models/Career";
import Contact from "@/lib/models/Contact";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/admin/login");
  }
}

function textValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function createService(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const title = textValue(formData, "title");
  const category = textValue(formData, "category");
  const description = textValue(formData, "description");
  const imageUrlField = textValue(formData, "imageUrl");
  const file = formData.get("image") as File | null;
  let imageUrl = imageUrlField;

  if (file && file.size > 0) {
    imageUrl = await saveUploadedFile(file, "services");
  }

  if (!title || !category || !description) {
    throw new Error("Missing required fields");
  }

  await Service.create({ title, category, description, imageUrl });
  revalidatePath("/services");
  revalidatePath("/admin/services");
}

export async function updateService(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const id = textValue(formData, "id");
  const title = textValue(formData, "title");
  const category = textValue(formData, "category");
  const description = textValue(formData, "description");
  const imageUrlField = textValue(formData, "imageUrl");
  const file = formData.get("image") as File | null;
  let imageUrl = imageUrlField;

  if (file && file.size > 0) {
    imageUrl = await saveUploadedFile(file, "services");
  }

  await Service.findByIdAndUpdate(id, {
    title,
    category,
    description,
    imageUrl: imageUrl || undefined,
  });
  revalidatePath("/services");
  revalidatePath("/admin/services");
}

export async function deleteService(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const id = textValue(formData, "id");
  await Service.findByIdAndDelete(id);
  revalidatePath("/services");
  revalidatePath("/admin/services");
}

export async function createTeamMember(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const name = textValue(formData, "name");
  const role = textValue(formData, "role");
  const specialization = textValue(formData, "specialization");
  const about = textValue(formData, "about");
  const imageUrlField = textValue(formData, "imageUrl");
  const file = formData.get("image") as File | null;
  let imageUrl = imageUrlField;

  if (file && file.size > 0) {
    imageUrl = await saveUploadedFile(file, "team");
  }

  if (!name || !role || !specialization) {
    throw new Error("Missing required fields");
  }

  await TeamMember.create({ name, role, specialization, about, imageUrl });
  revalidatePath("/team");
  revalidatePath("/admin/team");
}

export async function updateTeamMember(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const id = textValue(formData, "id");
  const name = textValue(formData, "name");
  const role = textValue(formData, "role");
  const specialization = textValue(formData, "specialization");
  const about = textValue(formData, "about");
  const imageUrlField = textValue(formData, "imageUrl");
  const file = formData.get("image") as File | null;
  let imageUrl = imageUrlField;

  if (file && file.size > 0) {
    imageUrl = await saveUploadedFile(file, "team");
  }

  await TeamMember.findByIdAndUpdate(id, {
    name,
    role,
    specialization,
    about,
    imageUrl: imageUrl || undefined,
  });
  revalidatePath("/team");
  revalidatePath("/admin/team");
}

export async function deleteTeamMember(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const id = textValue(formData, "id");
  await TeamMember.findByIdAndDelete(id);
  revalidatePath("/team");
  revalidatePath("/admin/team");
}

export async function createGalleryItem(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const title = textValue(formData, "title");
  const imageUrlField = textValue(formData, "imageUrl");
  const file = formData.get("image") as File | null;
  let imageUrl = imageUrlField;

  if (file && file.size > 0) {
    imageUrl = await saveUploadedFile(file, "gallery");
  }

  if (!title || !imageUrl) {
    throw new Error("Missing required fields");
  }

  await GalleryItem.create({ title, imageUrl });
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

export async function updateGalleryItem(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const id = textValue(formData, "id");
  const title = textValue(formData, "title");
  const imageUrlField = textValue(formData, "imageUrl");
  const file = formData.get("image") as File | null;
  let imageUrl = imageUrlField;

  if (file && file.size > 0) {
    imageUrl = await saveUploadedFile(file, "gallery");
  }

  const update: Record<string, string> = { title };
  if (imageUrl) {
    update.imageUrl = imageUrl;
  }

  await GalleryItem.findByIdAndUpdate(id, update);
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

export async function deleteGalleryItem(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const id = textValue(formData, "id");
  await GalleryItem.findByIdAndDelete(id);
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

export async function createCertificate(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const title = textValue(formData, "title");
  const issuer = textValue(formData, "issuer");
  const issuedYear = textValue(formData, "issuedYear");
  const imageUrlField = textValue(formData, "imageUrl");
  const file = formData.get("image") as File | null;
  let imageUrl = imageUrlField;

  if (file && file.size > 0) {
    imageUrl = await saveUploadedFile(file, "certificates");
  }

  if (!title || !imageUrl) {
    throw new Error("Missing required fields");
  }

  await Certificate.create({ title, issuer, issuedYear, imageUrl });
  revalidatePath("/gallery");
  revalidatePath("/admin/certificates");
}

export async function updateCertificate(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const id = textValue(formData, "id");
  const title = textValue(formData, "title");
  const issuer = textValue(formData, "issuer");
  const issuedYear = textValue(formData, "issuedYear");
  const imageUrlField = textValue(formData, "imageUrl");
  const file = formData.get("image") as File | null;
  let imageUrl = imageUrlField;

  if (file && file.size > 0) {
    imageUrl = await saveUploadedFile(file, "certificates");
  }

  const update: Record<string, string> = { title, issuer, issuedYear };
  if (imageUrl) {
    update.imageUrl = imageUrl;
  }

  await Certificate.findByIdAndUpdate(id, update);
  revalidatePath("/gallery");
  revalidatePath("/admin/certificates");
}

export async function deleteCertificate(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const id = textValue(formData, "id");
  await Certificate.findByIdAndDelete(id);
  revalidatePath("/gallery");
  revalidatePath("/admin/certificates");
}

export async function createCareer(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const title = textValue(formData, "title");
  const location = textValue(formData, "location");
  const type = textValue(formData, "type");
  const experience = textValue(formData, "experience");
  const description = textValue(formData, "description");

  if (!title || !location || !type || !description) {
    throw new Error("Missing required fields");
  }

  await Career.create({ title, location, type, experience, description });
  revalidatePath("/careers");
  revalidatePath("/admin/careers");
}

export async function updateCareer(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const id = textValue(formData, "id");
  const title = textValue(formData, "title");
  const location = textValue(formData, "location");
  const type = textValue(formData, "type");
  const experience = textValue(formData, "experience");
  const description = textValue(formData, "description");

  await Career.findByIdAndUpdate(id, {
    title,
    location,
    type,
    experience,
    description,
  });
  revalidatePath("/careers");
  revalidatePath("/admin/careers");
}

export async function deleteCareer(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const id = textValue(formData, "id");
  await Career.findByIdAndDelete(id);
  revalidatePath("/careers");
  revalidatePath("/admin/careers");
}

export async function deleteContact(formData: FormData) {
  await requireAdmin();
  await dbConnect();

  const id = textValue(formData, "id");
  await Contact.findByIdAndDelete(id);
  revalidatePath("/admin/contacts");
}
