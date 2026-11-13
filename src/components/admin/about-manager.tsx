"use client";

import * as React from "react";
import Image from "next/image";
import { useActionState } from "react";
import { updateAboutAction } from "@/actions/about";
import { getMediaPublicUrl } from "@/lib/utils/media";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { MediaManager } from "./media-manager";
import { Image as ImageIcon, CheckCircle, User } from "lucide-react";
import type { About, Media } from "@/types/database";

interface AboutManagerProps {
  initialAbout: About | null;
  availableMedia: Media[];
}

export function AboutManager({ initialAbout, availableMedia }: AboutManagerProps) {
  const [state, formAction, isPending] = useActionState(updateAboutAction, null);
  const [selectedMediaId, setSelectedMediaId] = React.useState<string | null>(
    initialAbout?.profile_media_id || null
  );
  const [mediaModalOpen, setMediaModalOpen] = React.useState(false);

  // Find currently selected media object
  const currentMedia =
    availableMedia.find((m) => m.id === selectedMediaId) ||
    initialAbout?.profile_media ||
    null;

  const currentMediaUrl = getMediaPublicUrl(currentMedia?.storage_path);

  return (
    <div className="bg-white border border-editorial-border p-6 sm:p-8 space-y-8">
      {state && !state.success && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-700 font-mono">
          {state.error}
        </div>
      )}

      {state && state.success && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-mono flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{state.message || "About section saved successfully."}</span>
        </div>
      )}

      <form action={formAction} className="space-y-8">
        <input type="hidden" name="profile_media_id" value={selectedMediaId || ""} />

        {/* Profile Image Subsection */}
        <div className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-editorial-muted">
            01 // Profile Photograph
          </h2>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative w-36 h-48 bg-stone-100 border border-editorial-border overflow-hidden shrink-0">
              {currentMediaUrl ? (
                <Image
                  src={currentMediaUrl}
                  alt={currentMedia?.alt_text || "Profile preview"}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-editorial-muted p-4 text-center">
                  <User className="w-8 h-8 text-stone-300 mb-2" />
                  <span className="text-[10px] font-mono">[No photo]</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-xs text-editorial-muted font-mono leading-relaxed max-w-md">
                This image will appear on the public About section with a subtle magnetic cursor hover effect. Only 1 photo is active.
              </p>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setMediaModalOpen(true)}
                  className="space-x-1.5"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Choose from Media Library</span>
                </Button>

                {selectedMediaId && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedMediaId(null)}
                    className="text-stone-500 hover:text-rose-600"
                  >
                    Remove Photo
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Introduction Text Subsection */}
        <div className="space-y-4 pt-6 border-t border-editorial-border">
          <h2 className="text-xs font-mono uppercase tracking-widest text-editorial-muted">
            02 // Personal Introduction
          </h2>

          <Textarea
            id="introduction"
            name="introduction"
            label="Biography Statement"
            rows={8}
            defaultValue={
              initialAbout?.introduction ||
              "Software Engineer with a focus on modern web architectures, performant systems, and refined user interfaces. Graduated in Informatics Engineering, combining fullstack engineering with strong design sensibility."
            }
            placeholder="Write your professional introduction here..."
            required
            error={state && !state.success ? state.fieldErrors?.introduction?.[0] : undefined}
          />
        </div>

        <div className="pt-4 border-t border-editorial-border flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isPending}
            className="w-full sm:w-auto min-w-[160px]"
          >
            {isPending ? "Saving..." : "Save & Publish"}
          </Button>
        </div>
      </form>

      {/* Media Selection Modal */}
      <Modal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        title="Select Profile Photograph"
        maxWidth="4xl"
      >
        <div className="space-y-6">
          <MediaManager
            initialMedia={availableMedia}
            selectionMode={true}
            onSelectMedia={(media) => {
              setSelectedMediaId(media.id);
              setMediaModalOpen(false);
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
