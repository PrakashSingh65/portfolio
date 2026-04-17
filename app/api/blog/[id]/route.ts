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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ConnectDB();
    const resolvedParams = await params;
    const blog = await Blog.findById(resolvedParams.id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ data: blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ConnectDB();
    const resolvedParams = await params;
    
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

    const existingBlog = await Blog.findById(resolvedParams.id);
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    let imageUrl = existingBlog.image;
    let imagePublicId = existingBlog.imagePublicId;

    if (blogImage && typeof blogImage === 'object') {
      if (blogImage.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "Image size exceeds 5MB" }, { status: 400 });
      }

      if (existingBlog.imagePublicId) {
        try {
          await cloudinary.uploader.destroy(existingBlog.imagePublicId);
        } catch (error) {
          console.error("Cloudinary delete error:", error);
        }
      }

      const [url, pubId] = await uploadToCloudinary(blogImage, "image");
      imageUrl = url;
      imagePublicId = pubId;
    }

    const updateData = {
      title,
      content,
      image: imageUrl,
      imagePublicId,
      tags: tags ? tags.split(",").map((t) => t.trim()).filter((t) => t) : [],
    };

    const updatedBlog = await Blog.findByIdAndUpdate(resolvedParams.id, updateData, { new: true });

    revalidatePath("/admin-panel/blog");
    revalidatePath("/blog");
    revalidatePath("/");

    return NextResponse.json({ data: updatedBlog }, { status: 200 });

  } catch (error) {
    console.error("Blog update error:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ConnectDB();
    const resolvedParams = await params;

    const existingBlog = await Blog.findById(resolvedParams.id);
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (existingBlog.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(existingBlog.imagePublicId);
      } catch (error) {
        console.error("Cloudinary delete error:", error);
      }
    }

    await Blog.findByIdAndDelete(resolvedParams.id);

    revalidatePath("/admin-panel/blog");
    revalidatePath("/blog");
    revalidatePath("/");

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Blog delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 },
    );
  }
}
