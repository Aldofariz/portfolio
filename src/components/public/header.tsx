import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export function Header() {
  return (
    <header className="w-full pt-8 pb-6 border-b border-editorial-border flex flex-col sm:flex-row items-baseline justify-between gap-4">
      <div className="flex items-baseline space-x-3">
        <span className="font-mono text-xs uppercase tracking-widest text-editorial-fg font-semibold">
          {SITE_CONFIG.role}
        </span>
        <span className="text-editorial-muted text-xs font-mono">
          / 2026
        </span>
      </div>

      <nav className="flex items-center space-x-8 text-xs font-mono uppercase tracking-wider text-editorial-muted">
        {SITE_CONFIG.navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="hover:text-editorial-fg transition-colors duration-200"
          >
            {item.label}
          </a>
        ))}
        <Link
          href="/admin/login"
          className="text-stone-400 hover:text-editorial-accent transition-colors"
          title="Admin CMS"
        >
          [Admin]
        </Link>
      </nav>
    </header>
  );
}
