import { ConnectDB } from "@/lib/db";
import Blog from "@/models/blog.model";
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
        { resource_type: type, folder: "portfolio/blog" },
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
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ data: blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();
    
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = formData.get("tags") as string;
    const blogImage = formData.get("image") as File | null;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Missing required fields (title, content)" },
        { status: 400 },
      );
    }

    if (!blogImage || typeof blogImage !== 'object') {
       return NextResponse.json(
         { error: "Blog image is required" },
         { status: 400 },
       );
    }

    if (blogImage.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Image size exceeds 5MB" }, { status: 400 });
    }
    
    let imageUrl = "";
    let imagePublicId = "";
    
    const [url, pubId] = await uploadToCloudinary(blogImage, "image");
    imageUrl = url;
    imagePublicId = pubId;

    const newBlog = await Blog.create({
      title,
      content,
      image: imageUrl,
      imagePublicId,
      tags: tags ? tags.split(",").map((t) => t.trim()).filter((t) => t) : [],
    });

    revalidatePath("/admin-panel/blog");
    revalidatePath("/blog");
    revalidatePath("/");
    
    return NextResponse.json({ data: newBlog }, { status: 201 });
  } catch (error) {
    console.error("Blog creation error:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 },
    );
  }
}
