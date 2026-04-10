import { NextRequest, NextResponse } from "next/server";

import { revalidatePath } from "next/cache";
import { ConnectDB } from "@/lib/db";
import About from "@/models/about.model";

export async function DELETE(req: NextRequest, { params }: { params: { id: string }}) {
    try {
        await ConnectDB()

        const { id } = params;

        const existAbout = await About.findById(id)

        if (!existAbout) {
            return NextResponse.json({ error: "About section not found" }, { status: 404 });
        }

        const deletedAbout = await About.findByIdAndDelete(id);

        if (!deletedAbout) {
            return NextResponse.json({ error: "Failed to delete about section" }, { status: 500 });
        }

        revalidatePath("/admin-panel/about");
        revalidatePath("/");
        return NextResponse.json({ message: "About section deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete about section" }, { status: 500 });       
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await ConnectDB();
        const { id } = await Promise.resolve(params);
        const { description } = await req.json();

        if (!description) {
            return NextResponse.json({ error: "Description is required" }, { status: 400 });
        }

        const updatedAbout = await About.findByIdAndUpdate(id, { description }, { new: true });

        if (!updatedAbout) {
            return NextResponse.json({ error: "About section not found" }, { status: 404 });
        }

        revalidatePath("/admin-panel/about");
        revalidatePath("/");
        
        return NextResponse.json({ data: updatedAbout }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update about section" }, { status: 500 });
    }
}