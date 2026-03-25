export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full pt-32">
      <section id="contact" className="w-full py-24 px-6 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-emerald-400/10 rounded-full flex items-center justify-center mb-6 border border-emerald-400/20">
            <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's work together</h2>
          <p className="text-white/60 text-lg mb-10">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <a href="mailto:hello@example.com" className="px-8 py-4 bg-white text-[#0b0416] font-bold rounded-full hover:bg-emerald-400 transition-colors text-lg">
            Say Hello
          </a>
        </div>
      </section>
    </main>
  );
}
