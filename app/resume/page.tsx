export default function ResumePage() {
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

  return (
    <main className="flex min-h-screen flex-col items-center w-full pt-32 transition-colors duration-300">
      <section className="w-full py-12 px-6 max-w-4xl mx-auto flex-1 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Resume</h2>
            <div className="h-px w-32 bg-linear-to-r from-slate-200 dark:from-white/20 to-transparent" />
          </div>
          <a href="#" className="px-6 py-3 bg-emerald-100 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 font-semibold rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-400/20 transition-colors border border-emerald-200 dark:border-emerald-400/20 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download PDF
          </a>
        </div>

        <div className="space-y-16">
          {/* Experience Section */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-800 dark:text-white">
              <span className="text-emerald-500 dark:text-emerald-400">💼</span> Experience
            </h3>
            <div className="space-y-8 pl-4 border-l-2 border-slate-200 dark:border-white/10">
              {experience.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="absolute w-3 h-3 bg-emerald-500 dark:bg-emerald-400 rounded-full -left-[23px] top-2" />
                  <div className="mb-1 flex flex-col sm:flex-row sm:items-center justify-between">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h4>
                    <span className="text-emerald-600 dark:text-emerald-400/80 text-sm font-medium">{exp.duration}</span>
                  </div>
                  <div className="text-slate-600 dark:text-white/60 font-medium mb-3">{exp.company}</div>
                  <p className="text-slate-700 dark:text-white/70 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-800 dark:text-white">
              <span className="text-emerald-500 dark:text-emerald-400">🎓</span> Education
            </h3>
            <div className="space-y-8 pl-4 border-l-2 border-slate-200 dark:border-white/10">
              {education.map((edu, index) => (
                <div key={index} className="relative">
                  <div className="absolute w-3 h-3 bg-emerald-500 dark:bg-emerald-400 rounded-full -left-[23px] top-2" />
                  <div className="mb-1 flex flex-col sm:flex-row sm:items-center justify-between">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">{edu.degree}</h4>
                    <span className="text-emerald-600 dark:text-emerald-400/80 text-sm font-medium">{edu.duration}</span>
                  </div>
                  <div className="text-slate-600 dark:text-white/60 font-medium mb-3">{edu.university}</div>
                  <p className="text-slate-700 dark:text-white/70 leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
