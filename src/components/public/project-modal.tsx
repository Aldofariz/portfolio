"use client";

import * as React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMediaPublicUrl } from "@/lib/utils/media";
import type { Project } from "@/types/database";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.name}
      maxWidth="4xl"
    >
      <div className="space-y-8">
        {/* Tech stack tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag.id} variant="default">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Project Overview */}
        <div className="space-y-2">
          <h4 className="font-mono text-xs uppercase tracking-widest text-editorial-muted">
            Overview
          </h4>
          <p className="text-base sm:text-lg text-editorial-fg leading-relaxed">
            {project.overview}
          </p>
        </div>

        {/* Live Website Link */}
        {project.live_url && (
          <div>
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="primary" size="md" className="group space-x-2">
                <span>Visit Live Project</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </a>
          </div>
        )}

        {/* Media / Screenshots Gallery */}
        {project.media && project.media.length > 0 ? (
          <div className="space-y-4 pt-6 border-t border-editorial-border">
            <h4 className="font-mono text-xs uppercase tracking-widest text-editorial-muted">
              Visual Documentation
            </h4>
            <div className="space-y-6">
              {project.media.map((m, index) => {
                const url = getMediaPublicUrl(m.storage_path);
                if (!url) return null;
                return (
                  <div
                    key={m.id || index}
                    className="relative w-full aspect-[16/10] bg-stone-100 border border-editorial-border overflow-hidden"
                  >
                    <Image
                      src={url}
                      alt={m.alt_text || `${project.name} screenshot ${index + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 800px"
                      className="object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 border border-stone-200">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-editorial-fg">
                        {m.is_cover ? "Cover Preview" : `Plate 0${index + 1}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="pt-4 border-t border-editorial-border text-xs font-mono text-editorial-muted">
            [No preview images uploaded]
          </div>
        )}
      </div>
    </Modal>
  );
}
