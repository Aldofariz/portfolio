import { ArrowDownRight } from "lucide-react";

export function Hero() {
  return (
    <section className="py-20 md:py-32 border-b border-editorial-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-block">
            <span className="font-mono text-xs uppercase tracking-widest text-editorial-accent">
              Informatics Engineering Graduate
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-7xl lg:text-9xl font-extrabold tracking-tighter text-editorial-fg leading-[0.9] select-none">
            SOFTWARE<br />
            ENGINEER<span className="text-editorial-accent">.</span>
          </h1>
        </div>

        <div className="lg:col-span-4 space-y-6 lg:pt-6">
          <p className="text-base sm:text-lg text-editorial-muted leading-relaxed font-normal">
            Bridging resilient distributed systems, modern frontend architecture, and design awareness. Focused on crafting disciplined, high-impact digital experiences.
          </p>

          <div className="pt-4 flex items-center space-x-6 text-xs font-mono uppercase tracking-wider text-editorial-fg">
            <a
              href="#work"
              className="group inline-flex items-center space-x-1 hover:text-editorial-accent transition-colors"
            >
              <span>Selected Works</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <span className="text-editorial-border">|</span>
            <a
              href="#about"
              className="hover:text-editorial-accent transition-colors"
            >
              Profile & Experience
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
