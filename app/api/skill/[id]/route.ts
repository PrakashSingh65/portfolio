import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ConnectDB } from "@/lib/db";
import Skill from "@/models/skill.model";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

async function uploadToCloudinary(
  file: File,
  type: "image" | "auto",
): Promise<[string, string]> {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: type, folder: "portfolio/skill" },
        (err, result) => {
          if (err || !result?.secure_url)
            return reject("Cloudinary upload failed");
          resolve([result.secure_url, result.public_id]);
        },
      )
      .end(buffer);
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ConnectDB();
    const { id } = await params;

    const existingSkill = await Skill.findById(id);
    if (!existingSkill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    const contentType = req.headers.get("content-type") || "";
    let skillCategory = existingSkill.skillCategory;
    let skillName = existingSkill.skillName;
    let priority = existingSkill.priority;
    let imageUrl = existingSkill.image;
    let imagePublicId = existingSkill.imagePublicId;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      if (formData.has("skillCategory")) {
        const cat = (formData.get("skillCategory") as string)?.trim();
        if (cat) skillCategory = cat;
      }
      if (formData.has("skillName")) {
        const name = (formData.get("skillName") as string)?.trim();
        if (name) skillName = name;
      }
      if (formData.has("priority")) {
        const p = formData.get("priority") as string;
        if (p !== null && p !== undefined) priority = parseInt(p, 10) || 0;
      }

      const imageFile = (formData.get("image") || formData.get("skillImage")) as File | null;
      if (imageFile && typeof imageFile === "object" && imageFile.size > 0) {
        if (imageFile.size > 5 * 1024 * 1024) {
          return NextResponse.json({ error: "Image size exceeds 5MB" }, { status: 400 });
        }

        const [url, pubId] = await uploadToCloudinary(imageFile, "image");

        if (imagePublicId) {
          try {
            await cloudinary.uploader.destroy(imagePublicId);
          } catch (e) {
            console.error("Failed to delete old image from Cloudinary:", e);
          }
        }

        imageUrl = url;
        imagePublicId = pubId;
      }
    } else {
      const body = await req.json();
      if (body.skillCategory !== undefined) skillCategory = body.skillCategory.trim();
      if (body.skillName !== undefined) skillName = body.skillName.trim();
      if (body.priority !== undefined) priority = Number(body.priority);
      if (body.image !== undefined) imageUrl = body.image;
      if (body.imagePublicId !== undefined) imagePublicId = body.imagePublicId;
    }

    existingSkill.skillCategory = skillCategory;
    existingSkill.skillName = skillName;
    existingSkill.priority = priority;
    existingSkill.image = imageUrl;
    existingSkill.imagePublicId = imagePublicId;

    await existingSkill.save();

    revalidatePath("/admin-panel/skill");
    revalidatePath("/skill");
    revalidatePath("/");

    return NextResponse.json({ data: existingSkill }, { status: 200 });
  } catch (error) {
    console.error("Failed to update skill:", error);
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ConnectDB();
    const { id } = await params;

    const skill = await Skill.findById(id);
    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    if (skill.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(skill.imagePublicId);
      } catch (e) {
        console.error("Failed to delete image from Cloudinary:", e);
      }
    }

    await Skill.findByIdAndDelete(id);

    revalidatePath("/admin-panel/skill");
    revalidatePath("/skill");
    revalidatePath("/");

    return NextResponse.json({ message: "Skill deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete skill:", error);
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}
