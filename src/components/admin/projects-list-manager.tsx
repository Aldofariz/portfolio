"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteProjectAction } from "@/actions/projects";
import { getMediaPublicUrl } from "@/lib/utils/media";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit3, Trash2, ExternalLink, FolderGit2 } from "lucide-react";
import type { Project } from "@/types/database";

interface ProjectsListManagerProps {
  initialProjects: Project[];
}

export function ProjectsListManager({ initialProjects }: ProjectsListManagerProps) {
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the project "${name}"? This action cannot be undone.`)) {
      return;
    }
    setDeletingId(id);
    await deleteProjectAction(id);
    setDeletingId(null);
  };

  if (initialProjects.length === 0) {
    return (
      <div className="bg-white border border-editorial-border p-12 text-center space-y-4">
        <FolderGit2 className="w-12 h-12 text-stone-300 mx-auto stroke-1" />
        <p className="font-mono text-xs text-editorial-muted">
          [No projects found in the database. Create your first exhibit above.]
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-editorial-border divide-y divide-editorial-border">
      {initialProjects.map((project) => {
        const coverMedia =
          project.media?.find((m) => m.is_cover) || project.media?.[0];
        const coverUrl = getMediaPublicUrl(coverMedia?.storage_path);

        return (
          <div
            key={project.id}
            className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-stone-50/50 transition-colors"
          >
            {/* Left: Thumbnail & Info */}
            <div className="flex items-start space-x-4">
              <div className="relative w-20 h-14 bg-stone-100 border border-editorial-border overflow-hidden shrink-0">
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={project.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-300">
                    <FolderGit2 className="w-6 h-6 stroke-1" />
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center space-x-3">
                  <h3 className="font-bold text-base text-editorial-fg">
                    {project.name}
                  </h3>
                  <span className="font-mono text-xs text-editorial-muted">
                    /{project.slug}
                  </span>
                </div>

                <p className="text-xs text-editorial-muted line-clamp-1 max-w-xl">
                  {project.overview}
                </p>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag.id} variant="outline" className="text-[10px] py-0">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Meta & Actions */}
            <div className="flex items-center space-x-6 self-end md:self-center shrink-0">
              <div className="text-right text-xs font-mono text-editorial-muted hidden sm:block">
                <p>Order: {project.display_order}</p>
                <p>{project.media?.length || 0} screenshots</p>
              </div>

              <div className="flex items-center space-x-2">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-editorial-border text-editorial-muted hover:text-editorial-fg hover:border-editorial-fg transition-colors"
                    title="Visit Live URL"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <Link href={`/admin/projects/${project.id}`}>
                  <Button variant="outline" size="sm" className="p-2 h-8" title="Edit Project">
                    <Edit3 className="w-3.5 h-3.5" />
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(project.id, project.name)}
                  disabled={deletingId === project.id}
                  className="p-2 h-8 text-rose-600 hover:text-rose-700"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
