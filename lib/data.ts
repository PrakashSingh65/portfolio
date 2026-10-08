import { ConnectDB } from "./db";
import Intro, { IIntro } from "@/models/intro.model";
import About, { IAbout } from "@/models/about.model";
import Skill, { ISkill } from "@/models/skill.model";
import Project, { IProject } from "@/models/project.model";

// Utility to convert MongoDB documents to plain, JSON-serializable objects
// (removes Mongoose-specific properties, converts ObjectIds and Dates to strings)
function serialize<T>(data: unknown): T | null {
  if (!data) return null;
  return JSON.parse(JSON.stringify(data)) as T;
}

function serializeArray<T>(data: unknown): T[] {
  if (!data || !Array.isArray(data)) return [];
  return JSON.parse(JSON.stringify(data)) as T[];
}

export async function getIntroData(): Promise<IIntro | null> {
  try {
    await ConnectDB();
    const data = await Intro.findOne({}).lean();
    return serialize<IIntro>(data);
  } catch (error) {
    console.error("Error fetching intro data:", error);
    return null;
  }
}

export async function getAboutData(): Promise<IAbout | null> {
  try {
    await ConnectDB();
    const data = await About.findOne({}).lean();
    return serialize<IAbout>(data);
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
}

export async function getSkillsData(): Promise<ISkill[]> {
  try {
    await ConnectDB();
    const data = await Skill.find({}).sort({ priority: 1 }).lean();
    return serializeArray<ISkill>(data);
  } catch (error) {
    console.error("Error fetching skills data:", error);
    return [];
  }
}

export async function getProjectsData(): Promise<IProject[]> {
  try {
    await ConnectDB();
    const data = await Project.find({}).sort({ priority: 1, createdAt: -1 }).lean();
    return serializeArray<IProject>(data);
  } catch (error) {
    console.error("Error fetching projects data:", error);
    return [];
  }
}
