import React from 'react';
import {
  Compass,
  BrainCircuit,
  Sparkles,
  Target,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { ChapterSlug } from '@/types/portfolio';

export function renderNextChapterSpread(
  onSelectChapter: (slug: ChapterSlug) => void
): {
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
} {
  return {
    leftPage: <NextChapterLeftPage />,
    rightPage: <NextChapterRightPage onSelectChapter={onSelectChapter} />,
  };
}

const NextChapterLeftPage: React.FC = () => {
  const { data } = usePortfolio();
  const vision = data.next_chapter;

  return (
    <div className="space-y-5">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          Chapter 12 • The Next Chapter
        </span>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">
          The Unfinished Page: Research & Horizon
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
          An honest look at the Artificial Intelligence and Machine Learning problems I am currently exploring and the direction I am working toward.
        </p>
      </div>

      {/* AI Research Interests */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent">
          <BrainCircuit className="h-4 w-4" />
          <span>Artificial Intelligence Research Interests</span>
        </div>
        {vision.ai_research_interests.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-rule bg-page-alt/70 p-3.5"
          >
            <h3 className="font-serif text-base font-bold text-ink">
              {item.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
              {item.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Machine Learning Interests */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-sage">
          <Sparkles className="h-4 w-4" />
          <span>Applied Machine Learning Focus</span>
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {vision.ml_interests.map((ml, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-rule bg-page-alt/50 p-3.5"
            >
              <h4 className="font-serif text-sm font-bold text-ink">
                {ml.title}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
                {ml.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const NextChapterRightPage: React.FC<{
  onSelectChapter: (slug: ChapterSlug) => void;
}> = ({ onSelectChapter }) => {
  const { data } = usePortfolio();
  const vision = data.next_chapter;

  return (
    <div className="flex h-full flex-col justify-between space-y-5">
      <div className="space-y-5">
        {/* Technologies Currently Being Explored */}
        <div className="rounded-xl border border-rule bg-page-alt/70 p-4">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            <Compass className="h-4 w-4" />
            <span>Technologies Currently Being Explored</span>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {vision.technologies_exploring.map((tech, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-rule bg-page p-2.5"
              >
                <div className="font-serif text-sm font-bold text-ink">
                  {tech.name}
                </div>
                <div className="mt-0.5 font-mono text-[10px] text-ink-secondary">
                  {tech.focus}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Project Concepts */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            <Lightbulb className="h-4 w-4" />
            <span>Future Project Ideas on the Drawing Board</span>
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {vision.future_project_ideas.map((idea, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-dashed border-accent/50 bg-page-alt/50 p-3.5"
              >
                <h4 className="font-serif text-base font-bold text-ink">
                  {idea.title}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
                  {idea.concept}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Goals */}
        <div className="rounded-xl border border-rule bg-page-alt/60 p-4">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            <Target className="h-4 w-4" />
            <span>Professional Development Goals</span>
          </div>
          <ul className="mt-2.5 space-y-2">
            {vision.professional_goals.map((goal, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-ink-secondary"
              >
                <span className="font-mono text-accent">0{idx + 1}.</span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Long-Term Direction Footer */}
      <div className="rounded-2xl border border-accent/40 bg-page-alt p-4">
        <p className="font-serif text-sm italic leading-relaxed text-ink">
          &ldquo;{vision.long_term_direction}&rdquo;
        </p>
        <div className="mt-3 flex items-center justify-between border-t border-rule pt-2.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            Page Intentionally Open-Ended
          </span>
          <button
            type="button"
            onClick={() => onSelectChapter('contact')}
            className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-accent hover:underline"
          >
            <span>Turn to Final Chapter: Contact</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
