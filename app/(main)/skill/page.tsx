import React from "react";
import { ConnectDB } from "../../../lib/db";
import Skill, { ISkill } from "../../../models/skill.model";
import { TooltipProvider } from "@/components/ui/tooltip";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

export const revalidate = 60;

const SkillGrid = dynamic(() => import("@/components/SkillGrid"), {
  loading: () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-xl" />
      ))}
    </div>
  ),
});

async function fetchSkills(): Promise<ISkill[]> {
  try {
    await ConnectDB();
    const skills = await Skill.find().sort({ priority: 1 }).lean<ISkill[]>();
    return skills.map((skill) => ({
      ...skill,
      _id: skill._id?.toString(),
    }));
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}

export default async function SkillPage() {
  const skills = await fetchSkills();

  return (
    <TooltipProvider>
      <section id="skills" aria-label="Skills & Technologies" className="max-w-5xl mx-auto px-4 lg:px-8 py-10">
        <div className="flex flex-col mb-6">
          <p className="text-sm font-semibold dark:text-emerald-400 text-emerald-600 uppercase tracking-wider">
            Featured
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Skills &amp; Technologies
          </h2>
        </div>
        <SkillGrid skills={skills} />
      </section>
    </TooltipProvider>
  );
}