import { ConnectDB } from "@/lib/db";
import Project from "@/models/project.model";
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
        { resource_type: type, folder: "portfolio/project" },
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
    const projects = await Project.find({}).sort({ priority: 1, createdAt: -1 });
    return NextResponse.json({ data: projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();
    
    const formData = await req.formData();
    const projectName = formData.get("projectName") as string;
    const projectDesc = formData.get("projectDesc") as string;
    const projectSubDesc = formData.get("projectSubDesc") as string || "";
    const projectTechStack = formData.get("projectTechStack") as string;
    const githubLink = formData.get("githubLink") as string;
    const liveLink = formData.get("liveLink") as string;
    const priority = formData.get("priority") as string;
    const projectImage = formData.get("projectImage") as File | null;

    if (!projectName || !projectDesc || !projectTechStack || !githubLink || !liveLink) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!projectImage || typeof projectImage !== 'object') {
       return NextResponse.json(
         { error: "Project image is required" },
         { status: 400 },
       );
    }

    if (projectImage.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Image size exceeds 5MB" }, { status: 400 });
    }
    
    let imageUrl = "";
    let imagePublicId = "";
    
    const [url, pubId] = await uploadToCloudinary(projectImage, "image");
    imageUrl = url;
    imagePublicId = pubId;

    const newProject = await Project.create({
      projectName,
      projectDesc,
      projectSubDesc,
      projectImage: imageUrl,
      projectImagePublicId: imagePublicId,
      projectTechStack: projectTechStack.split(",").map((t) => t.trim()).filter((t) => t),
      githubLink,
      liveLink,
      priority: parseInt(priority) || 0,
    });

    revalidatePath("/admin-panel/projects");
    revalidatePath("/");
    
    return NextResponse.json({ data: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
