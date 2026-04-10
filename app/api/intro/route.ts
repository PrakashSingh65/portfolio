import { ConnectDB } from "@/lib/db";
import Intro from "@/models/intro.model";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

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
        { resource_type: type, folder: "portfolio/intro" },
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
    const intro = await Intro.findOne({});
    return NextResponse.json({ data: intro }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch intro" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();
    const existingIntro = await Intro.findOne({});
    if (existingIntro) {
      return NextResponse.json(
        { error: "Intro already exists" },
        { status: 400 },
      );
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const techStack = formData.get("techStack") as string;
    const desc = formData.get("desc") as string;
    const image = formData.get("image") as File | null;
    const file = formData.get("file") as File | null;

    if (!name || !techStack || !desc) {
      return NextResponse.json(
        { error: "Name, techStack, desc are required" },
        { status: 400 },
      );
    }

    let imageUrl = "https://placehold.co/500x500/png";
    let imagePublicId = "";
    if (image && typeof image === 'object') {
      if (image.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "Image size exceeds 5MB" }, { status: 400 });
      }
      const [url, pubId] = await uploadToCloudinary(image, "image");
      imageUrl = url;
      imagePublicId = pubId;
    }

    let fileUrl = "#";
    let filePublicId = "";
    if (file && typeof file === 'object') {
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: "File size exceeds 10MB" }, { status: 400 });
      }
      const [url, pubId] = await uploadToCloudinary(file, "auto");
      fileUrl = url;
      filePublicId = pubId;
    }

    const newIntro = await Intro.create({
      name,
      techStack: techStack.split(",").map((t) => t.trim()),
      description: desc, // Fixed property mapping
      image: imageUrl,
      file: fileUrl,
      imagePublicId,
      filePublicId,
    });

    revalidatePath("/admin-panel/intro");
    revalidatePath("/");
    return NextResponse.json({ data: newIntro }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create intro" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await ConnectDB();
    const existingIntro = await Intro.findOne({});
    if (!existingIntro) {
      return NextResponse.json({ error: "Intro not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const techStack = formData.get("techStack") as string;
    const desc = formData.get("desc") as string;
    const image = formData.get("image") as File | null;
    const file = formData.get("file") as File | null;

    if (!name || !techStack || !desc) {
      return NextResponse.json({ error: "Name, techStack, desc are required" }, { status: 400 });
    }

    let imageUrl = existingIntro.image;
    let imagePublicId = existingIntro.imagePublicId;
    let fileUrl = existingIntro.file;
    let filePublicId = existingIntro.filePublicId;

    if (image && typeof image === 'object') {
       if (image.size > 5 * 1024 * 1024) return NextResponse.json({ error: "Image size exceeds 5MB" }, { status: 400 });
       const [url, pubId] = await uploadToCloudinary(image, "image");
       imageUrl = url; imagePublicId = pubId;
    }

    if (file && typeof file === 'object') {
       if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "File size exceeds 10MB" }, { status: 400 });
       const [url, pubId] = await uploadToCloudinary(file, "auto");
       fileUrl = url; filePublicId = pubId;
    }

    existingIntro.name = name;
    existingIntro.techStack = techStack.split(",").map((t) => t.trim());
    existingIntro.description = desc;
    existingIntro.image = imageUrl;
    existingIntro.imagePublicId = imagePublicId;
    existingIntro.file = fileUrl;
    existingIntro.filePublicId = filePublicId;
    await existingIntro.save();

    revalidatePath("/admin-panel/intro");
    revalidatePath("/");
    return NextResponse.json({ data: existingIntro }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update intro" }, { status: 500 });
  }
}
