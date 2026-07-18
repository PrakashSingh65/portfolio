import { ConnectDB } from "./db";
import Intro from "@/models/intro.model";
import About from "@/models/about.model";
import Skill from "@/models/skill.model";
import Project from "@/models/project.model";

// Utility to convert MongoDB documents to plain, JSON-serializable objects
// (removes Mongoose-specific properties, converts ObjectIds and Dates to strings)
function serialize<T>(data: any): T | null {
  if (!data) return null;
  return JSON.parse(JSON.stringify(data)) as T;
}

function serializeArray<T>(data: any[]): T[] {
  if (!data || !Array.isArray(data)) return [];
  return JSON.parse(JSON.stringify(data)) as T[];
}

export async function getIntroData() {
  try {
    await ConnectDB();
    const data = await Intro.findOne({}).lean();
    return serialize<any>(data);
  } catch (error) {
    console.error("Error fetching intro data:", error);
    return null;
  }
}

export async function getAboutData() {
  try {
    await ConnectDB();
    const data = await About.findOne({}).lean();
    return serialize<any>(data);
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
}

export async function getSkillsData() {
  try {
    await ConnectDB();
    const data = await Skill.find({}).sort({ priority: 1 }).lean();
    return serializeArray<any>(data);
  } catch (error) {
    console.error("Error fetching skills data:", error);
    return [];
  }
}

export async function getProjectsData() {
  try {
    await ConnectDB();
    const data = await Project.find({}).sort({ priority: 1, createdAt: -1 }).lean();
    return serializeArray<any>(data);
  } catch (error) {
    console.error("Error fetching projects data:", error);
    return [];
  }
}
