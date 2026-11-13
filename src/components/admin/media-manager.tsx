"use client";

import * as React from "react";
import Image from "next/image";
import { uploadMediaAction, deleteMediaAction } from "@/actions/media";
import { getMediaPublicUrl } from "@/lib/utils/media";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Trash2, Check, Copy, AlertCircle } from "lucide-react";
import type { Media } from "@/types/database";

interface MediaManagerProps {
  initialMedia: Media[];
  onSelectMedia?: (media: Media) => void;
  selectionMode?: boolean;
}

export function MediaManager({
  initialMedia,
  onSelectMedia,
  selectionMode = false,
}: MediaManagerProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [actionMessage, setActionMessage] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadError(null);
    setActionMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await uploadMediaAction(formData);

    setIsUploading(false);

    if (!result.success) {
      setUploadError(result.error);
    } else {
      setActionMessage("Image uploaded successfully.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      if (selectionMode && onSelectMedia && result.data) {
        onSelectMedia(result.data);
      }
    }
  };

  const handleDelete = async (id: string, filename: string) => {
    if (!confirm(`Are you sure you want to delete "${filename}"?`)) {
      return;
    }
    setUploadError(null);
    setActionMessage(null);

    const result = await deleteMediaAction(id);
    if (!result.success) {
      setUploadError(result.error);
    } else {
      setActionMessage("Media deleted successfully.");
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Upload Box */}
      <div className="bg-white border border-editorial-border p-6 space-y-4">
        <div className="flex items-center space-x-2 text-editorial-fg">
          <Upload className="w-4 h-4" />
          <h2 className="text-sm font-bold uppercase tracking-wider font-mono">
            Upload Image Asset
          </h2>
        </div>

        {uploadError && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-700 font-mono flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{uploadError}</span>
          </div>
        )}

        {actionMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-mono">
            {actionMessage}
          </div>
        )}

        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-6">
            <label className="block text-xs font-mono uppercase tracking-wider text-editorial-muted mb-1.5">
              Select Image (JPEG, PNG, WebP, GIF &le; 5MB)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              name="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              required
              className="block w-full text-xs font-mono text-editorial-fg file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-mono file:bg-editorial-fg file:text-editorial-bg hover:file:bg-neutral-800 cursor-pointer"
            />
          </div>

          <div className="md:col-span-4">
            <Input
              id="alt_text"
              name="alt_text"
              label="Alt Text (Accessibility)"
              placeholder="Descriptive image label"
            />
          </div>

          <div className="md:col-span-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isUploading}
              className="w-full"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>
      </div>

      {/* Gallery Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-editorial-border">
          <span className="text-xs font-mono uppercase tracking-wider text-editorial-muted">
            Uploaded Assets ({initialMedia.length})
          </span>
        </div>

        {initialMedia.length === 0 ? (
          <div className="p-12 bg-white border border-editorial-border text-center text-xs font-mono text-editorial-muted">
            [No media assets uploaded yet]
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {initialMedia.map((m) => {
              const url = getMediaPublicUrl(m.storage_path);
              return (
                <div
                  key={m.id}
                  className="bg-white border border-editorial-border overflow-hidden group flex flex-col justify-between"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-square bg-stone-100 overflow-hidden">
                    {url ? (
                      <Image
                        src={url}
                        alt={m.alt_text || m.original_filename}
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-editorial-muted text-xs font-mono">
                        No URL
                      </div>
                    )}
                  </div>

                  {/* Info & Actions */}
                  <div className="p-2.5 space-y-2 text-xs font-mono">
                    <p className="truncate text-editorial-fg font-medium" title={m.original_filename}>
                      {m.original_filename}
                    </p>
                    <p className="text-[10px] text-editorial-muted">
                      {(m.file_size / 1024).toFixed(1)} KB
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-editorial-border">
                      {selectionMode ? (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => onSelectMedia && onSelectMedia(m)}
                          className="w-full text-[10px] h-7"
                        >
                          Select
                        </Button>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(m.id, m.id)}
                            className="p-1 text-editorial-muted hover:text-editorial-fg transition-colors"
                            title="Copy Media ID"
                          >
                            {copiedId === m.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(m.id, m.original_filename)}
                            className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                            title="Delete Media"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
