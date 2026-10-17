import { getIntroData } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume & Experience",
  description: "View the career journey, technical skills, and professional experience of Prakash Singh.",
};

export const revalidate = 60;

const experience = [
  {
    role: "Senior Full Stack Developer",
    company: "Tech Solutions Inc.",
    duration: "2021 - Present",
    description: "Led the development of scalable web applications using Next.js and Node.js. Architected cloud-native solutions, improving performance by 40%."
  },
  {
    role: "Frontend Engineer",
    company: "Creative Digital Agency",
    duration: "2019 - 2021",
    description: "Developed interactive UIs using React and Tailwind CSS. Collaborated with designers to implement pixel-perfect, responsive web designs."
  },
  {
    role: "Web Developer Intern",
    company: "Startup Hub",
    duration: "2018 - 2019",
    description: "Assisted in building internal tools and dashboards. Gained hands-on experience with RESTful APIs and modern JavaScript frameworks."
  }
];

const education = [
  {
    degree: "B.S. in Computer Science",
    university: "State University",
    duration: "2014 - 2018",
    description: "Focus on software engineering, data structures, and algorithms. Graduated with Honors."
  }
];

export default async function ResumePage() {
  const introDoc = await getIntroData();
  const resumeUrl = introDoc?.file || "#";

  return (
    <div className="flex flex-col items-center w-full pt-20 transition-colors duration-300">
      <section aria-label="Resume and Experience" className="w-full py-12 px-6 max-w-4xl mx-auto flex-1 flex flex-col justify-center overflow-hidden">
        <div data-aos="fade-down" className="flex items-center justify-between mb-16 flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Resume</h1>
            <div className="h-px w-32 bg-linear-to-r from-slate-200 dark:from-white/20 to-transparent" />
          </div>
          {resumeUrl !== "#" ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download resume PDF (opens in new tab)"
              className="px-6 py-3 bg-emerald-100 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-400 font-semibold rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-400/20 transition-colors border border-emerald-200 dark:border-emerald-400/20 flex items-center gap-2 min-h-[44px]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </a>
          ) : (
            <span className="px-6 py-3 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-zinc-400 font-semibold rounded-full border border-slate-200 dark:border-white/10 flex items-center gap-2 cursor-not-allowed min-h-[44px]">
              Download PDF (Unavailable)
            </span>
          )}
        </div>

        {/* Experience Section */}
        <div data-aos="fade-up" data-aos-delay="200" className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="text-emerald-600 dark:text-emerald-400" aria-hidden="true">💼</span> Work Experience
          </h2>
          <div className="space-y-12 border-l-2 border-slate-200 dark:border-white/10 ml-3 pl-8 relative">
            {experience.map((item, index) => (
              <div key={index} className="relative group">
                <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-50 dark:border-[#0b0416] transition-transform group-hover:scale-125" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.role}</h3>
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{item.duration}</span>
                </div>
                <div className="text-slate-700 dark:text-zinc-300 font-medium mb-3">{item.company}</div>
                <p className="text-slate-700 dark:text-zinc-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div data-aos="fade-up" data-aos-delay="400">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="text-emerald-600 dark:text-emerald-400" aria-hidden="true">🎓</span> Education
          </h2>
          <div className="space-y-12 border-l-2 border-slate-200 dark:border-white/10 ml-3 pl-8 relative">
            {education.map((item, index) => (
              <div key={index} className="relative group">
                <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-50 dark:border-[#0b0416] transition-transform group-hover:scale-125" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.degree}</h3>
                  <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">{item.duration}</span>
                </div>
                <div className="text-slate-700 dark:text-zinc-300 font-medium mb-3">{item.university}</div>
                <p className="text-slate-700 dark:text-zinc-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
