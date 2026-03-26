"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <main className="flex min-h-screen flex-col items-center w-full pt-32 transition-colors duration-300">
      <section
        id="contact"
        className="w-full py-24 px-6 flex-1 flex flex-col justify-center overflow-hidden"
      >
        <div className="max-w-6xl mx-auto w-full">
          {/* Header */}
          <div data-aos="fade-down" className="text-center flex flex-col items-center mb-16">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-400/10 rounded-full flex items-center justify-center mb-6 border border-emerald-200 dark:border-emerald-400/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
              <svg
                className="w-6 h-6 text-emerald-500 dark:text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 dark:text-white">
              Let's work together
            </h2>
            <p className="text-slate-600 dark:text-white/60 text-lg max-w-2xl">
              I'm currently looking for new opportunities. Whether you have a
              question or just want to say hi, I'll try my best to get back to
              you!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Form */}
            <div data-aos="fade-right" data-aos-delay="200" className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 sm:p-10 rounded-3xl backdrop-blur-md shadow-xl dark:shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/50 dark:bg-emerald-400/5 rounded-full blur-3xl -z-10 group-hover:bg-emerald-200/50 dark:group-hover:bg-emerald-400/10 transition-colors duration-500"></div>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-slate-700 dark:text-white/80 text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:focus:ring-emerald-400/50 focus:border-emerald-500/50 dark:focus:border-emerald-400/50 transition-all backdrop-blur-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-slate-700 dark:text-white/80 text-sm font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:focus:ring-emerald-400/50 focus:border-emerald-500/50 dark:focus:border-emerald-400/50 transition-all backdrop-blur-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-slate-700 dark:text-white/80 text-sm font-medium mb-2"
                    >
                      Phone Number <span className="text-slate-400 dark:text-white/40 text-xs ml-1">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (234) 567-890"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:focus:ring-emerald-400/50 focus:border-emerald-500/50 dark:focus:border-emerald-400/50 transition-all backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-slate-700 dark:text-white/80 text-sm font-medium mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    required
                    rows={5}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:focus:ring-emerald-400/50 focus:border-emerald-500/50 dark:focus:border-emerald-400/50 transition-all resize-none backdrop-blur-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500 text-white dark:text-[#0b0416] font-bold rounded-xl px-8 py-4 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:scale-[1.02] transform transition-all mt-4 flex justify-center items-center gap-2"
                >
                  Send Message
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div data-aos="fade-left" data-aos-delay="400" className="flex flex-col gap-10 md:pt-4">
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-400/10 rounded-2xl flex items-center justify-center border border-emerald-200 dark:border-emerald-400/20 shrink-0 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-400/20 group-hover:scale-110 transition-all duration-300">
                  <span className="text-emerald-500 dark:text-emerald-400 text-2xl group-hover:animate-bounce mt-1">📍</span>
                </div>
                <div>
                  <h3 className="text-slate-800 dark:text-white font-bold text-xl mb-1.5">Our Location</h3>
                  <p className="text-slate-600 dark:text-white/60 leading-relaxed text-lg">
                    varanasi <br />
                    Uttar Pradesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-400/10 rounded-2xl flex items-center justify-center border border-emerald-200 dark:border-emerald-400/20 shrink-0 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-400/20 group-hover:scale-110 transition-all duration-300">
                  <span className="text-emerald-500 dark:text-emerald-400 text-2xl group-hover:-rotate-12 transition-transform">✉️</span>
                </div>
                <div>
                  <h3 className="text-slate-800 dark:text-white font-bold text-xl mb-1.5">Email Us</h3>
                  <a
                    href="mailto:hello@example.com"
                    className="text-slate-600 dark:text-white/60 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors text-lg"
                  >
                    hello@example.com
                  </a>
                  <p className="text-slate-400 dark:text-white/40 text-sm mt-1">
                    We'll reply within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-400/10 rounded-2xl flex items-center justify-center border border-emerald-200 dark:border-emerald-400/20 shrink-0 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-400/20 group-hover:scale-110 transition-all duration-300">
                  <span className="text-emerald-500 dark:text-emerald-400 text-2xl group-hover:rotate-12 transition-transform">📱</span>
                </div>
                <div>
                  <h3 className="text-slate-800 dark:text-white font-bold text-xl mb-1.5">Call Us</h3>
                  <a
                    href="tel:+1234567890"
                    className="text-slate-600 dark:text-white/60 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors text-lg"
                  >
                    +1 (234) 567-890
                  </a>
                  <p className="text-slate-400 dark:text-white/40 text-sm mt-1">
                    Mon-Fri from 9am to 6pm
                  </p>
                </div>
              </div>

              <div className="mt-6 p-8 bg-gradient-to-br from-emerald-100/50 dark:from-emerald-400/10 to-transparent rounded-3xl border border-emerald-200/50 dark:border-emerald-400/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 dark:bg-emerald-400/10 rounded-full blur-2xl -z-10"></div>
                <h4 className="text-emerald-500 dark:text-emerald-400 font-medium mb-4 text-lg">Social Connect</h4>
                <div className="flex gap-4">
                  {/* Social icons placeholders */}
                  <a
                    href="#"
                    className="w-12 h-12 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-emerald-500 dark:hover:bg-emerald-400 text-slate-600 dark:text-white/60 hover:text-white dark:hover:text-[#0b0416] transition-all duration-300 hover:scale-110 shadow-md dark:shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-emerald-500 dark:hover:bg-emerald-400 text-slate-600 dark:text-white/60 hover:text-white dark:hover:text-[#0b0416] transition-all duration-300 hover:scale-110 shadow-md dark:shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-emerald-500 dark:hover:bg-emerald-400 text-slate-600 dark:text-white/60 hover:text-white dark:hover:text-[#0b0416] transition-all duration-300 hover:scale-110 shadow-md dark:shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
