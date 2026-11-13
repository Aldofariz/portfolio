import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import {
  User,
  Briefcase,
  FolderGit2,
  Tags,
  Image as ImageIcon,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch counts in parallel
  const [
    { count: experiencesCount },
    { count: projectsCount },
    { count: tagsCount },
    { count: mediaCount },
  ] = await Promise.all([
    supabase.from("experiences").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("tags").select("*", { count: "exact", head: true }),
    supabase.from("media").select("*", { count: "exact", head: true }),
  ]);

  const cards = [
    {
      label: "About Profile",
      desc: "Manage personal bio and profile image",
      count: "Active",
      href: "/admin/about",
      icon: User,
    },
    {
      label: "Career Experiences",
      desc: "Chronological employment history",
      count: experiencesCount ?? 0,
      href: "/admin/experiences",
      icon: Briefcase,
    },
    {
      label: "Portfolio Projects",
      desc: "Exhibits, descriptions, tags, and screenshots",
      count: projectsCount ?? 0,
      href: "/admin/projects",
      icon: FolderGit2,
    },
    {
      label: "Technology Tags",
      desc: "Reusable tags linked across projects",
      count: tagsCount ?? 0,
      href: "/admin/tags",
      icon: Tags,
    },
    {
      label: "Media Library",
      desc: "Supabase Storage uploaded assets",
      count: mediaCount ?? 0,
      href: "/admin/media",
      icon: ImageIcon,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-editorial-border pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-editorial-accent">
            Control Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-editorial-fg mt-1">
            DASHBOARD OVERVIEW.
          </h1>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Allowlist Verified</span>
        </div>
      </div>

      {/* Immediate Publishing Notice banner */}
      <div className="p-4 bg-amber-50/70 border border-amber-200 flex items-start space-x-3 text-xs text-amber-900 font-mono">
        <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <strong className="font-bold">Immediate Publishing Active:</strong> Any update or deletion performed in this CMS is instantly live on the public portfolio. No draft stage or manual publish required.
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white border border-editorial-border p-6 flex flex-col justify-between space-y-6 hover:border-editorial-fg transition-colors group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-stone-100 text-editorial-fg group-hover:bg-editorial-fg group-hover:text-editorial-bg transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-lg font-bold text-editorial-fg">
                    {card.count}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-editorial-fg group-hover:text-editorial-accent transition-colors">
                    {card.label}
                  </h3>
                  <p className="text-xs text-editorial-muted mt-1 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>

              <div>
                <Link href={card.href} className="inline-block w-full">
                  <Button variant="outline" size="sm" className="w-full justify-between group-hover:border-editorial-fg">
                    <span>Manage</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
