import { ArrowUpRight, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function ContactSection() {
  const emailAddress = "aldofarizfadilla@gmail.com";
  const socialLinks = [
    { label: "GitHub", href: "https://github.com/aldofariz", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/aldofariz", external: true },
    { label: "Resume", href: "https://drive.google.com/file/d/1xxfF4rIKOOoW7EF1sQio924h28fHfWIr/view?usp=sharing", external: false },
  ];

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="space-y-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-editorial-muted">
            Index 03 // Dialogue
          </span>
          <h2 className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-editorial-fg mt-4 select-none">
            {SITE_CONFIG.contactHeadline}
            <span className="text-editorial-accent">.</span>
          </h2>
        </div>

        <p className="max-w-xl text-lg sm:text-xl text-editorial-muted leading-relaxed font-normal">
          Available for software engineering roles, technical architecture collaborations, and high-impact digital initiatives.
        </p>

        {/* Email interaction */}
        <div className="pt-6">
          <a
            href={`mailto:${emailAddress}`}
            className="group inline-flex items-center space-x-3 text-xl sm:text-3xl font-bold tracking-tight text-editorial-fg hover:text-editorial-accent transition-colors border-b-2 border-editorial-fg hover:border-editorial-accent pb-1"
          >
            <Mail className="w-6 h-6 sm:w-8 sm:h-8" />
            <span>{emailAddress}</span>
            <ArrowUpRight className="w-5 h-5 sm:w-7 sm:h-7 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Social media links */}
        <div className="pt-10 flex flex-wrap gap-8 items-center text-xs font-mono uppercase tracking-widest text-editorial-muted">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="hover:text-editorial-fg transition-colors inline-flex items-center space-x-1"
            >
              <span>{link.label}</span>
              {link.external && <ArrowUpRight className="w-3 h-3 text-editorial-muted" />}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
