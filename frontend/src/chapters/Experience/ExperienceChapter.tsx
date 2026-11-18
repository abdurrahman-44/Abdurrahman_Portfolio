import React, { useState } from 'react';
import { Briefcase, Calendar, CheckCircle2, Sparkles, Users } from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { ExperienceItem } from '@/types/portfolio';

export function renderExperienceSpread(): {
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
} {
  return ExperienceStateWrapper();
}

function ExperienceStateWrapper() {
  const { data } = usePortfolio();
  const expList = data.experience || [];
  const [selectedExpId, setSelectedExpId] = useState<string>(
    expList[0]?.id || ''
  );

  const selectedExp =
    expList.find((e) => e.id === selectedExpId) || expList[0];

  return {
    leftPage: (
      <ExperienceTimelineLeftPage
        items={expList}
        selectedId={selectedExp?.id || ''}
        onSelect={setSelectedExpId}
      />
    ),
    rightPage: <ExperienceDetailRightPage item={selectedExp} />,
  };
}

const ExperienceTimelineLeftPage: React.FC<{
  items: ExperienceItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}> = ({ items, selectedId, onSelect }) => {
  return (
    <div className="space-y-5">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          Chapter 05 • Professional Experience
        </span>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">
          Mentorship, Teaching & Technical Coordination
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
          Teaching Mathematics and Information Technology alongside leading university and diploma engineering projects.
        </p>
      </div>

      <div className="relative space-y-4 before:absolute before:bottom-4 before:left-4 before:top-4 before:w-0.5 before:bg-rule-strong">
        {items.map((exp) => {
          const isSelected = exp.id === selectedId;
          return (
            <div key={exp.id} className="relative pl-10">
              <div
                className={`absolute left-2 top-4 h-4 w-4 rounded-full border-2 transition ${
                  isSelected
                    ? 'border-accent bg-accent scale-110'
                    : 'border-rule-strong bg-page'
                }`}
              />
              <button
                type="button"
                onClick={() => onSelect(exp.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  isSelected
                    ? 'border-accent bg-page-alt shadow-card'
                    : 'border-rule bg-page-alt/50 hover:border-accent/50'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent">
                    <Calendar className="h-3.5 w-3.5" />
                    {exp.date_range}
                  </span>
                  <span className="rounded-full border border-rule bg-page px-2.5 py-0.5 font-mono text-[10px] text-ink-secondary">
                    {exp.category}
                  </span>
                </div>

                <h3 className="mt-1.5 font-serif text-xl font-bold text-ink">
                  {exp.position}
                </h3>
                <p className="text-xs font-medium text-ink-secondary">
                  {exp.organization} • {exp.employment_type}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-secondary line-clamp-2">
                  {exp.summary}
                </p>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ExperienceDetailRightPage: React.FC<{ item?: ExperienceItem }> = ({
  item,
}) => {
  if (!item) return null;

  return (
    <div className="flex h-full flex-col justify-between space-y-6">
      <div className="rounded-2xl border border-accent/40 bg-page-alt p-5 shadow-card">
        <div className="flex items-start justify-between gap-3 border-b border-rule pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              Role Dossier • {item.date_range}
            </span>
            <h3 className="mt-1 font-serif text-2xl font-bold text-ink">
              {item.position}
            </h3>
            <p className="text-xs font-medium text-ink-secondary">
              {item.organization} ({item.employment_type})
            </p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
            {item.category.includes('Leadership') ? (
              <Users className="h-5 w-5" />
            ) : (
              <Briefcase className="h-5 w-5" />
            )}
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
          {item.summary}
        </p>

        {/* Core Responsibilities */}
        <div className="mt-5">
          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Core Responsibilities
          </h4>
          <ul className="mt-2.5 space-y-2">
            {item.responsibilities.map((resp, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-secondary"
              >
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Verified Contributions */}
        <div className="mt-5">
          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Verified Impact & Contributions
          </h4>
          <ul className="mt-2.5 space-y-2">
            {item.measurable_contributions.map((contrib, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-secondary"
              >
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                <span>{contrib}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Focus Tags */}
        <div className="mt-5 flex flex-wrap gap-1.5 border-t border-rule pt-4">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-rule bg-page px-2.5 py-1 font-mono text-[11px] text-ink-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-rule bg-page-alt/60 p-4 text-xs text-ink-secondary">
        <strong className="font-serif text-sm text-ink">
          Why Teaching Strengthens My Engineering:
        </strong>{' '}
        Guiding O/L and A/L students through Mathematics and Information Technology since 2025 has shaped how I write code, document APIs, and structure AI explanations—always prioritizing clarity over unnecessary complexity.
      </div>
    </div>
  );
};
