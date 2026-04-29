import { dbConnect } from "@/lib/db";
import Image from "@/lib/models/Image";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();

    const image = await Image.findById(params.id);
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Extract base64 data from data URL
    const base64Data = image.data.split(",")[1];
    const buffer = Buffer.from(base64Data, "base64");

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": image.mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 },
    );
  }
}
