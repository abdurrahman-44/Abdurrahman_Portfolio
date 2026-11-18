import React, { useEffect, useState } from 'react';
import {
  ArrowDown,
  BookOpen,
  Compass,
  Sparkles,
  ChevronRight,
  Terminal,
  Layers,
  GraduationCap,
  FolderGit2,
} from 'lucide-react';
import { ChapterSlug } from '@/types/portfolio';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { CHAPTERS } from '@/config/chapters';

interface HomeChapterProps {
  onSelectChapter: (slug: ChapterSlug) => void;
  onOpenIndex: () => void;
}

export function renderHomeSpread({
  onSelectChapter,
  onOpenIndex,
}: HomeChapterProps): {
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
} {
  return {
    leftPage: <HomeLeftPage onSelectChapter={onSelectChapter} />,
    rightPage: (
      <HomeRightPage
        onSelectChapter={onSelectChapter}
        onOpenIndex={onOpenIndex}
      />
    ),
  };
}

const HomeLeftPage: React.FC<{ onSelectChapter: (slug: ChapterSlug) => void }> = ({
  onSelectChapter,
}) => {
  const { data } = usePortfolio();
  const phrases = data.profile.typing_phrases;
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex % phrases.length];
    const speed = isDeleting ? 35 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const next = currentPhrase.slice(0, displayedText.length + 1);
        setDisplayedText(next);
        if (next === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        const next = currentPhrase.slice(0, displayedText.length - 1);
        setDisplayedText(next);
        if (next.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex, phrases]);

  return (
    <div className="flex h-full flex-col justify-between space-y-6">
      {/* Top Edition Badge */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-page-alt px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-sage" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-secondary">
            Chapter 01 • Frontispiece
          </span>
        </div>

        {/* Large Meaningful Editorial Quote */}
        <blockquote className="mt-6 border-l-2 border-accent pl-4 sm:pl-6">
          <p className="font-serif text-xl italic leading-relaxed text-ink-secondary sm:text-2xl">
            &ldquo;{data.profile.quote}&rdquo;
          </p>
        </blockquote>

        {/* Identity & Animated Typing Role */}
        <div className="mt-8">
          <p className="font-mono text-xs uppercase tracking-[0.26em] text-accent">
            Personal Monograph & Engineering Portfolio
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-ink sm:text-5xl xl:text-6xl">
            ABDURRAHMAN ZAROOK
          </h1>
          <p className="mt-2 text-base font-medium text-ink-secondary sm:text-lg">
            Artificial Intelligence Undergraduate
          </p>

          {/* Animated Typing Line */}
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-rule bg-page-alt/80 px-4 py-3 font-mono text-xs sm:text-sm">
            <Terminal className="h-4 w-4 shrink-0 text-accent" />
            <span className="text-ink-muted">Focus:</span>
            <span className="font-semibold text-ink" aria-live="off">
              {displayedText}
            </span>
            <span
              className="inline-block h-4 w-0.5 animate-pulse bg-accent"
              aria-hidden="true"
            />
          </div>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-ink-secondary">
          {data.profile.short_bio}
        </p>
      </div>

      {/* Primary Calls to Action */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onSelectChapter('intro')}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-xs font-semibold uppercase tracking-wider text-page shadow-sm transition hover:bg-accent-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <BookOpen className="h-4 w-4" />
            <span>Explore My Journey</span>
            <ChevronRight className="h-4 w-4" />
          </button>

          <a
            href={data.profile.cv_url}
            download="Abdurrahman-Zarook-CV.pdf"
            className="inline-flex items-center gap-2 rounded-xl border border-rule-strong bg-page-alt px-5 py-3 text-xs font-semibold uppercase tracking-wider text-ink transition hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ArrowDown className="h-4 w-4 text-accent" />
            <span>Download CV</span>
          </a>
        </div>

        {/* Small Chapter Navigation Indicator */}
        <div className="flex items-center justify-between border-t border-rule/70 pt-3 font-mono text-[11px] text-ink-muted">
          <span>Use ← / → arrow keys or click Turn Page</span>
          <span className="text-accent">13 Verified Chapters</span>
        </div>
      </div>
    </div>
  );
};

