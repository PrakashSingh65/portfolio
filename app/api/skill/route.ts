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

export async function GET() {
  try {
    await ConnectDB();
    const skills = await Skill.find({}).sort({ priority: 1, createdAt: -1 });
    return NextResponse.json({ data: skills }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();

    const contentType = req.headers.get("content-type") || "";
    let skillCategory = "";
    let skillName = "";
    let priority = 0;
    let imageUrl = "";
    let imagePublicId = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      skillCategory = (formData.get("skillCategory") as string)?.trim();
      skillName = (formData.get("skillName") as string)?.trim();
      const priorityStr = formData.get("priority") as string;
      priority = priorityStr !== null ? parseInt(priorityStr, 10) || 0 : 0;
      const imageFile = (formData.get("image") || formData.get("skillImage")) as File | null;

      if (!skillName || !skillCategory) {
        return NextResponse.json({ error: "Skill category and name are required" }, { status: 400 });
      }

      if (!imageFile || typeof imageFile !== "object" || imageFile.size === 0) {
        return NextResponse.json({ error: "Skill image is required" }, { status: 400 });
      }

      if (imageFile.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "Image size exceeds 5MB" }, { status: 400 });
      }

      const [url, pubId] = await uploadToCloudinary(imageFile, "image");
      imageUrl = url;
      imagePublicId = pubId;
    } else {
      // Fallback for JSON requests
      const body = await req.json();
      skillCategory = body.skillCategory?.trim();
      skillName = body.skillName?.trim();
      priority = body.priority !== undefined ? Number(body.priority) : 0;
      imageUrl = body.image || "https://placeholder.com/150";
      imagePublicId = body.imagePublicId || "";

      if (!skillName || !skillCategory) {
        return NextResponse.json({ error: "Skill category and name are required" }, { status: 400 });
      }
    }

    const newSkill = await Skill.create({
      skillCategory,
      skillName,
      priority,
      image: imageUrl,
      imagePublicId,
    });

    revalidatePath("/admin-panel/skill");
    revalidatePath("/skill");
    revalidatePath("/");

    return NextResponse.json({ data: newSkill }, { status: 201 });
  } catch (error) {
    console.error("Failed to create skill:", error);
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}
