import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, X, Compass } from 'lucide-react';
import { CHAPTERS, getChapterBySlug, getChapterIndex } from '@/config/chapters';
import { ChapterSlug } from '@/types/portfolio';

interface DigitalBookEngineProps {
  activeChapter: ChapterSlug;
  onSelectChapter: (slug: ChapterSlug) => void;
  isIndexOpen: boolean;
  onCloseIndex: () => void;
  renderSpreadContent: (slug: ChapterSlug) => {
    leftPage: React.ReactNode;
    rightPage: React.ReactNode;
  };
}

export const DigitalBookEngine: React.FC<DigitalBookEngineProps> = ({
  activeChapter,
  onSelectChapter,
  isIndexOpen,
  onCloseIndex,
  renderSpreadContent,
}) => {
  const currentMeta = getChapterBySlug(activeChapter);
  const currentIndex = getChapterIndex(activeChapter);
  const prevChapter = currentIndex > 0 ? CHAPTERS[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < CHAPTERS.length - 1 ? CHAPTERS[currentIndex + 1] : null;

  const [turnDirection, setTurnDirection] = useState<'next' | 'prev'>('next');
  const prevIndexRef = useRef<number>(currentIndex);
  const leftPageScrollRef = useRef<HTMLDivElement>(null);
  const rightPageScrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Track direction for realistic page-flip 3D rotation
  useEffect(() => {
    if (currentIndex > prevIndexRef.current) {
      setTurnDirection('next');
    } else if (currentIndex < prevIndexRef.current) {
      setTurnDirection('prev');
    }
    prevIndexRef.current = currentIndex;

    // Reset internal page scroll positions on chapter change
    leftPageScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    rightPageScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    mobileScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex, activeChapter]);

  // Keyboard arrow navigation (when not typing inside an input/textarea)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      if (e.key === 'ArrowRight' && nextChapter) {
        onSelectChapter(nextChapter.id);
      } else if (e.key === 'ArrowLeft' && prevChapter) {
        onSelectChapter(prevChapter.id);
      } else if (e.key === 'Escape' && isIndexOpen) {
        onCloseIndex();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextChapter, prevChapter, onSelectChapter, isIndexOpen, onCloseIndex]);

  // Touch swipe detection for Mobile / Tablet single-page presentation
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;

    // Only trigger horizontal page turn if horizontal swipe dominates vertical scroll
    if (Math.abs(dx) > 75 && Math.abs(dx) > Math.abs(dy) * 1.6) {
      if (dx < 0 && nextChapter) {
        onSelectChapter(nextChapter.id);
      } else if (dx > 0 && prevChapter) {
        onSelectChapter(prevChapter.id);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const { leftPage, rightPage } = renderSpreadContent(activeChapter);

  const pageFlipVariants = {
    initial: (dir: 'next' | 'prev') => ({
      opacity: 0,
      rotateY: dir === 'next' ? 18 : -18,
      scale: 0.985,
      transformOrigin: dir === 'next' ? 'left center' : 'right center',
    }),
    animate: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir: 'next' | 'prev') => ({
      opacity: 0,
      rotateY: dir === 'next' ? -14 : 14,
      scale: 0.985,
      transformOrigin: dir === 'next' ? 'right center' : 'left center',
      transition: {
        duration: 0.32,
        ease: [0.4, 0, 1, 1],
      },
    }),
  };

  return (
    <main
      className="relative flex flex-1 flex-col items-center justify-center px-2 py-3 sm:px-5 sm:py-5 lg:px-8"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-live="polite"
    >
      {/* Ambient Studio Lighting Backdrop */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 50% 18%, var(--accent-soft), transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* =====================================================================
          DESKTOP TWO-PAGE OPEN-BOOK PRESENTATION (LG and up)
      ===================================================================== */}
      <div
        className="relative z-10 hidden w-full max-w-[1520px] lg:block"
        style={{ perspective: '2400px' }}
      >
        <AnimatePresence mode="wait" custom={turnDirection}>
          <motion.div
            key={activeChapter}
            custom={turnDirection}
            variants={pageFlipVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative grid min-h-[720px] w-full grid-cols-2 rounded-2xl border border-rule-strong bg-page shadow-book"
          >
            {/* Left Page (Verso) */}
            <section
              aria-label={`Chapter ${currentMeta.number} Left Page: ${currentMeta.spreadLeftTitle}`}
              className="book-edge-left paper-texture relative flex flex-col justify-between rounded-l-2xl border-r border-rule/80 bg-page shadow-page overflow-hidden"
            >
              {/* Running Header — Left Page */}
              <div className="flex items-center justify-between border-b border-rule/70 px-8 py-3.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  Chapter {currentMeta.number} • {currentMeta.roman}
                </span>
                <span className="font-serif text-xs italic tracking-wide text-ink-muted">
                  THE MAKING OF ABDURRAHMAN
                </span>
              </div>

              {/* Scrollable Left Page Body */}
              <div
                ref={leftPageScrollRef}
                className="book-page-scroll flex-1 overflow-y-auto px-8 py-6 xl:px-10 xl:py-8"
              >
                {leftPage}
              </div>

              {/* Running Footer — Left Page */}
              <div className="flex items-center justify-between border-t border-rule/60 px-8 py-2.5 text-[11px] text-ink-muted">
                <button
                  type="button"
                  disabled={!prevChapter}
                  onClick={() => prevChapter && onSelectChapter(prevChapter.id)}
                  className="inline-flex items-center gap-1.5 font-mono uppercase tracking-wider text-ink-secondary transition hover:text-accent disabled:opacity-30"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  {prevChapter ? `Ch. ${prevChapter.number} ${prevChapter.navLabel}` : 'Front Cover'}
                </button>
                <span className="font-mono">
                  Page {String(currentIndex * 2 + 1).padStart(2, '0')}
                </span>
              </div>
            </section>

            {/* Center Bookbinding Spine Overlay */}
            <div
              className="book-spine-center pointer-events-none absolute inset-y-0 left-1/2 z-20 w-12 -translate-x-1/2"
              aria-hidden="true"
            />

            {/* Right Page (Recto) */}
            <section
              aria-label={`Chapter ${currentMeta.number} Right Page: ${currentMeta.spreadRightTitle}`}
              className="book-edge-right paper-texture relative flex flex-col justify-between rounded-r-2xl bg-page shadow-page overflow-hidden"
            >
              {/* Running Header — Right Page */}
              <div className="flex items-center justify-between border-b border-rule/70 px-8 py-3.5">
                <span className="font-serif text-xs italic text-ink-secondary">
                  {currentMeta.title}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                  {currentMeta.spreadRightTitle}
                </span>
              </div>

              {/* Scrollable Right Page Body */}
              <div
                ref={rightPageScrollRef}
                className="book-page-scroll flex-1 overflow-y-auto px-8 py-6 xl:px-10 xl:py-8"
              >
                {rightPage}
              </div>

              {/* Running Footer — Right Page */}
              <div className="flex items-center justify-between border-t border-rule/60 px-8 py-2.5 text-[11px] text-ink-muted">
                <span className="font-mono">
                  Page {String(currentIndex * 2 + 2).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  disabled={!nextChapter}
                  onClick={() => nextChapter && onSelectChapter(nextChapter.id)}
                  className="inline-flex items-center gap-1.5 font-mono uppercase tracking-wider text-ink-secondary transition hover:text-accent disabled:opacity-30"
                >
                  {nextChapter ? `Ch. ${nextChapter.number} ${nextChapter.navLabel}` : 'Finis'}
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =====================================================================
          MOBILE & TABLET SINGLE-PAGE BOOK EXPERIENCE (< LG)
      ===================================================================== */}
      <div
        ref={mobileScrollRef}
        className="relative z-10 block w-full max-w-2xl lg:hidden"
      >
        <AnimatePresence mode="wait">
          <motion.article
            key={activeChapter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="paper-texture rounded-2xl border border-rule-strong bg-page shadow-book overflow-hidden"
          >
            {/* Mobile Chapter Folio Header */}
            <div className="flex items-center justify-between border-b border-rule px-4 py-3 sm:px-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Chapter {currentMeta.number} • {currentMeta.roman}
                </span>
                <h2 className="font-serif text-lg font-semibold text-ink">
                  {currentMeta.title}
                </h2>
              </div>
              <span className="rounded-full border border-rule bg-page-alt px-2.5 py-1 font-mono text-[10px] text-ink-muted">
                {currentIndex + 1} / {CHAPTERS.length}
              </span>
            </div>

            {/* Combined Single-Page Flow */}
            <div className="space-y-8 px-4 py-6 sm:px-6 sm:py-8">
              <div>{leftPage}</div>
              <div className="border-t border-rule pt-8">{rightPage}</div>
            </div>

            {/* Mobile Bottom Page Turn Bar */}
            <div className="flex items-center justify-between border-t border-rule bg-page-alt/60 px-4 py-3.5 sm:px-6">
              <button
                type="button"
                disabled={!prevChapter}
                onClick={() => prevChapter && onSelectChapter(prevChapter.id)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-rule bg-page px-3 py-2 text-xs font-medium text-ink disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4 text-accent" />
                <span>{prevChapter ? prevChapter.navLabel : 'Start'}</span>
              </button>

              <span className="font-mono text-[11px] text-ink-muted">
                Swipe to turn page
              </span>

              <button
                type="button"
                disabled={!nextChapter}
                onClick={() => nextChapter && onSelectChapter(nextChapter.id)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-accent/50 bg-accent/15 px-3 py-2 text-xs font-medium text-ink disabled:opacity-40"
              >
                <span>{nextChapter ? nextChapter.navLabel : 'End'}</span>
                <ChevronRight className="h-4 w-4 text-accent" />
              </button>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* =====================================================================
          COMPLETE CHAPTER INDEX MODAL (TABLE OF CONTENTS)
      ===================================================================== */}
      <AnimatePresence>
        {isIndexOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Table of Contents — All 13 Chapters"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="paper-texture relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-rule-strong bg-page p-6 shadow-book sm:p-8"
            >
              <div className="mb-6 flex items-start justify-between border-b border-rule pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
                    Index Librorum • Table of Contents
                  </span>
                  <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">
                    THE MAKING OF ABDURRAHMAN
                  </h2>
                  <p className="mt-1 text-xs text-ink-secondary">
                    Select any chapter to turn directly to its spread. Use keyboard arrows (← / →) at any time.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onCloseIndex}
                  className="rounded-lg border border-rule bg-page-alt p-2 text-ink-secondary hover:border-accent hover:text-ink"
                  aria-label="Close Table of Contents"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                {CHAPTERS.map((chap, idx) => {
                  const isCurrent = chap.id === activeChapter;
                  return (
                    <button
                      key={chap.id}
                      type="button"
                      onClick={() => {
                        onSelectChapter(chap.id);
                        onCloseIndex();
                      }}
                      className={`group flex items-start justify-between rounded-xl border p-3.5 text-left transition ${
                        isCurrent
                          ? 'border-accent bg-accent/15 shadow-sm'
                          : 'border-rule bg-page-alt/50 hover:border-accent/60 hover:bg-page-alt'
                      }`}
                    >
                      <div className="pr-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-accent">
                            CH. {chap.number}
                          </span>
                          <span className="text-xs text-ink-muted">•</span>
                          <span className="font-serif text-base font-bold text-ink group-hover:text-accent">
                            {chap.title}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-ink-secondary line-clamp-1">
                          {chap.subtitle}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-[11px] text-ink-muted">
                        p. {String(idx * 2 + 1).padStart(2, '0')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
