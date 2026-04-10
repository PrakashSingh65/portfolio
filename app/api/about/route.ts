import { NextRequest, NextResponse } from "next/server";

import { revalidatePath } from "next/cache";
import { ConnectDB } from "@/lib/db";
import About from "@/models/about.model";

export async function GET() {
    try {
        await ConnectDB();
        const about = await About.findOne({});
        return NextResponse.json({ data: about }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch about section" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await ConnectDB()

        const existAbout = await About.findOne({});

        if (existAbout) {
            return NextResponse.json({ error: "About section already exists" }, { status: 400 });
        }

       const { description } = await req.json();

        if (!description) {
            return NextResponse.json({ error: "Description is required" }, { status: 400 });
        }

        const newAbout = await About.create({ description });

        revalidatePath("/admin-panel/about");
        revalidatePath("/");
        return NextResponse.json({data: newAbout}, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: "Failed to create about section" }, { status: 500 });
    }
}