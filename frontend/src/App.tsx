import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
  Link,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { PortfolioProvider } from '@/contexts/PortfolioContext';
import { CHAPTER_MAP, getChapterBySlug } from '@/config/chapters';
import { ChapterSlug } from '@/types/portfolio';
import { BookHeader } from '@/components/layout/BookHeader';
import { BookFooter } from '@/components/layout/BookFooter';
import { DigitalBookEngine } from '@/components/book/DigitalBookEngine';
import { PrologueLoader } from '@/chapters/Prologue/PrologueLoader';
import { renderHomeSpread } from '@/chapters/Home/HomeChapter';
import { renderIntroSpread } from '@/chapters/Introduction/IntroChapter';
import { renderEducationSpread } from '@/chapters/Education/EducationChapter';
import { renderCertificatesSpread } from '@/chapters/Certificates/CertificatesChapter';
import { renderExperienceSpread } from '@/chapters/Experience/ExperienceChapter';
import { renderTechnologySpread } from '@/chapters/Technology/TechnologyChapter';
import { renderProjectsSpread } from '@/chapters/Projects/ProjectsChapter';
import { renderAchievementsSpread } from '@/chapters/Achievements/AchievementsChapter';
import { renderServicesSpread } from '@/chapters/Services/ServicesChapter';
import { renderJournalSpread } from '@/chapters/Journal/JournalChapter';
import { renderPerspectivesSpread } from '@/chapters/Perspectives/PerspectivesChapter';
import { renderNextChapterSpread } from '@/chapters/NextChapter/NextChapter';
import { renderContactSpread } from '@/chapters/Contact/ContactChapter';
import { AurevonCompanionWidget } from '@/components/ai/AurevonCompanionWidget';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

const PROLOGUE_SEEN_KEY = 'making_of_abdurrahman_prologue_seen_session';

const BookReaderRoute: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [showPrologue, setShowPrologue] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem(PROLOGUE_SEEN_KEY);
    } catch {
      return false;
    }
  });

  const [isIndexOpen, setIsIndexOpen] = useState(false);

  const validSlug: ChapterSlug =
    slug && slug in CHAPTER_MAP ? (slug as ChapterSlug) : 'home';

  const currentMeta = getChapterBySlug(validSlug);

  // Update document title dynamically per chapter for SEO & browser history clarity
  useEffect(() => {
    document.title = `Ch. ${currentMeta.number}: ${currentMeta.title} — THE MAKING OF ABDURRAHMAN`;
  }, [currentMeta]);

  const handleSelectChapter = (targetSlug: ChapterSlug) => {
    navigate(`/chapter/${targetSlug}`);
  };

  const handleCompletePrologue = () => {
    try {
      sessionStorage.setItem(PROLOGUE_SEEN_KEY, 'true');
    } catch {
      // Ignore
    }
    setShowPrologue(false);
  };

  // Call all chapter spread hooks / renderers cleanly
  const homeSpread = renderHomeSpread({
    onSelectChapter: handleSelectChapter,
    onOpenIndex: () => setIsIndexOpen(true),
  });
  const introSpread = renderIntroSpread(handleSelectChapter);
  const educationSpread = renderEducationSpread();
  const certificatesSpread = renderCertificatesSpread();
  const experienceSpread = renderExperienceSpread();
  const technologySpread = renderTechnologySpread();
  const projectsSpread = renderProjectsSpread();
  const achievementsSpread = renderAchievementsSpread();
  const servicesSpread = renderServicesSpread(handleSelectChapter);
  const journalSpread = renderJournalSpread();
  const perspectivesSpread = renderPerspectivesSpread(handleSelectChapter);
  const nextChapterSpread = renderNextChapterSpread(handleSelectChapter);
  const contactSpread = renderContactSpread();

  const renderSpreadContent = (chapterSlug: ChapterSlug) => {
    switch (chapterSlug) {
      case 'home':
        return homeSpread;
      case 'intro':
        return introSpread;
      case 'education':
        return educationSpread;
      case 'certificates':
        return certificatesSpread;
      case 'experience':
        return experienceSpread;
      case 'skills':
        return technologySpread;
      case 'projects':
        return projectsSpread;
      case 'achievements':
        return achievementsSpread;
      case 'services':
        return servicesSpread;
      case 'journal':
        return journalSpread;
      case 'perspectives':
        return perspectivesSpread;
      case 'next-chapter':
        return nextChapterSpread;
      case 'contact':
        return contactSpread;
      default:
        return homeSpread;
    }
  };

  // If invalid chapter slug was requested in URL, redirect to /chapter/home
  if (slug && !(slug in CHAPTER_MAP)) {
    return <Navigate to="/chapter/home" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <AnimatePresence>
        {showPrologue && (
          <PrologueLoader onComplete={handleCompletePrologue} />
        )}
      </AnimatePresence>

      <BookHeader
        activeChapter={validSlug}
        onSelectChapter={handleSelectChapter}
        onOpenChapterIndex={() => setIsIndexOpen(true)}
      />

      <DigitalBookEngine
        activeChapter={validSlug}
        onSelectChapter={handleSelectChapter}
        isIndexOpen={isIndexOpen}
        onCloseIndex={() => setIsIndexOpen(false)}
        renderSpreadContent={renderSpreadContent}
      />

      <BookFooter
        activeChapter={validSlug}
        onSelectChapter={handleSelectChapter}
      />

      <AurevonCompanionWidget />
    </div>
  );
};

const Custom404Page: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-4 text-center text-ink">
      <div className="paper-texture max-w-md rounded-2xl border border-rule-strong bg-page p-8 shadow-book">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          Erratum • Page Not Found (404)
        </span>
        <h1 className="mt-2 font-serif text-3xl font-bold text-ink">
          Unnumbered Folio Leaf
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
          The page or chapter URL you requested does not exist in this edition of{' '}
          <em>THE MAKING OF ABDURRAHMAN</em>.
        </p>
        <Link
          to="/chapter/home"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-page hover:bg-accent-strong"
        >
          <BookOpen className="h-4 w-4" />
          <span>Return to Chapter 01: Home</span>
        </Link>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/chapter/home" replace />} />
            <Route path="/chapter/:slug" element={<BookReaderRoute />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Custom404Page />} />
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </ThemeProvider>
  );
};

export default App;
