import React, { useState } from 'react';
import { Sun, Moon, BookOpen, Menu, X, Sparkles, Compass, Send } from 'lucide-react';
import { CHAPTERS } from '@/config/chapters';
import { ChapterSlug } from '@/types/portfolio';
import { useTheme } from '@/contexts/ThemeContext';

interface BookHeaderProps {
  activeChapter: ChapterSlug;
  onSelectChapter: (slug: ChapterSlug) => void;
  onOpenChapterIndex: () => void;
}

export const BookHeader: React.FC<BookHeaderProps> = ({
  activeChapter,
  onSelectChapter,
  onOpenChapterIndex,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerChapters = CHAPTERS.filter((c) => c.showInHeader);

  const handleNavigate = (slug: ChapterSlug) => {
    onSelectChapter(slug);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-rule bg-page/90 backdrop-blur-md transition-colors duration-300"
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Personal Logo & ABDURRAHMAN */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className="group flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
            aria-label="Go to Chapter 01: Home — THE MAKING OF ABDURRAHMAN"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-rule-strong bg-page-alt shadow-sm transition-transform duration-300 group-hover:scale-105">
              <span className="font-serif text-base font-bold tracking-wider text-accent">
                AZ
              </span>
              <span
                className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-sage"
                aria-hidden="true"
              />
            </div>
            <div>
              <span className="block font-serif text-base font-bold tracking-[0.18em] text-ink sm:text-lg">
                ABDURRAHMAN
              </span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted sm:block">
                The Digital Book • Vol. I
              </span>
            </div>
          </button>
        </div>

        {/* Middle: Chapter Navigation Bar (Desktop XL) */}
        <nav
          aria-label="Book Chapters Navigation"
          className="hidden xl:flex items-center gap-1 rounded-full border border-rule bg-page-alt/70 px-2 py-1"
        >
          {headerChapters.map((chap) => {
            const isActive = activeChapter === chap.id;
            return (
              <button
                key={chap.id}
                type="button"
                onClick={() => handleNavigate(chap.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive
                    ? 'bg-accent text-page font-semibold shadow-sm'
                    : 'text-ink-secondary hover:bg-page hover:text-ink'
                }`}
              >
                <span className="font-mono text-[10px] opacity-75 mr-1">{chap.number}</span>
                {chap.navLabel}
              </button>
            );
          })}
        </nav>

        {/* Right: Index Drawer Trigger, Theme Switcher & Hire Me Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenChapterIndex}
            className="inline-flex items-center gap-1.5 rounded-lg border border-rule bg-page-alt px-2.5 py-1.5 text-xs font-medium text-ink-secondary transition hover:border-accent hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            title="Open Complete Table of Contents (All 13 Chapters)"
            aria-label="Open Table of Contents"
          >
            <BookOpen className="h-3.5 w-3.5 text-accent" />
            <span className="hidden md:inline">Index</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-rule bg-page-alt text-ink-secondary transition hover:border-accent hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={
              theme === 'dark'
                ? 'Switch to Light Theme (Parchment Edition)'
                : 'Switch to Dark Theme (Midnight Folio Edition)'
            }
            title={
              theme === 'dark'
                ? 'Switch to Light Edition (Warm Ivory)'
                : 'Switch to Dark Edition (Midnight Folio)'
            }
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-accent" />
            ) : (
              <Moon className="h-4 w-4 text-accent" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNavigate('contact')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold tracking-wide text-page shadow-sm transition hover:bg-accent-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Hire Me</span>
          </button>

          {/* Compact Accessible Menu Button for Smaller Screens (< XL) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-rule bg-page-alt text-ink xl:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle chapter navigation menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Compact Accessible Dropdown Drawer for Tablet & Mobile */}
      {mobileMenuOpen && (
        <div
          className="border-t border-rule bg-page px-4 py-4 shadow-lg xl:hidden"
          role="dialog"
          aria-label="Mobile Chapter Navigation"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
              Select Chapter (01 – 13)
            </span>
            <span className="font-mono text-[11px] text-accent">
              <Compass className="mr-1 inline h-3 w-3" />
              Swipe or tap to turn pages
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4">
            {CHAPTERS.map((chap) => {
              const isActive = activeChapter === chap.id;
              return (
                <button
                  key={chap.id}
                  type="button"
                  onClick={() => handleNavigate(chap.id)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs transition ${
                    isActive
                      ? 'border-accent bg-accent/15 font-semibold text-ink'
                      : 'border-rule bg-page-alt/60 text-ink-secondary hover:border-accent/50 hover:text-ink'
                  }`}
                >
                  <span className="font-mono text-[11px] text-accent">{chap.number}.</span>
                  <span className="truncate">{chap.navLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