const HomeRightPage: React.FC<HomeChapterProps> = ({
  onSelectChapter,
  onOpenIndex,
}) => {
  const { data, askAurevonPrompt, setIsAurevonOpen } = usePortfolio();

  const quickChapters: {
    slug: ChapterSlug;
    num: string;
    label: string;
    desc: string;
    icon: React.ReactNode;
  }[] = [
    {
      slug: 'intro',
      num: '02',
      label: 'The Person Behind the Code',
      desc: 'Interactive 3D portrait, trilingual fluency & core pillars',
      icon: <Compass className="h-4 w-4 text-accent" />,
    },
    {
      slug: 'education',
      num: '03',
      label: 'Education Journey',
      desc: 'Zahira National College, NIBM Kandy & NSBM Green University',
      icon: <GraduationCap className="h-4 w-4 text-accent" />,
    },
    {
      slug: 'projects',
      num: '07',
      label: 'Featured Projects & Archive',
      desc: 'FederatedMind, AUREVON AI, Travel-Lanka AI, PechaVote & WAHDATH',
      icon: <FolderGit2 className="h-4 w-4 text-accent" />,
    },
    {
      slug: 'skills',
      num: '06',
      label: 'Technology Arsenal',
      desc: 'Python, PyTorch, Flower, React, TypeScript, FastAPI & Supabase',
      icon: <Layers className="h-4 w-4 text-accent" />,
    },
  ];

  return (
    <div className="flex h-full flex-col justify-between space-y-6">
      {/* Curated Book Overview & Quick Chapter Index */}
      <div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Reader’s Guide & Curated Spreads
          </span>
          <button
            type="button"
            onClick={onOpenIndex}
            className="font-mono text-xs text-ink-secondary underline decoration-accent/60 underline-offset-4 hover:text-accent"
          >
            View All {CHAPTERS.length} Chapters →
          </button>
        </div>

        <h2 className="mt-2 font-serif text-2xl font-bold text-ink sm:text-3xl">
          Inside This Volume
        </h2>
        <p className="mt-1 text-xs text-ink-secondary">
          Turn straight to any milestone or explore page-by-page.
        </p>

        <div className="mt-4 grid gap-2.5">
          {quickChapters.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => onSelectChapter(item.slug)}
              className="group flex items-start justify-between rounded-xl border border-rule bg-page-alt/60 p-3.5 text-left transition hover:border-accent hover:bg-page-alt"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-rule bg-page">
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-semibold text-accent">
                      CH. {item.num}
                    </span>
                    <h3 className="font-serif text-base font-bold text-ink group-hover:text-accent">
                      {item.label}
                    </h3>
                  </div>
                  <p className="mt-0.5 text-xs text-ink-secondary">{item.desc}</p>
                </div>
              </div>
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
            </button>
          ))}
        </div>
      </div>

      {/* AUREVON AI Companion Introduction Card */}
      <div className="rounded-2xl border border-accent/40 bg-page-alt p-5 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/aurevon-logo.svg"
              alt="AUREVON AI"
              className="h-9 w-9 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  Integrated AI Companion
                </span>
                <span className="rounded-full bg-sage/20 px-2 py-0.5 font-mono text-[10px] text-sage">
                  Qwen2.5 3B + Grounded Graph
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-ink">
                Meet AUREVON AI
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAurevonOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-page transition hover:bg-accent-strong"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ask AUREVON</span>
          </button>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-ink-secondary">
          Built on Abdurrahman’s own <strong>AUREVON AI</strong> platform, this companion answers verified questions about his education, FederatedMind research, and 12 software projects—or assists with general technical queries.
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {[
            "Tell me about Abdurrahman's AI projects.",
            'What is FederatedMind?',
            'Explain his education journey.',
          ].map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => askAurevonPrompt(prompt, 'portfolio')}
              className="rounded-full border border-rule bg-page px-2.5 py-1 font-mono text-[10px] text-ink-secondary transition hover:border-accent hover:text-accent"
            >
              &ldquo;{prompt}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Verified Edition Colophon Strip */}
      <div className="grid grid-cols-3 gap-2 border-t border-rule pt-3 text-center">
        <div>
          <div className="font-serif text-xl font-bold text-accent">
            {data.projects.filter((p) => p.status === 'Completed').length}+
          </div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
            Completed Works
          </div>
        </div>
        <div>
          <div className="font-serif text-xl font-bold text-accent">
            {data.projects.filter((p) => p.status !== 'Completed').length}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
            Active Research
          </div>
        </div>
        <div>
          <div className="font-serif text-xl font-bold text-accent">NSBM</div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
            BSc (Hons) AI
          </div>
        </div>
      </div>
    </div>
  );
};
