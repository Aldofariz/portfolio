"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectModal } from "./project-modal";
import { getMediaPublicUrl } from "@/lib/utils/media";
import type { Project } from "@/types/database";

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

  if (projects.length === 0) {
    return (
      <section id="work" className="py-20 md:py-32 border-b border-editorial-border">
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-editorial-muted">
            Index 02 // Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-editorial-fg mt-2">
            SELECTED WORKS.
          </h2>
        </div>
        <div className="p-12 border border-dashed border-editorial-border text-center font-mono text-xs text-editorial-muted">
          [No projects published yet]
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="py-20 md:py-32 border-b border-editorial-border">
      {/* Section Header */}
      <div className="mb-14 md:mb-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-editorial-muted">
            Index 02 // Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-editorial-fg mt-2">
            SELECTED WORKS.
          </h2>
        </div>
        <span className="font-mono text-xs text-editorial-muted uppercase tracking-wider">
          Total Exhibits: [0{projects.length}]
        </span>
      </div>

      {/* Asymmetric Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
        {projects.map((project, index) => {
          // Asymmetric layout rules:
          // index % 3 === 0: spans 7 columns (wide)
          // index % 3 === 1: spans 5 columns (narrow)
          // index % 3 === 2: spans 12 columns (full editorial spotlight)
          const spanClass =
            index % 3 === 0
              ? "md:col-span-7"
              : index % 3 === 1
              ? "md:col-span-5"
              : "md:col-span-12";

          const coverImage =
            project.media?.find((m) => m.is_cover) || project.media?.[0];
          const coverUrl = getMediaPublicUrl(coverImage?.storage_path);

          return (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`${spanClass} group cursor-pointer space-y-4`}
            >
              {/* Image Preview Box */}
              <div className="relative w-full aspect-[16/10] bg-stone-100 border border-editorial-border overflow-hidden transition-all duration-300 group-hover:border-editorial-fg">
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={coverImage?.alt_text || project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-editorial-muted space-y-2">
                    <FolderGit2 className="w-10 h-10 text-stone-300 stroke-1" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-stone-400">
                      [Interactive Preview]
                    </span>
                  </div>
                )}

                {/* Corner Indicator */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-none bg-editorial-surface/90 backdrop-blur-xs border border-editorial-border flex items-center justify-center text-editorial-fg transition-all group-hover:bg-editorial-fg group-hover:text-editorial-bg">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 border border-stone-200">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-editorial-fg">
                    Exhibit 0{index + 1}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-editorial-fg group-hover:text-editorial-accent transition-colors">
                    {project.name}
                  </h3>
                </div>

                <p className="text-sm text-editorial-muted line-clamp-2 leading-relaxed">
                  {project.overview}
                </p>

                {/* Tech tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <Badge key={tag.id} variant="outline">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
