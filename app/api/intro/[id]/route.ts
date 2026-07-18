import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";
import Intro from "@/models/intro.model";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

async function uploadToCloudinary(file: File, type: "image" | "auto"): Promise<[string, string]> {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: type, folder: "portfolio/intro" },
      (err, result) => {
        if (err || !result?.secure_url) return reject("Cloudinary upload failed");
        resolve([result.secure_url, result.public_id]);
      }
    ).end(buffer);
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await ConnectDB();

    const existingIntro = await Intro.findById(id);
    if (!existingIntro) {
      return NextResponse.json({ error: "Intro not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const techStack = formData.get("techStack") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;
    const file = formData.get("file") as File | null;

    if (!name || !techStack || !description) {
      return NextResponse.json({ error: "Name, techStack, and description are required" }, { status: 400 });
    }

    // Update text fields
    existingIntro.name = name;
    existingIntro.techStack = techStack.split(",").map((t: string) => t.trim());
    existingIntro.description = description;

    // Handle image update
    if (image && typeof image === "object" && image.size > 0) {
      if (image.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "Image size exceeds 5MB" }, { status: 400 });
      }

      // Delete old image from Cloudinary
      if (existingIntro.imagePublicId) {
        try {
          await cloudinary.uploader.destroy(existingIntro.imagePublicId);
        } catch (e) {
          console.log("Failed to delete old image from Cloudinary");
        }
      }

      const [imageUrl, imagePublicId] = await uploadToCloudinary(image, "image");
      existingIntro.image = imageUrl;
      existingIntro.imagePublicId = imagePublicId;
    }

    // Handle file/resume update
    if (file && typeof file === "object" && file.size > 0) {
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: "File size exceeds 10MB" }, { status: 400 });
      }

      // Delete old file from Cloudinary
      if (existingIntro.filePublicId) {
        try {
          await cloudinary.uploader.destroy(existingIntro.filePublicId, { resource_type: "raw" });
        } catch (e) {
          console.log("Failed to delete old file from Cloudinary");
        }
      }

      const [fileUrl, filePublicId] = await uploadToCloudinary(file, "auto");
      existingIntro.file = fileUrl;
      existingIntro.filePublicId = filePublicId;
    }

    await existingIntro.save();

    revalidatePath("/admin-panel/intro");
    revalidatePath("/");

    return NextResponse.json({ data: existingIntro }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update intro" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await ConnectDB();

    const existingIntro = await Intro.findById(id);
    if (!existingIntro) {
      return NextResponse.json({ error: "Intro not found" }, { status: 404 });
    }

    // Clean up Cloudinary assets
    if (existingIntro.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(existingIntro.imagePublicId);
      } catch (e) {
        console.log("Failed to delete image from Cloudinary");
      }
    }

    if (existingIntro.filePublicId) {
      try {
        await cloudinary.uploader.destroy(existingIntro.filePublicId, { resource_type: "raw" });
      } catch (e) {
        console.log("Failed to delete file from Cloudinary");
      }
    }

    await Intro.findByIdAndDelete(id);

    revalidatePath("/admin-panel/intro");
    revalidatePath("/");

    return NextResponse.json({ message: "Intro deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete intro" }, { status: 500 });
  }
}
