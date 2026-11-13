import type { Experience } from "@/types/database";

interface ExperienceListProps {
  experiences: Experience[];
}

function formatPeriod(exp: Experience): string {
  const getYear = (dateStr: string) => {
    try {
      return new Date(dateStr).getFullYear();
    } catch {
      return dateStr;
    }
  };

  const startYear = getYear(exp.start_date);
  if (exp.is_current || !exp.end_date) {
    return `${startYear} — PRESENT`;
  }

  const endYear = getYear(exp.end_date);
  return `${startYear} — ${endYear}`;
}

export function ExperienceList({ experiences }: ExperienceListProps) {
  if (experiences.length === 0) {
    return (
      <div className="py-8 text-sm text-editorial-muted font-mono">
        [No experience records available]
      </div>
    );
  }

  return (
    <div className="divide-y divide-editorial-border border-y border-editorial-border">
      {experiences.map((exp) => (
        <div
          key={exp.id}
          className="py-5 sm:py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline group hover:bg-stone-50/50 transition-colors"
        >
          {/* Period */}
          <div className="sm:col-span-4">
            <span className="font-mono text-xs uppercase tracking-wider text-editorial-muted font-normal">
              {formatPeriod(exp)}
            </span>
          </div>

          {/* Position */}
          <div className="sm:col-span-5">
            <h4 className="text-base sm:text-lg font-semibold tracking-tight text-editorial-fg">
              {exp.position}
            </h4>
          </div>

          {/* Company */}
          <div className="sm:col-span-3 text-left sm:text-right">
            <span className="text-sm font-medium text-editorial-muted">
              {exp.company}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
