export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-white/5 mt-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center gap-6">
        <div className="flex gap-6">
          <a href="#" className="text-white/40 hover:text-emerald-400 transition-colors font-medium">LinkedIn</a>
          <a href="#" className="text-white/40 hover:text-emerald-400 transition-colors font-medium">GitHub</a>
          <a href="#" className="text-white/40 hover:text-emerald-400 transition-colors font-medium">Twitter</a>
        </div>
        <p className="text-white/40 text-sm">
          © {new Date().getFullYear()} John Doe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}