import React from 'react';
import { ArrowDown, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { CHAPTERS, getChapterBySlug, getChapterIndex } from '@/config/chapters';
import { ChapterSlug } from '@/types/portfolio';
import { usePortfolio } from '@/contexts/PortfolioContext';

interface BookFooterProps {
  activeChapter: ChapterSlug;
  onSelectChapter: (slug: ChapterSlug) => void;
}

export const BookFooter: React.FC<BookFooterProps> = ({
  activeChapter,
  onSelectChapter,
}) => {
  const { data, aurevonStatus, setIsAurevonOpen } = usePortfolio();
  const currentMeta = getChapterBySlug(activeChapter);
  const currentIndex = getChapterIndex(activeChapter);
  const prevChapter = currentIndex > 0 ? CHAPTERS[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < CHAPTERS.length - 1 ? CHAPTERS[currentIndex + 1] : null;

  return (
    <footer
      className="relative z-30 mt-auto w-full border-t border-rule bg-page/95 backdrop-blur-md transition-colors duration-300"
      role="contentinfo"
    >
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Actual AUREVON AI Logo Asset + "Powered by AUREVON AI" + Chapter Info */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setIsAurevonOpen(true)}
            className="group flex items-center gap-2.5 rounded-lg border border-rule bg-page-alt/70 px-2.5 py-1.5 text-left transition hover:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Open AUREVON AI Portfolio Companion"
          >
            <img
              src="/assets/images/aurevon-logo.svg"
              alt="AUREVON AI Logo"
              className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:rotate-12"
            />
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium tracking-wide text-ink">
                Powered by <strong className="font-semibold text-accent">AUREVON AI</strong>
              </span>
              <span
                className={`inline-flex h-2 w-2 rounded-full ${
                  aurevonStatus === 'online'
                    ? 'bg-emerald-500'
                    : 'bg-accent'
                }`}
                title={
                  aurevonStatus === 'online'
                    ? 'AUREVON AI Model Live'
                    : 'AUREVON Portfolio Knowledge Engine Active'
                }
              />
            </div>
          </button>

          <div className="hidden items-center gap-2 border-l border-rule pl-4 lg:flex">
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
              Chapter {currentMeta.number} / {CHAPTERS.length}
            </span>
            <span className="text-xs text-ink-muted">•</span>
            <span className="font-serif text-sm italic text-ink-secondary">
              {currentMeta.title}
            </span>
          </div>
        </div>

        {/* Center: Quick Page Turn Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            disabled={!prevChapter}
            onClick={() => prevChapter && onSelectChapter(prevChapter.id)}
            className="inline-flex items-center gap-1 rounded-lg border border-rule bg-page-alt px-2.5 py-1.5 text-xs font-medium text-ink-secondary transition hover:border-accent hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={
              prevChapter
                ? `Previous Chapter: ${prevChapter.title}`
                : 'At first chapter'
            }
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Prev Page</span>
          </button>

          <span className="px-2 font-mono text-xs text-ink-muted">
            p. {String(currentIndex * 2 + 1).padStart(2, '0')}–
            {String(currentIndex * 2 + 2).padStart(2, '0')}
          </span>

          <button
            type="button"
            disabled={!nextChapter}
            onClick={() => nextChapter && onSelectChapter(nextChapter.id)}
            className="inline-flex items-center gap-1 rounded-lg border border-rule bg-page-alt px-2.5 py-1.5 text-xs font-medium text-ink-secondary transition hover:border-accent hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={
              nextChapter
                ? `Next Chapter: ${nextChapter.title}`
                : 'At final chapter'
            }
          >
            <span className="hidden sm:inline">Turn Page</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Right: Elegant Downward-Arrow-Shaped CV Download Control */}
        <div className="flex items-center gap-3">
          <a
            href={data.profile.cv_url}
            download="Abdurrahman-Zarook-CV.pdf"
            title="Download My CV"
            aria-label="Download My CV"
            className="group relative inline-flex items-center gap-2 rounded-full border border-accent/50 bg-page-alt px-3.5 py-1.5 text-xs font-medium text-ink shadow-sm transition-all duration-300 hover:border-accent hover:bg-accent hover:text-page focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="hidden md:inline font-mono text-[11px] uppercase tracking-wider">
              Download My CV
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent transition-transform duration-300 group-hover:translate-y-0.5 group-hover:bg-page/20 group-hover:text-page">
              <ArrowDown className="h-3.5 w-3.5" />
            </span>
            {/* Accessible Tooltip */}
            <span
              role="tooltip"
              className="pointer-events-none absolute -top-9 right-0 whitespace-nowrap rounded-md border border-rule bg-surface px-2.5 py-1 font-sans text-[11px] font-medium text-ink opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              Download My CV (Verified PDF)
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};
