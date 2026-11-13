"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createProjectAction, updateProjectAction } from "@/actions/projects";
import { getMediaPublicUrl } from "@/lib/utils/media";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { MediaManager } from "./media-manager";
import {
  Image as ImageIcon,
  Star,
  Trash2,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import type { Project, Tag, Media } from "@/types/database";

interface ProjectEditorProps {
  project?: Project | null;
  availableTags: Tag[];
  availableMedia: Media[];
}

export function ProjectEditor({
  project,
  availableTags,
  availableMedia,
}: ProjectEditorProps) {
  const router = useRouter();
  const isEditing = !!project;

  const [name, setName] = React.useState(project?.name || "");
  const [slug, setSlug] = React.useState(project?.slug || "");
  const [overview, setOverview] = React.useState(project?.overview || "");
  const [liveUrl, setLiveUrl] = React.useState(project?.live_url || "");
  const [displayOrder, setDisplayOrder] = React.useState(project?.display_order || 0);

  // Selected tags (set of tag UUIDs)
  const [selectedTagIds, setSelectedTagIds] = React.useState<string[]>(
    project?.tags?.map((t) => t.id) || []
  );

  // Selected media items: { media_id, is_cover, display_order }
  const [selectedMediaItems, setSelectedMediaItems] = React.useState<
    { media_id: string; is_cover: boolean; display_order: number }[]
  >(
    project?.media?.map((m) => ({
      media_id: m.id,
      is_cover: m.is_cover,
      display_order: m.display_order,
    })) || []
  );

  const [mediaModalOpen, setMediaModalOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Auto-slug generator on name change if new
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!isEditing) {
      setSlug(
        val
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  const addMediaItem = (media: Media) => {
    if (selectedMediaItems.some((item) => item.media_id === media.id)) {
      return; // Already added
    }
    const isFirst = selectedMediaItems.length === 0;
    setSelectedMediaItems((prev) => [
      ...prev,
      {
        media_id: media.id,
        is_cover: isFirst, // First item defaults to cover
        display_order: prev.length,
      },
    ]);
  };

  const setCoverImage = (mediaId: string) => {
    setSelectedMediaItems((prev) =>
      prev.map((item) => ({
        ...item,
        is_cover: item.media_id === mediaId,
      }))
    );
  };

  const removeMediaItem = (mediaId: string) => {
    setSelectedMediaItems((prev) => {
      const filtered = prev.filter((item) => item.media_id !== mediaId);
      // If we removed the cover, set the first remaining item as cover
      if (filtered.length > 0 && !filtered.some((item) => item.is_cover)) {
        filtered[0].is_cover = true;
      }
      return filtered;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      name,
      slug,
      overview,
      live_url: liveUrl.trim() ? liveUrl.trim() : null,
      display_order: Number(displayOrder),
      tag_ids: selectedTagIds,
      media_items: selectedMediaItems,
    };

    let result;
    if (isEditing && project) {
      result = await updateProjectAction(project.id, payload);
    } else {
      result = await createProjectAction(payload);
    }

    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error);
    } else {
      router.push("/admin/projects");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-editorial-border pb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center space-x-2 text-xs font-mono text-editorial-muted hover:text-editorial-fg cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects</span>
        </button>

        <div className="flex items-center space-x-3">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => router.push("/admin/projects")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : isEditing ? "Update & Publish" : "Create & Publish"}
          </Button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-xs text-rose-700 font-mono flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Details */}
        <div className="lg:col-span-8 bg-white border border-editorial-border p-6 sm:p-8 space-y-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-editorial-muted">
            01 // Project Details
          </h2>

          <Input
            id="name"
            label="Project Name"
            value={name}
            onChange={handleNameChange}
            placeholder="e.g. Distributed Analytics Engine"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="slug"
              label="URL Slug (Alphanumeric and hyphens only)"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().trim())}
              placeholder="distributed-analytics-engine"
              required
            />

            <Input
              id="live_url"
              label="Live Project URL (Optional)"
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <Textarea
            id="overview"
            label="Project Overview & Narrative"
            rows={8}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            placeholder="Provide architectural background, problem statement, and key outcomes..."
            required
          />

          <Input
            id="display_order"
            type="number"
            label="Display Order (Lower numbers appear earlier)"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(Number(e.target.value))}
            min={0}
          />
        </div>

        {/* Right Column: Taxonomy & Media */}
        <div className="lg:col-span-4 space-y-8">
          {/* Tag Selection Box */}
          <div className="bg-white border border-editorial-border p-6 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-editorial-muted">
              02 // Tech Stack Tags
            </h2>

            {availableTags.length === 0 ? (
              <p className="text-xs font-mono text-editorial-muted">
                No tags created yet. Visit Tags section to create them.
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {availableTags.map((tag) => {
                  const isSelected = selectedTagIds.includes(tag.id);
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`cursor-pointer transition-all px-2.5 py-1 text-xs font-mono border ${
                        isSelected
                          ? "bg-editorial-fg text-editorial-bg border-editorial-fg font-semibold"
                          : "bg-stone-50 text-stone-600 border-editorial-border hover:border-editorial-fg"
                      }`}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Media & Screenshots Box */}
          <div className="bg-white border border-editorial-border p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xs font-mono uppercase tracking-widest text-editorial-muted">
                03 // Screenshots ({selectedMediaItems.length})
              </h2>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setMediaModalOpen(true)}
                className="text-[10px] h-7"
              >
                + Add Media
              </Button>
            </div>

            <p className="text-[11px] font-mono text-editorial-muted">
              Click the star icon to choose which image serves as the main cover exhibit.
            </p>

            {selectedMediaItems.length === 0 ? (
              <div className="p-6 border border-dashed border-editorial-border text-center text-xs font-mono text-editorial-muted">
                No screenshots attached yet.
              </div>
            ) : (
              <div className="space-y-3">
                {selectedMediaItems.map((item) => {
                  const mediaObj = availableMedia.find((m) => m.id === item.media_id);
                  const url = getMediaPublicUrl(mediaObj?.storage_path);

                  return (
                    <div
                      key={item.media_id}
                      className="flex items-center space-x-3 p-2 border border-editorial-border bg-stone-50/50"
                    >
                      <div className="relative w-14 h-10 bg-stone-200 overflow-hidden shrink-0">
                        {url ? (
                          <Image
                            src={url}
                            alt="preview"
                            fill
                            sizes="60px"
                            className="object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-stone-400 m-auto" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0 text-xs font-mono truncate">
                        <span className="truncate block font-medium">
                          {mediaObj?.original_filename || item.media_id}
                        </span>
                        {item.is_cover && (
                          <span className="text-[10px] text-amber-700 font-bold">
                            [Main Cover]
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => setCoverImage(item.media_id)}
                          className={`p-1.5 cursor-pointer ${
                            item.is_cover ? "text-amber-500" : "text-stone-300 hover:text-stone-600"
                          }`}
                          title={item.is_cover ? "Current cover" : "Make cover"}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>

                        <button
                          type="button"
                          onClick={() => removeMediaItem(item.media_id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 cursor-pointer"
                          title="Remove from project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Media Selection Modal */}
      <Modal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        title="Attach Screenshot to Project"
        maxWidth="4xl"
      >
        <div className="space-y-6">
          <MediaManager
            initialMedia={availableMedia}
            selectionMode={true}
            onSelectMedia={(media) => {
              addMediaItem(media);
              setMediaModalOpen(false);
            }}
          />
        </div>
      </Modal>
    </form>
  );
}
