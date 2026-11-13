export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-between p-8 md:p-16 max-w-6xl mx-auto">
      <header className="flex justify-between items-center py-4 border-b border-editorial-border">
        <span className="font-mono text-xs uppercase tracking-widest text-editorial-muted">
          Portfolio // 2026
        </span>
        <nav className="flex space-x-6 text-sm">
          <a href="#work" className="hover:text-editorial-accent transition-colors">
            Work
          </a>
          <a href="#about" className="hover:text-editorial-accent transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-editorial-accent transition-colors">
            Contact
          </a>
        </nav>
      </header>

      <section className="my-24 space-y-6">
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-editorial-fg">
          SOFTWARE ENGINEER
        </h1>
        <p className="max-w-xl text-lg text-editorial-muted leading-relaxed">
          Crafting thoughtful digital systems, scalable architecture, and nuanced interactive experiences.
        </p>
      </section>

      <footer className="pt-8 border-t border-editorial-border flex justify-between items-center text-xs text-editorial-muted">
        <span>© 2026 Software Engineer.</span>
        <span>Editorial Direction</span>
      </footer>
    </main>
  );
}
