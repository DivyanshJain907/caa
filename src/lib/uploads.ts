import { dbConnect } from "@/lib/db";
import Image from "@/lib/models/Image";

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
}

export async function saveUploadedFile(file: File, folder = "uploads") {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image uploads are supported.");
  }

  // Connect to database
  await dbConnect();

  // Convert file to base64
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64Data = buffer.toString("base64");
  const dataUrl = `data:${file.type};base64,${base64Data}`;

  // Save to MongoDB with metadata
  const safeName = sanitizeFileName(file.name || "image");
  const image = await Image.create({
    name: `${Date.now()}-${safeName}`,
    data: dataUrl,
    mimeType: file.type,
    size: buffer.length,
  });

  // Return the image ID as a reference
  // The frontend will fetch the image data from /api/images/[id]
  return `/api/images/${image._id.toString()}`;
}
