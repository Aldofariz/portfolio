"use client";

import * as React from "react";
import { useActionState } from "react";
import { createTagAction, deleteTagAction } from "@/actions/tags";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Tag as TagIcon } from "lucide-react";
import type { Tag } from "@/types/database";

interface TagsManagerProps {
  initialTags: (Tag & { projectCount: number })[];
}

export function TagsManager({ initialTags }: TagsManagerProps) {
  const [state, formAction, isPending] = useActionState(createTagAction, null);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the tag "${name}"?`)) {
      return;
    }
    setDeletingId(id);
    await deleteTagAction(id);
    setDeletingId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Create Tag Form */}
      <div className="lg:col-span-5 bg-white border border-editorial-border p-6 space-y-6">
        <div className="flex items-center space-x-2 text-editorial-fg">
          <Plus className="w-4 h-4" />
          <h2 className="text-sm font-bold uppercase tracking-wider font-mono">
            New Tag
          </h2>
        </div>

        {state && !state.success && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-700 font-mono">
            {state.error}
          </div>
        )}

        {state && state.success && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-mono">
            Tag added successfully.
          </div>
        )}

        <form ref={formRef} action={formAction} className="space-y-4">
          <Input
            id="name"
            name="name"
            label="Tag Name"
            placeholder="e.g. TypeScript, Next.js, Go"
            required
            error={state && !state.success ? state.fieldErrors?.name?.[0] : undefined}
          />

          <p className="text-[11px] font-mono text-editorial-muted">
            Tag names are automatically normalized (lowercase, hyphens for spaces) to prevent duplicate entries.
          </p>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isPending}
            className="w-full"
          >
            {isPending ? "Creating..." : "Add Tag"}
          </Button>
        </form>
      </div>

      {/* Tags List */}
      <div className="lg:col-span-7 bg-white border border-editorial-border p-6 space-y-6">
        <div className="flex justify-between items-center pb-3 border-b border-editorial-border">
          <div className="flex items-center space-x-2 text-editorial-fg">
            <TagIcon className="w-4 h-4 text-editorial-muted" />
            <h2 className="text-sm font-bold uppercase tracking-wider font-mono">
              Existing Tags ({initialTags.length})
            </h2>
          </div>
        </div>

        {initialTags.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-editorial-muted">
            [No tags found. Create your first tag on the left.]
          </div>
        ) : (
          <div className="divide-y divide-editorial-border">
            {initialTags.map((tag) => (
              <div
                key={tag.id}
                className="py-3 flex items-center justify-between group hover:bg-stone-50/50 px-2 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">{tag.name}</Badge>
                    <span className="text-[11px] font-mono text-editorial-muted">
                      normalized: {tag.normalized_name}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-stone-400">
                    Linked to {tag.projectCount} {tag.projectCount === 1 ? "project" : "projects"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(tag.id, tag.name)}
                  disabled={deletingId === tag.id}
                  className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Delete tag"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
