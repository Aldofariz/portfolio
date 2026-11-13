"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/actions/auth";
import { cn } from "@/lib/utils/cn";
import {
  LayoutDashboard,
  User,
  Briefcase,
  FolderGit2,
  Tags,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "About", href: "/admin/about", icon: User },
  { label: "Experiences", href: "/admin/experiences", icon: Briefcase },
  { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { label: "Tech Tags", href: "/admin/tags", icon: Tags },
  { label: "Media Library", href: "/admin/media", icon: ImageIcon },
];

interface AdminNavProps {
  userEmail?: string;
}

export function AdminNav({ userEmail }: AdminNavProps) {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-editorial-border md:min-h-screen flex flex-col justify-between shrink-0">
      {/* Brand & Nav */}
      <div>
        {/* Top Header */}
        <div className="p-6 border-b border-editorial-border">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-editorial-fg font-bold">
              CMS // EDITORIAL
            </span>
            <span className="text-[10px] font-mono bg-editorial-accent/10 text-editorial-accent px-1.5 py-0.5">
              ADMIN
            </span>
          </div>
          {userEmail && (
            <p className="mt-2 text-xs font-mono text-editorial-muted truncate">
              {userEmail}
            </p>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors",
                  isActive
                    ? "bg-editorial-fg text-editorial-bg font-semibold"
                    : "text-editorial-muted hover:text-editorial-fg hover:bg-stone-50"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-editorial-border space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs font-mono text-editorial-muted hover:text-editorial-fg transition-colors"
        >
          <span className="flex items-center space-x-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </span>
          <span className="text-[10px] uppercase tracking-wider">↗</span>
        </Link>

        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-mono text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
