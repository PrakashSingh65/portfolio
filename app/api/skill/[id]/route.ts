import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ConnectDB } from "@/lib/db";
import Skill from "@/models/skill.model";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await ConnectDB();
        const { id } = await Promise.resolve(params);
        const body = await req.json();

        const updatedSkill = await Skill.findByIdAndUpdate(id, body, { new: true });

        if (!updatedSkill) {
            return NextResponse.json({ error: "Skill not found" }, { status: 404 });
        }

        revalidatePath("/admin-panel/skill");
        revalidatePath("/");
        
        return NextResponse.json({ data: updatedSkill }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await ConnectDB();
        const { id } = await Promise.resolve(params);

        const skill = await Skill.findById(id);
        if (!skill) {
            return NextResponse.json({ error: "Skill not found" }, { status: 404 });
        }

        await Skill.findByIdAndDelete(id);

        revalidatePath("/admin-panel/skill");
        revalidatePath("/");
        
        return NextResponse.json({ message: "Skill deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
    }
}
