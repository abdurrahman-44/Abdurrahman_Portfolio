import React, { Suspense, lazy, useState } from 'react';
import { Globe, Layers, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { ChapterSlug } from '@/types/portfolio';

const InteractivePortrait3D = lazy(() =>
  import('@/components/avatar/InteractivePortrait3D').then((m) => ({
    default: m.InteractivePortrait3D,
  }))
);

export function renderIntroSpread(onSelectChapter: (slug: ChapterSlug) => void): {
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
} {
  return {
    leftPage: <IntroLeftPage />,
    rightPage: <IntroRightPage onSelectChapter={onSelectChapter} />,
  };
}

const IntroLeftPage: React.FC = () => {
  const { data } = usePortfolio();
  const completedCount = data.projects.filter((p) => p.status === 'Completed').length;
  const ongoingCount = data.projects.filter((p) => p.status !== 'Completed').length;

  return (
    <div className="space-y-5">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          Chapter 02 • The Person Behind the Code
        </span>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">
          Identity, Craft & Perspective
        </h2>
      </div>

      {/* Lazy-Loaded Interactive 3D Portrait Component */}
      <Suspense
        fallback={
          <div className="overflow-hidden rounded-2xl border border-rule bg-page-alt p-4">
            <img
              src={data.profile.avatar_fallback_url}
              alt="Abdurrahman Zarook"
              className="h-[340px] w-full rounded-xl object-cover object-top"
            />
          </div>
        }
      >
        <InteractivePortrait3D
          portraitImageUrl={data.profile.avatar_fallback_url}
          glbModelUrl={data.profile.avatar_model_url}
        />
      </Suspense>

      {/* Verified Total Project Count Breakdown */}
      <div className="grid grid-cols-3 gap-2.5 rounded-xl border border-rule bg-page-alt/70 p-3.5">
        <div className="rounded-lg border border-rule bg-page p-2.5 text-center">
          <div className="font-serif text-2xl font-bold text-ink">
            {data.projects.length}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
            Total Verified
          </div>
        </div>
        <div className="rounded-lg border border-rule bg-page p-2.5 text-center">
          <div className="flex items-center justify-center gap-1 font-serif text-2xl font-bold text-sage">
            <CheckCircle2 className="h-4 w-4" />
            <span>{completedCount}</span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
            Completed
          </div>
        </div>
        <div className="rounded-lg border border-rule bg-page p-2.5 text-center">
          <div className="flex items-center justify-center gap-1 font-serif text-2xl font-bold text-accent">
            <Clock className="h-4 w-4" />
            <span>{ongoingCount}</span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
            Ongoing / R&D
          </div>
        </div>
      </div>
    </div>
  );
};

const IntroRightPage: React.FC<{ onSelectChapter: (slug: ChapterSlug) => void }> = ({
  onSelectChapter,
}) => {
  const { data } = usePortfolio();
  const [activeSkillId, setActiveSkillId] = useState<string>(
    data.profile.soft_skills[0]?.id || ''
  );

  return (
    <div className="space-y-6">
      {/* Professional Concise Introduction */}
      <div>
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
          <ShieldCheck className="h-4 w-4" />
          <span>Verified Biographical Profile</span>
        </div>
        <h3 className="mt-1 font-serif text-2xl font-bold text-ink">
          {data.profile.full_name}
        </h3>
        <p className="mt-1 font-mono text-xs text-ink-muted">
          {data.profile.headline} • {data.profile.location}
        </p>

        <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-secondary">
          <p>{data.profile.short_bio}</p>
          <p>{data.profile.extended_bio}</p>
        </div>
      </div>

      {/* Languages Section */}
      <div className="rounded-xl border border-rule bg-page-alt/60 p-4">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
          <Globe className="h-4 w-4" />
          <span>Spoken & Written Languages</span>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {data.profile.languages.map((lang) => (
            <div
              key={lang.name}
              className="flex flex-col justify-between rounded-lg border border-rule bg-page px-3.5 py-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-bold text-ink">
                  {lang.name}
                </span>
                {lang.native_script && (
                  <span className="text-xs text-ink-muted">{lang.native_script}</span>
                )}
              </div>
              <span className="mt-1 inline-block font-mono text-[11px] font-medium text-accent">
                — {lang.proficiency}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Four Interactive Soft Skill Cards */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
            <Layers className="h-4 w-4" />
            <span>Core Professional Pillars (Interactive)</span>
          </div>
          <button
            type="button"
            onClick={() => onSelectChapter('projects')}
            className="font-mono text-[11px] text-ink-secondary underline decoration-accent/60 underline-offset-4 hover:text-accent"
          >
            Inspect Projects →
          </button>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {data.profile.soft_skills.map((skill) => {
            const isSelected = activeSkillId === skill.id;
            return (
              <button
                key={skill.id}
                type="button"
                onClick={() => setActiveSkillId(skill.id)}
                className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition ${
                  isSelected
                    ? 'border-accent bg-accent/15 shadow-sm'
                    : 'border-rule bg-page-alt/50 hover:border-accent/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-base font-bold text-ink">
                      {skill.title}
                    </h4>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                      Pillar
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">
                    {skill.description}
                  </p>
                </div>
                <div className="mt-3 border-t border-rule/60 pt-2 font-serif text-xs italic text-accent">
                  &ldquo;{skill.principle}&rdquo;
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
