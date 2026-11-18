import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { EducationMilestone } from '@/types/portfolio';

export function renderEducationSpread(): {
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
} {
  return EducationChapterStateWrapper();
}

function EducationChapterStateWrapper() {
  const { data } = usePortfolio();
  const sorted = [...(data.education || [])].sort((a, b) => a.display_order - b.display_order);
  const [selectedId, setSelectedId] = useState<string>(
    sorted[sorted.length - 1]?.id || sorted[0]?.id || ''
  );

  const selectedMilestone =
    sorted.find((m) => m.id === selectedId) || sorted[0];

  return {
    leftPage: (
      <EducationTreeLeftPage
        milestones={sorted}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    ),
    rightPage: (
      <EducationDetailRightPage
        milestone={selectedMilestone}
        allMilestones={sorted}
        onSelect={setSelectedId}
      />
    ),
  };
}

const EducationTreeLeftPage: React.FC<{
  milestones: EducationMilestone[];
  selectedId: string;
  onSelect: (id: string) => void;
}> = ({ milestones, selectedId, onSelect }) => {
  return (
    <div className="space-y-5">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          Chapter 03 • Education Journey
        </span>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">
          The Academic Growth Tree
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
          Select any branch node along the educational trunk (2021 → Present) to inspect verified qualifications, institutions, and academic milestones.
        </p>
      </div>

      {/* Interactive SVG & Node Tree */}
      <div className="relative rounded-2xl border border-rule bg-page-alt/70 p-5">
        {/* Vertical Growing Trunk Line */}
        <div
          className="absolute bottom-8 left-8 top-8 w-0.5 bg-gradient-to-b from-sage via-accent to-accent"
          aria-hidden="true"
        />

        <div className="relative space-y-5">
          {milestones.map((item, idx) => {
            const isSelected = item.id === selectedId;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="relative flex items-start gap-4 pl-2"
              >
                {/* Animated Branch Node Connector */}
                <button
                  type="button"
                  onClick={() => onSelect(item.id)}
                  aria-label={`Select milestone ${item.year}: ${item.qualification}`}
                  className={`relative z-10 mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isSelected
                      ? 'scale-110 border-accent bg-accent text-page shadow-md'
                      : 'border-rule-strong bg-page text-accent hover:border-accent'
                  }`}
                >
                  <GraduationCap className="h-4 w-4" />
                </button>

                {/* Branch Card */}
                <button
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className={`flex-1 rounded-xl border p-3.5 text-left transition ${
                    isSelected
                      ? 'border-accent bg-page shadow-card'
                      : 'border-rule bg-page/70 hover:border-accent/50 hover:bg-page'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold text-accent">
                      {item.year}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] ${
                        item.status === 'Ongoing'
                          ? 'bg-accent/20 text-accent'
                          : 'bg-sage/20 text-sage'
                      }`}
                    >
                      {item.status === 'Ongoing' ? (
                        <Clock className="h-3 w-3" />
                      ) : (
                        <CheckCircle2 className="h-3 w-3" />
                      )}
                      {item.status}
                    </span>
                  </div>

                  <h3 className="mt-1 font-serif text-lg font-bold text-ink">
                    {item.qualification}
                  </h3>
                  <p className="text-xs font-medium text-ink-secondary">
                    {item.institution}
                  </p>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const EducationDetailRightPage: React.FC<{
  milestone: EducationMilestone;
  allMilestones: EducationMilestone[];
  onSelect: (id: string) => void;
}> = ({ milestone, allMilestones, onSelect }) => {
  const [expandedAll, setExpandedAll] = useState(false);

  if (!milestone) return null;

  return (
    <div className="space-y-6">
      {/* Selected Node Dossier */}
      <div className="rounded-2xl border border-accent/50 bg-page-alt p-5 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              Selected Academic Node • {milestone.year}
            </span>
            <h3 className="mt-1 font-serif text-2xl font-bold text-ink">
              {milestone.qualification}
            </h3>
          </div>
          <span className="inline-flex items-center gap-1 rounded-lg border border-rule bg-page px-2.5 py-1 font-mono text-xs text-ink-secondary">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            {milestone.location}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
              Institution
            </div>
            <div className="font-serif text-lg font-semibold text-ink">
              {milestone.institution}
            </div>
          </div>

          {/* Verified Result Banner */}
          <div
            className={`rounded-xl border p-3 ${
              milestone.verified_results
                ? 'border-sage/40 bg-sage/10'
                : 'border-accent/40 bg-accent/10'
            }`}
          >
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-ink">
              {milestone.verified_results ? (
                <CheckCircle2 className="h-4 w-4 text-sage" />
              ) : (
                <AlertCircle className="h-4 w-4 text-accent" />
              )}
              <span>{milestone.results_summary}</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-ink-secondary">
            {milestone.description}
          </p>

          <div className="pt-2">
            <div className="font-mono text-[11px] uppercase tracking-wider text-accent">
              Key Highlights & Academic Notes
            </div>
            <ul className="mt-2 space-y-1.5">
              {milestone.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-ink-secondary"
                >
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Expandable Full Chronological Accordion */}
      <div className="rounded-xl border border-rule bg-page-alt/50 p-4">
        <button
          type="button"
          onClick={() => setExpandedAll((prev) => !prev)}
          className="flex w-full items-center justify-between text-left font-mono text-xs uppercase tracking-wider text-ink"
        >
          <span>Complete Chronological Summary (2021 – Present)</span>
          {expandedAll ? (
            <ChevronUp className="h-4 w-4 text-accent" />
          ) : (
            <ChevronDown className="h-4 w-4 text-accent" />
          )}
        </button>

        {expandedAll && (
          <div className="mt-4 space-y-3 border-t border-rule pt-3">
            {allMilestones.map((m) => (
              <div
                key={m.id}
                onClick={() => onSelect(m.id)}
                className="cursor-pointer rounded-lg border border-rule bg-page p-3 transition hover:border-accent"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-semibold text-accent">{m.year}</span>
                  <span className="text-ink-muted">{m.institution}</span>
                </div>
                <div className="mt-1 font-serif text-sm font-bold text-ink">
                  {m.qualification}
                </div>
                <div className="mt-0.5 text-xs text-ink-secondary">
                  {m.results_summary}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
