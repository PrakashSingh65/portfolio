import { ConnectDB } from "@/lib/db";
import Certificate from "@/models/certificate.model";
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
        { resource_type: type, folder: "portfolio/certificate" },
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
    const certificates = await Certificate.find({}).sort({ priority: 1, createdAt: -1 });
    return NextResponse.json({ data: certificates }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();
    
    const formData = await req.formData();
    const priority = formData.get("priority") as string;
    const certificateImage = formData.get("certificateImage") as File | null;

    if (!certificateImage || typeof certificateImage !== 'object') {
       return NextResponse.json(
         { error: "Certificate image is required" },
         { status: 400 },
       );
    }

    if (certificateImage.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Image size exceeds 5MB" }, { status: 400 });
    }
    
    let imageUrl = "";
    let imagePublicId = "";
    
    const [url, pubId] = await uploadToCloudinary(certificateImage, "image");
    imageUrl = url;
    imagePublicId = pubId;

    const newCertificate = await Certificate.create({
      imageUrl: imageUrl,
      imageUrlPublicId: imagePublicId,
      priority: parseInt(priority) || 0,
    });

    revalidatePath("/admin-panel/certificates");
    revalidatePath("/");
    
    return NextResponse.json({ data: newCertificate }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create certificate" },
      { status: 500 },
    );
  }
}
