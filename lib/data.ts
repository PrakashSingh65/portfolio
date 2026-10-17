import { ConnectDB } from "./db";
import Intro, { IIntro } from "@/models/intro.model";
import About, { IAbout } from "@/models/about.model";
import Skill, { ISkill } from "@/models/skill.model";
import Project, { IProject } from "@/models/project.model";
import Certificate, { ICertificate } from "@/models/certificate.model";
import Blog, { IBlog } from "@/models/blog.model";

// In-memory cache for ultra-fast server response (5-minute TTL)
const memoryCache: Record<string, { data: unknown; expiry: number }> = {};
const CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes

async function getCached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const now = Date.now();
  if (memoryCache[key] && memoryCache[key].expiry > now) {
    return memoryCache[key].data as T;
  }
  try {
    const fresh = await fetcher();
    memoryCache[key] = { data: fresh, expiry: now + CACHE_TTL_MS };
    return fresh;
  } catch (error) {
    if (memoryCache[key]) {
      return memoryCache[key].data as T; // Return stale data if available
    }
    throw error;
  }
}

function serialize<T>(data: unknown): T | null {
  if (!data) return null;
  return JSON.parse(JSON.stringify(data)) as T;
}

function serializeArray<T>(data: unknown): T[] {
  if (!data || !Array.isArray(data)) return [];
  return JSON.parse(JSON.stringify(data)) as T[];
}

export async function getIntroData(): Promise<IIntro | null> {
  return getCached("intro", async () => {
    try {
      await ConnectDB();
      const data = await Intro.findOne({}).lean();
      return serialize<IIntro>(data);
    } catch (error) {
      console.error("Error fetching intro data:", error);
      return null;
    }
  });
}

export async function getAboutData(): Promise<IAbout | null> {
  return getCached("about", async () => {
    try {
      await ConnectDB();
      const data = await About.findOne({}).lean();
      return serialize<IAbout>(data);
    } catch (error) {
      console.error("Error fetching about data:", error);
      return null;
    }
  });
}

export async function getSkillsData(): Promise<ISkill[]> {
  return getCached("skills", async () => {
    try {
      await ConnectDB();
      const data = await Skill.find({}).sort({ priority: 1 }).lean();
      return serializeArray<ISkill>(data);
    } catch (error) {
      console.error("Error fetching skills data:", error);
      return [];
    }
  });
}

export async function getProjectsData(): Promise<IProject[]> {
  return getCached("projects", async () => {
    try {
      await ConnectDB();
      const data = await Project.find({}).sort({ priority: 1, createdAt: -1 }).lean();
      return serializeArray<IProject>(data);
    } catch (error) {
      console.error("Error fetching projects data:", error);
      return [];
    }
  });
}

export async function getCertificatesData(limit?: number): Promise<ICertificate[]> {
  const cacheKey = limit ? `certificates_${limit}` : "certificates_all";
  return getCached(cacheKey, async () => {
    try {
      await ConnectDB();
      const query = Certificate.find().sort({ priority: 1 });
      if (limit) query.limit(limit);
      const data = await query.lean();
      return serializeArray<ICertificate>(data);
    } catch (error) {
      console.error("Error fetching certificates data:", error);
      return [];
    }
  });
}

export async function getBlogsData(limit?: number): Promise<IBlog[]> {
  const cacheKey = limit ? `blogs_${limit}` : "blogs_all";
  return getCached(cacheKey, async () => {
    try {
      await ConnectDB();
      const query = Blog.find().sort({ createdAt: -1 });
      if (limit) query.limit(limit);
      const data = await query.lean();
      return serializeArray<IBlog>(data);
    } catch (error) {
      console.error("Error fetching blogs data:", error);
      return [];
    }
  });
}
