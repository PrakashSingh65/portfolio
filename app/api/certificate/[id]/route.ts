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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await ConnectDB();
    
    const existingCertificate = await Certificate.findById(id);
    if (!existingCertificate) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const priority = formData.get("priority") as string;
    const certificateImage = formData.get("certificateImage") as File | null;

    let imageUrl = existingCertificate.imageUrl;
    let imagePublicId = existingCertificate.imageUrlPublicId;

    if (certificateImage && typeof certificateImage === 'object') {
      if (certificateImage.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "Image size exceeds 5MB" }, { status: 400 });
      }
      
      const [url, pubId] = await uploadToCloudinary(certificateImage, "image");
      
      if (imagePublicId) {
          try {
            await cloudinary.uploader.destroy(imagePublicId);
          } catch(e) {
            console.log("Failed to delete old image from Cloudinary");
          }
      }
      
      imageUrl = url;
      imagePublicId = pubId;
    }

    existingCertificate.imageUrl = imageUrl;
    existingCertificate.imageUrlPublicId = imagePublicId;
    if (priority) {
      existingCertificate.priority = parseInt(priority);
    }

    await existingCertificate.save();

    revalidatePath("/admin-panel/certificates");
    revalidatePath("/");
    
    return NextResponse.json({ data: existingCertificate }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update certificate" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await ConnectDB();
    
    const existingCertificate = await Certificate.findById(id);
    if (!existingCertificate) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    if (existingCertificate.imageUrlPublicId) {
      try {
        await cloudinary.uploader.destroy(existingCertificate.imageUrlPublicId);
      } catch(e) {
        console.log("Failed to delete image from Cloudinary");
      }
    }

    await Certificate.findByIdAndDelete(id);

    revalidatePath("/admin-panel/certificates");
    revalidatePath("/");
    
    return NextResponse.json({ message: "Certificate deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete certificate" },
      { status: 500 },
    );
  }
}
