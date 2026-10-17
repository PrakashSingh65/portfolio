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
    <div className="flex flex-col items-center w-full pt-20 transition-colors duration-300">
      <section
        id="contact"
        aria-label="Contact Information and Inquiries"
        className="w-full py-20 px-6 flex-1 flex flex-col justify-center overflow-hidden"
      >
        <div className="max-w-6xl mx-auto w-full">
          {/* Header */}
          <div data-aos="fade-down" className="text-center flex flex-col items-center mb-16">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-400/10 rounded-full flex items-center justify-center mb-6 border border-emerald-200 dark:border-emerald-400/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
              <svg
                className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Let&apos;s work together
            </h2>
            <p className="text-slate-700 dark:text-zinc-300 text-lg max-w-2xl">
              I&apos;m currently open to new opportunities, collaborations, and projects. Whether you have a question or just want to connect, feel free to reach out!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Form */}
            <div
              data-aos="fade-right"
              data-aos-delay="200"
              className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 sm:p-10 rounded-3xl backdrop-blur-md shadow-xl dark:shadow-2xl relative overflow-hidden group"
            >
              <div
                className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/50 dark:bg-emerald-400/5 rounded-full blur-3xl -z-10 group-hover:bg-emerald-200/50 dark:group-hover:bg-emerald-400/10 transition-colors duration-500"
                aria-hidden="true"
              />

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-slate-800 dark:text-zinc-200 text-sm font-semibold mb-2"
                  >
                    Your Name <span className="text-emerald-600 dark:text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    aria-required="true"
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/15 rounded-xl px-5 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all backdrop-blur-sm min-h-[44px]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-slate-800 dark:text-zinc-200 text-sm font-semibold mb-2"
                    >
                      Email Address <span className="text-emerald-600 dark:text-emerald-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      aria-required="true"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/15 rounded-xl px-5 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all backdrop-blur-sm min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-slate-800 dark:text-zinc-200 text-sm font-semibold mb-2"
                    >
                      Phone Number <span className="text-slate-500 dark:text-zinc-400 text-xs ml-1 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (234) 567-890"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/15 rounded-xl px-5 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all backdrop-blur-sm min-h-[44px]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-slate-800 dark:text-zinc-200 text-sm font-semibold mb-2"
                  >
                    Your Message <span className="text-emerald-600 dark:text-emerald-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    required
                    aria-required="true"
                    rows={5}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/15 rounded-xl px-5 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none backdrop-blur-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  aria-label="Send message to Prakash Singh"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-400 dark:hover:bg-emerald-300 text-white dark:text-[#0b0416] font-bold rounded-xl px-8 py-4 shadow-md hover:shadow-lg transition-all mt-4 flex justify-center items-center gap-2 cursor-pointer min-h-[48px]"
                >
                  Send Message
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div data-aos="fade-left" data-aos-delay="400" className="flex flex-col gap-10 md:pt-4">
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-400/10 rounded-2xl flex items-center justify-center border border-emerald-200 dark:border-emerald-400/20 shrink-0">
                  <span className="text-emerald-600 dark:text-emerald-400 text-2xl" aria-hidden="true">📍</span>
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-1.5">Location</h3>
                  <p className="text-slate-700 dark:text-zinc-300 leading-relaxed text-lg">
                    Varanasi, Uttar Pradesh, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-400/10 rounded-2xl flex items-center justify-center border border-emerald-200 dark:border-emerald-400/20 shrink-0">
                  <span className="text-emerald-600 dark:text-emerald-400 text-2xl" aria-hidden="true">✉️</span>
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-1.5">Email</h3>
                  <a
                    href="mailto:contact@prakashsingh.dev"
                    aria-label="Send email to contact@prakashsingh.dev"
                    className="text-slate-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-lg font-medium inline-block min-h-[44px]"
                  >
                    contact@prakashsingh.dev
                  </a>
                  <p className="text-slate-600 dark:text-zinc-400 text-sm mt-1">
                    I typically reply within 24 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-400/10 rounded-2xl flex items-center justify-center border border-emerald-200 dark:border-emerald-400/20 shrink-0">
                  <span className="text-emerald-600 dark:text-emerald-400 text-2xl" aria-hidden="true">📱</span>
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-1.5">Phone</h3>
                  <a
                    href="tel:+919876543210"
                    aria-label="Call phone number +91 9876543210"
                    className="text-slate-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-lg font-medium inline-block min-h-[44px]"
                  >
                    +91 9876543210
                  </a>
                  <p className="text-slate-600 dark:text-zinc-400 text-sm mt-1">
                    Mon-Fri from 9am to 6pm IST
                  </p>
                </div>
              </div>

              {/* Social Connect Card */}
              <div className="mt-6 p-8 bg-gradient-to-br from-emerald-100/50 dark:from-emerald-400/10 to-transparent rounded-3xl border border-emerald-200/50 dark:border-emerald-400/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 dark:bg-emerald-400/10 rounded-full blur-2xl -z-10" aria-hidden="true" />
                <h4 className="text-emerald-700 dark:text-emerald-400 font-semibold mb-4 text-lg">Social Connect</h4>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/PrakashSingh65"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile of Prakash Singh (opens in new tab)"
                    className="w-12 h-12 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 dark:hover:bg-emerald-400 text-slate-700 dark:text-zinc-300 hover:text-white dark:hover:text-[#0b0416] transition-all duration-300 hover:scale-110 shadow-md min-w-[44px] min-h-[44px]"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/prakash-singh-rajput-a89a15243/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile of Prakash Singh (opens in new tab)"
                    className="w-12 h-12 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 dark:hover:bg-emerald-400 text-slate-700 dark:text-zinc-300 hover:text-white dark:hover:text-[#0b0416] transition-all duration-300 hover:scale-110 shadow-md min-w-[44px] min-h-[44px]"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/Prakash89795230"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter) profile of Prakash Singh (opens in new tab)"
                    className="w-12 h-12 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 dark:hover:bg-emerald-400 text-slate-700 dark:text-zinc-300 hover:text-white dark:hover:text-[#0b0416] transition-all duration-300 hover:scale-110 shadow-md min-w-[44px] min-h-[44px]"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.735-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
