import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ConnectDB } from "@/lib/db";
import Skill from "@/models/skill.model";

export async function GET() {
    try {
        await ConnectDB();
        const skills = await Skill.find({}).sort({ priority: 1 });
        return NextResponse.json({ data: skills }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await ConnectDB();
        const body = await req.json();

        if (!body.skillName || !body.skillCategory || body.priority === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Default image logic since frontend might not upload an image yet
        const newSkillData = {
            ...body,
             image: body.image || "https://placeholder.com/150", 
        }

        const newSkill = await Skill.create(newSkillData);

        revalidatePath("/admin-panel/skill");
        revalidatePath("/");
        
        return NextResponse.json({ data: newSkill }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
    }
}
