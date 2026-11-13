"use client";

import * as React from "react";
import {
  createExperienceAction,
  updateExperienceAction,
  deleteExperienceAction,
} from "@/actions/experiences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Plus, Edit3, Trash2, Calendar } from "lucide-react";
import type { Experience } from "@/types/database";

interface ExperiencesManagerProps {
  initialExperiences: Experience[];
}

export function ExperiencesManager({ initialExperiences }: ExperiencesManagerProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingExp, setEditingExp] = React.useState<Experience | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [isCurrent, setIsCurrent] = React.useState(false);

  const openCreateModal = () => {
    setEditingExp(null);
    setIsCurrent(false);
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (exp: Experience) => {
    setEditingExp(exp);
    setIsCurrent(exp.is_current);
    setFormError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("is_current", isCurrent ? "true" : "false");

    let result;
    if (editingExp) {
      result = await updateExperienceAction(editingExp.id, null, formData);
    } else {
      result = await createExperienceAction(null, formData);
    }

    setIsSubmitting(false);

    if (!result.success) {
      setFormError(result.error);
    } else {
      setModalOpen(false);
    }
  };

  const handleDelete = async (id: string, position: string) => {
    if (!confirm(`Are you sure you want to delete experience "${position}"?`)) {
      return;
    }
    await deleteExperienceAction(id);
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <p className="text-xs font-mono text-editorial-muted">
          Total Records: [{initialExperiences.length}]
        </p>
        <Button variant="primary" size="sm" onClick={openCreateModal} className="space-x-1.5">
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </Button>
      </div>

      {/* Experience List Table */}
      <div className="bg-white border border-editorial-border overflow-hidden">
        {initialExperiences.length === 0 ? (
          <div className="p-10 text-center text-xs font-mono text-editorial-muted">
            [No experience entries recorded yet]
          </div>
        ) : (
          <div className="divide-y divide-editorial-border">
            {initialExperiences.map((exp) => (
              <div
                key={exp.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-bold text-base text-editorial-fg">
                      {exp.position}
                    </h3>
                    <span className="text-xs font-mono text-editorial-muted">
                      at <strong className="text-editorial-fg">{exp.company}</strong>
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-xs font-mono text-editorial-muted">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {exp.start_date} — {exp.is_current ? "PRESENT" : exp.end_date || ""}
                      </span>
                    </span>
                    <span>Order: {exp.display_order}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(exp)}
                    className="p-2 h-8"
                    title="Edit"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(exp.id, exp.position)}
                    className="p-2 h-8 text-rose-600 hover:text-rose-700"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingExp ? "Edit Experience" : "New Career Experience"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-700 font-mono">
              {formError}
            </div>
          )}

          <Input
            id="position"
            name="position"
            label="Position / Role"
            placeholder="e.g. Senior Frontend Engineer"
            defaultValue={editingExp?.position || ""}
            required
          />

          <Input
            id="company"
            name="company"
            label="Company / Organization"
            placeholder="e.g. Studio Minimal"
            defaultValue={editingExp?.company || ""}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="start_date"
              name="start_date"
              type="date"
              label="Start Date"
              defaultValue={editingExp?.start_date || ""}
              required
            />

            <div>
              <Input
                id="end_date"
                name="end_date"
                type="date"
                label="End Date"
                defaultValue={editingExp?.end_date || ""}
                disabled={isCurrent}
              />
            </div>
          </div>

          {/* Current Position Checkbox */}
          <div className="flex items-center space-x-2 pt-1">
            <input
              id="is_current_checkbox"
              type="checkbox"
              checked={isCurrent}
              onChange={(e) => setIsCurrent(e.target.checked)}
              className="rounded-none border-editorial-border text-editorial-fg focus:ring-editorial-accent"
            />
            <label
              htmlFor="is_current_checkbox"
              className="text-xs font-mono text-editorial-fg select-none cursor-pointer"
            >
              I currently work in this position
            </label>
          </div>

          <Input
            id="display_order"
            name="display_order"
            type="number"
            label="Display Order (Lower numbers appear first)"
            defaultValue={editingExp?.display_order ?? 0}
            min={0}
          />

          <div className="pt-4 flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : editingExp ? "Update Record" : "Save Record"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
