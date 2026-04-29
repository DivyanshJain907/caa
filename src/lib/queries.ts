import { dbConnect } from "@/lib/db";
import Service from "@/lib/models/Service";
import TeamMember from "@/lib/models/TeamMember";
import GalleryItem from "@/lib/models/GalleryItem";
import Certificate from "@/lib/models/Certificate";
import Career from "@/lib/models/Career";

function toPlain<T extends { _id: any }>(doc: T) {
  return { ...doc, _id: doc._id.toString() } as T & { _id: string };
}

export async function getServices() {
  await dbConnect();
  const services = await Service.find().sort({ category: 1, title: 1 }).lean();
  return services.map(toPlain);
}

export async function getTeam() {
  await dbConnect();
  const team = await TeamMember.find().sort({ createdAt: -1 }).lean();
  return team.map(toPlain);
}

export async function getGallery() {
  await dbConnect();
  const gallery = await GalleryItem.find().sort({ createdAt: -1 }).lean();
  return gallery.map(toPlain);
}

export async function getCertificates() {
  await dbConnect();
  const certificates = await Certificate.find().sort({ createdAt: -1 }).lean();
  return certificates.map(toPlain);
}

export async function getCareers() {
  await dbConnect();
  const careers = await Career.find().sort({ createdAt: -1 }).lean();
  return careers.map(toPlain);
}
