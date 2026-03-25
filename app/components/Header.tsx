import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#0b0416]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          PORT<span className="text-emerald-400">FOLIO</span>
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-white/70">
          <Link href="/about" className="hover:text-emerald-400 transition-colors">About</Link>
          <Link href="/services" className="hover:text-emerald-400 transition-colors">Services</Link>
          <Link href="/projects" className="hover:text-emerald-400 transition-colors">Projects</Link>
          <Link href="/resume" className="hover:text-emerald-400 transition-colors">Resume</Link>
          <Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link>
        </nav>
        <Link href="/contact" className="hidden md:inline-flex bg-emerald-400/10 text-emerald-400 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald-400/20 transition-all border border-emerald-400/20">
          Reach Out
        </Link>
      </div>
    </header>
  );
}