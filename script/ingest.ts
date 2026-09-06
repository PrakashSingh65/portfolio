import mongoose from "mongoose";
import "dotenv/config";
import { Document } from "@langchain/core/documents";
import { embeddings } from "../lib/embedding";
import About, { IAbout } from "../models/about.model";
import Project, { IProject } from "../models/project.model";
import Skill, { ISkill } from "../models/skill.model";
import Intro, { IIntro } from "../models/intro.model";
import Blog, { IBlog } from "../models/blog.model";
import Certificate, { ICertificate } from "../models/certificate.model";
import { ConnectDB } from "../lib/db";
import { PineconeStore } from "@langchain/pinecone";
import { pinecone, indexName } from "../lib/pinecone";

// ---------------------------
// Main ingestion function
// ---------------------------
async function ingest() {
  await ConnectDB();
  console.log("Connected to MongoDB...");

  const documents: Document[] = [];

  // ---------------------------
  // 1. Contact & Social Profiles (Crucial for contact/social queries)
  // ---------------------------
  const contactContent = `
Contact & Social Links for Prakash Singh:
- Name: Prakash Singh
- Profession: Full-Stack Web Developer & Software Engineer
- Education: Master of Computer Applications (MCA)
- Location: Varanasi, Uttar Pradesh, India
- Email: pratapsing5656@gmail.com
- GitHub Profile: https://github.com/PrakashSingh65 (GitHub ID: PrakashSingh65)
- LinkedIn Profile: https://www.linkedin.com/in/prakash-singh-rajput-a89a15243/
- Twitter / X Profile: https://x.com/Prakash89795230
- Instagram: https://www.instagram.com/coderps6/
- Portfolio Contact Page: /contact (Visitors can send a direct message through the contact form)
- Availability: Open to software engineering, full-stack developer roles, freelance work, and technical collaborations.
`.trim();

  documents.push(
    new Document({
      pageContent: contactContent,
      metadata: { type: "contact", title: "Contact Information & Social Links" },
    })
  );

  // ---------------------------
  // 2. Comprehensive Profile Document (for both intro & about queries)
  // ---------------------------
  const intros = (await Intro.find().lean()) as unknown as IIntro[];
  const abouts = (await About.find().lean()) as unknown as IAbout[];
  const introData = intros[0];
  const aboutData = abouts[0];

  const profileContent = `
Developer Profile & Biography of Prakash Singh:
- Name: Prakash Singh
- Title: Full-Stack Web Developer & Software Engineer
- Education: Pursuing Master of Computer Applications (MCA)
- Tagline: ${introData?.description || "Building Scalable Solutions for the Modern Web."}
- Biography: ${aboutData?.description || "I am a Full-Stack Web Developer pursuing MCA, specialized in building fast, scalable, and modern web applications."}
- Core Stack: React.js, Next.js, Node.js, FastAPI, Express.js, MongoDB, PostgreSQL, Python, TypeScript
- Resume / CV Link: ${introData?.file || "https://res.cloudinary.com/wetxbbv8/image/upload/v1784355304/portfolio/intro/zwa8ak1zno8fvooohdgx.pdf"}
`.trim();

  documents.push(
    new Document({
      pageContent: profileContent,
      metadata: { type: "intro", subtype: "profile" },
    })
  );
  documents.push(
    new Document({
      pageContent: profileContent,
      metadata: { type: "about", subtype: "profile" },
    })
  );

  // ---------------------------
  // 3. Fetch and process Skills
  // ---------------------------
  const skills = (await Skill.find().sort({ priority: -1 }).lean()) as unknown as ISkill[];

  // Group skills by category for a comprehensive summary document
  const skillsByCategory: Record<string, string[]> = {};
  skills.forEach((skill) => {
    const rawCat = skill.skillCategory?.trim().toLowerCase() || "other";
    const cat = rawCat.charAt(0).toUpperCase() + rawCat.slice(1);
    if (!skillsByCategory[cat]) skillsByCategory[cat] = [];
    skillsByCategory[cat].push(skill.skillName.trim());
  });

  const categorizedSummary = Object.entries(skillsByCategory)
    .map(([cat, list]) => `- ${cat}: ${list.join(", ")}`)
    .join("\n");

  const skillsSummaryDoc = `
Technical Skills & Tech Stack of Prakash Singh:
Prakash Singh has a comprehensive full-stack toolkit with ${skills.length} technical skills across multiple domains:

${categorizedSummary}

Summary:
- Frontend: React.js, Next.js, Tailwind CSS, Redux Toolkit, HTML5, CSS3
- Backend & APIs: Node.js, FastAPI, Express.js, RESTful APIs
- Databases: MongoDB, PostgreSQL, MySQL
- Languages: TypeScript, JavaScript (ES6+), Python, SQL
- Tools & DevOps: Docker, Git, GitHub, Postman, VS Code, Vercel, Render
- Architecture & Other: JWT Authentication, TanStack Query, LangChain, LangGraph
`.trim();

  documents.push(
    new Document({
      pageContent: skillsSummaryDoc,
      metadata: { type: "skill", subtype: "summary" },
    })
  );

  // Also index each individual skill for fine-grained semantic match
  skills.forEach((skill) => {
    const content = `Skill: ${skill.skillName} | Category: ${skill.skillCategory}`;
    documents.push(
      new Document({
        pageContent: content,
        metadata: { type: "skill", id: skill._id?.toString() || "" },
      })
    );
  });

  // ---------------------------
  // 4. Fetch and process Projects
  // ---------------------------
  const projects = (await Project.find().sort({ priority: -1 }).lean()) as unknown as IProject[];

  // Projects Overview Summary Document
  const projectsSummaryDoc = `
Projects Overview & Portfolio Work by Prakash Singh:
Prakash has created ${projects.length} key full-stack projects:
${projects
  .map(
    (proj, i) => `
${i + 1}. Project Name: ${proj.projectName}
   - Summary: ${proj.projectSubDesc || "A full-stack modern web application."}
   - Tech Stack: ${proj.projectTechStack?.join(", ") || "Full-Stack"}
   - GitHub Repository: ${proj.githubLink || "https://github.com/PrakashSingh65"}
   - Live URL: ${proj.liveLink || "N/A"}
`
  )
  .join("\n")}
`.trim();

  documents.push(
    new Document({
      pageContent: projectsSummaryDoc,
      metadata: { type: "project", subtype: "summary" },
    })
  );

  // Individual detailed project documents
  projects.forEach((proj) => {
    const content = `
Project: ${proj.projectName || "Untitled"}
Description: ${proj.projectDesc || "No description"}
Sub Description: ${proj.projectSubDesc || "N/A"}
Tech Stack: ${proj.projectTechStack?.join(", ") || "N/A"}
GitHub: ${proj.githubLink || "N/A"}
Live: ${proj.liveLink || "N/A"}
`.trim();
    documents.push(
      new Document({
        pageContent: content,
        metadata: {
          type: "project",
          id: proj._id?.toString() || "",
          title: proj.projectName || "Untitled",
        },
      })
    );
  });

  // ---------------------------
  // 5. Fetch and process Blogs
  // ---------------------------
  try {
    const blogs = (await Blog.find().lean()) as unknown as IBlog[];
    blogs.forEach((blog) => {
      const content = `
Blog Article: ${blog.title}
Tags: ${blog.tags?.join(", ") || "N/A"}
Summary: ${blog.content?.slice(0, 600) || "Technical blog article by Prakash Singh."}
`.trim();
      documents.push(
        new Document({
          pageContent: content,
          metadata: { type: "blog", id: blog._id?.toString() || "", title: blog.title },
        })
      );
    });
  } catch (e: any) {
    console.warn("Could not load blogs:", e.message);
  }

  // ---------------------------
  // 6. Fetch and process Certificates
  // ---------------------------
  try {
    const certs = (await Certificate.find().lean()) as unknown as ICertificate[];
    if (certs.length > 0) {
      const certDoc = `
Certifications Earned by Prakash Singh:
Prakash has earned ${certs.length} professional certifications in full-stack development, APIs, database engineering, and version control.
`.trim();
      documents.push(
        new Document({
          pageContent: certDoc,
          metadata: { type: "certificate" },
        })
      );
    }
  } catch (e: any) {
    console.warn("Could not load certificates:", e.message);
  }

  console.log(`Total documents to upsert: ${documents.length}`);

  // ---------------------------
  // Clear and Upsert to Pinecone
  // ---------------------------
  const pineconeIndex = pinecone.Index(indexName);

  try {
    console.log("Clearing existing Pinecone index records to prevent stale data...");
    await pineconeIndex.deleteAll();
    console.log("Existing records cleared.");
    await new Promise((resolve) => setTimeout(resolve, 3000));
  } catch (err: any) {
    console.warn("Note during index clear:", err.message);
  }

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
  });

  console.log("Upserting documents to Pinecone via PineconeStore...");
  await vectorStore.addDocuments(documents);

  console.log("Ingestion complete! All documents successfully indexed in Pinecone.");
  await mongoose.disconnect();
}

ingest().catch((err) => {
  console.error("Ingestion failed:", err);
});