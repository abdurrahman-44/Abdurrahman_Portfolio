import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, FastForward, Sparkles, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';

interface PrologueLoaderProps {
  onComplete: () => void;
}

const LOADING_MESSAGES = [
  { threshold: 0, text: 'Initializing experience...' },
  { threshold: 20, text: 'Preparing the journey...' },
  { threshold: 42, text: 'Loading chapters...' },
  { threshold: 64, text: 'Building the experience...' },
  { threshold: 82, text: 'AUREVON AI ready...' },
  { threshold: 95, text: 'Starting my journey...' },
];

export const PrologueLoader: React.FC<PrologueLoaderProps> = ({ onComplete }) => {
  const { aurevonStatus } = usePortfolio();
  const [progress, setProgress] = useState(0);
  const [isOpeningBook, setIsOpeningBook] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setProgress(100);
      const t = setTimeout(onComplete, 350);
      return () => clearTimeout(t);
    }

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 5;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsOpeningBook(true);
          setTimeout(onComplete, 650);
        }, 320);
      } else {
        setProgress(current);
      }
    }, 85);

    return () => clearInterval(interval);
  }, [onComplete]);

  const activeMessage =
    [...LOADING_MESSAGES]
      .reverse()
      .find((m) => progress >= m.threshold)?.text || LOADING_MESSAGES[0].text;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55 } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-canvas px-6 py-10 text-ink overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="Loading THE MAKING OF ABDURRAHMAN"
    >
      {/* Ambient Radial Illumination */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: 0.25 + (progress / 100) * 0.55,
          background:
            'radial-gradient(circle at 50% 45%, var(--accent-soft), transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Top Bar: Edition Title & Skip Action */}
      <div className="relative z-10 flex w-full max-w-5xl items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted">
          <BookOpen className="h-3.5 w-3.5 text-accent" />
          <span>Prologue • Digital Monograph</span>
        </div>

        <button
          type="button"
          onClick={onComplete}
          className="inline-flex items-center gap-1.5 rounded-full border border-rule bg-page/80 px-3.5 py-1.5 font-mono text-xs text-ink-secondary transition hover:border-accent hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span>Skip Prologue</span>
          <FastForward className="h-3.5 w-3.5 text-accent" />
        </button>
      </div>

      {/* Center: Illuminated Personal Emblem & Book-Opening Sequence */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
        <motion.div
          animate={
            isOpeningBook
              ? { scale: 1.12, rotateY: 25, opacity: 0.9 }
              : { scale: 1, rotateY: 0, opacity: 1 }
          }
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="relative mb-8 flex h-28 w-28 items-center justify-center rounded-2xl border border-rule-strong bg-page shadow-book"
          style={{
            boxShadow: `0 0 ${Math.round(progress * 0.45)}px rgba(212, 184, 149, ${
              (progress / 100) * 0.35
            })`,
          }}
        >
          {/* Decorative Inner Folio Frame */}
          <div className="absolute inset-2 rounded-xl border border-accent/30" />
          <span className="font-serif text-4xl font-bold tracking-[0.18em] text-accent">
            AZ
          </span>
        </motion.div>

        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Interactive Digital Book Portfolio
        </p>

        <h1 className="mt-2 font-serif text-3xl font-bold tracking-wide text-ink sm:text-5xl">
          THE MAKING OF ABDURRAHMAN
        </h1>

        <p className="mt-3 font-serif text-base italic text-ink-secondary sm:text-lg">
          &ldquo;Every chapter is a reflection of what I have learned. Every next page is an opportunity to build something greater.&rdquo;
        </p>

        {/* Progress Bar & Percentage Counter */}
        <div className="mt-10 w-full max-w-md">
          <div className="mb-2 flex items-center justify-between font-mono text-xs">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeMessage}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-ink-secondary"
              >
                {activeMessage}
              </motion.span>
            </AnimatePresence>
            <span className="font-semibold text-accent">{progress}%</span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-page-alt border border-rule">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.15 }}
            />
          </div>
        </div>
      </div>

      {/* Bottom: AUREVON AI Initialization Indicator */}
      <div className="relative z-10 flex items-center gap-3 rounded-full border border-rule bg-page/80 px-4 py-2 text-xs text-ink-secondary shadow-sm">
        <img
          src="/assets/images/aurevon-logo.svg"
          alt="AUREVON AI"
          className="h-4 w-4"
        />
        <span className="font-mono text-[11px]">
          AUREVON AI Companion:{' '}
          <strong className="text-ink">
            {progress >= 80
              ? aurevonStatus === 'online'
                ? 'Server & Knowledge Layer Ready'
                : 'Verified Portfolio Knowledge Ready'
              : 'Synchronizing Portfolio Index...'}
          </strong>
        </span>
        {progress >= 80 ? (
          <CheckCircle2 className="h-3.5 w-3.5 text-sage" />
        ) : (
          <Sparkles className="h-3.5 w-3.5 animate-pulse text-accent" />
        )}
      </div>
    </motion.div>
  );
};
