import { ChapterMeta, ChapterSlug } from '@/types/portfolio';

export const CHAPTERS: ChapterMeta[] = [
  {
    id: 'home',
    number: '01',
    roman: 'I',
    title: 'The Frontispiece',
    navLabel: 'Home',
    subtitle: 'Curiosity, Courage & Intelligent Creation',
    epigraph:
      'Every great journey begins with curiosity, but it is built through the courage to create.',
    path: '/chapter/home',
    showInHeader: true,
    spreadLeftTitle: 'Frontispiece & Dedication',
    spreadRightTitle: 'Executive Index & Companion',
  },
  {
    id: 'intro',
    number: '02',
    roman: 'II',
    title: 'The Person Behind the Code',
    navLabel: 'Intro',
    subtitle: 'Interactive 3D Portrait & Personal Ethos',
    epigraph:
      'Behind every algorithm and interface is a human commitment to clarity, discipline, and empathy.',
    path: '/chapter/intro',
    showInHeader: true,
    spreadLeftTitle: 'Interactive 3D Portrait Stage',
    spreadRightTitle: 'Biography, Languages & Core Pillars',
  },
  {
    id: 'education',
    number: '03',
    roman: 'III',
    title: 'Education Journey',
    navLabel: 'Education',
    subtitle: 'An Interactive Tree of Academic Foundations',
    epigraph:
      'Strong roots in mathematics and software engineering nourish every branch of artificial intelligence.',
    path: '/chapter/education',
    showInHeader: true,
    spreadLeftTitle: 'Interactive Academic Growth Tree',
    spreadRightTitle: 'Milestone Dossier & Verified Records',
  },
  {
    id: 'certificates',
    number: '04',
    roman: 'IV',
    title: 'Certifications',
    navLabel: 'Certificates',
    subtitle: 'Verified Academic & Technical Credentials',
    epigraph:
      'Formal milestones that validate rigorous foundational study.',
    path: '/chapter/certificates',
    showInHeader: true,
    spreadLeftTitle: 'Verified Credential Showcase',
    spreadRightTitle: 'Credential Inspection & Registry',
  },
  {
    id: 'experience',
    number: '05',
    roman: 'V',
    title: 'Experience',
    navLabel: 'Experience',
    subtitle: 'Teaching, Technical Mentorship & Project Leadership',
    epigraph:
      'To teach a concept clearly is to understand it deeply.',
    path: '/chapter/experience',
    showInHeader: true,
    spreadLeftTitle: 'Professional Timeline',
    spreadRightTitle: 'Responsibilities & Impact',
  },
  {
    id: 'skills',
    number: '06',
    roman: 'VI',
    title: 'Technology Arsenal',
    navLabel: 'Skills',
    subtitle: 'Languages, Frameworks & AI/ML Ecosystem',
    epigraph:
      'Tools chosen not for trend, but for reliability, expressiveness, and engineering precision.',
    path: '/chapter/skills',
    showInHeader: true,
    spreadLeftTitle: 'Ecosystem Architecture & Filters',
    spreadRightTitle: 'Verified Technology Matrix',
  },
  {
    id: 'projects',
    number: '07',
    roman: 'VII',
    title: 'Selected Works & Archive',
    navLabel: 'Projects',
    subtitle: 'Featured Systems, AI Platforms & Engineering Archive',
    epigraph:
      'Theory becomes meaningful the moment it compiles into a system that serves real people.',
    path: '/chapter/projects',
    showInHeader: true,
    spreadLeftTitle: 'Featured Works & Category Index',
    spreadRightTitle: 'Project Architecture & Archive',
  },
  {
    id: 'achievements',
    number: '08',
    roman: 'VIII',
    title: 'Achievements & Milestones',
    navLabel: 'Achievements',
    subtitle: 'Quantified Progress & Verified Benchmarks',
    epigraph:
      'Measured not by applause, but by problems solved and systems shipped.',
    path: '/chapter/achievements',
    showInHeader: true,
    spreadLeftTitle: 'Verified Quantitative Metrics',
    spreadRightTitle: 'Key Engineering Milestones',
  },
  {
    id: 'services',
    number: '09',
    roman: 'IX',
    title: 'Services & Capabilities',
    navLabel: 'Services',
    subtitle: 'Areas of Technical Contribution & Collaboration',
    epigraph:
      'Honest engineering capabilities grounded in hands-on project execution.',
    path: '/chapter/services',
    showInHeader: true,
    spreadLeftTitle: 'Core Technical Capabilities',
    spreadRightTitle: 'Applied Workflows & Collaboration',
  },
  {
    id: 'journal',
    number: '10',
    roman: 'X',
    title: 'Technical & Personal Journal',
    navLabel: 'Journal',
    subtitle: 'Field Notes from AI Research & Software Engineering',
    epigraph:
      'Writing is how engineering experience crystallizes into lasting insight.',
    path: '/chapter/journal',
    showInHeader: true,
    spreadLeftTitle: 'Editorial Index & Essays',
    spreadRightTitle: 'Complete Article Reader',
  },
  {
    id: 'perspectives',
    number: '11',
    roman: 'XI',
    title: 'Perspectives',
    navLabel: 'Perspectives',
    subtitle: 'Endorsements & Collaborative Reflections',
    epigraph:
      'Trust is earned one mentored student and one delivered repository at a time.',
    path: '/chapter/perspectives',
    showInHeader: false,
    spreadLeftTitle: 'Editorial Endorsements',
    spreadRightTitle: 'Verification & Submission Policy',
  },
  {
    id: 'next-chapter',
    number: '12',
    roman: 'XII',
    title: 'The Next Chapter',
    navLabel: 'Next Chapter',
    subtitle: 'Ongoing Research, Federated Learning & Future Horizon',
    epigraph:
      'Every chapter is a reflection of what I have learned. Every next page is an opportunity to build something greater.',
    path: '/chapter/next-chapter',
    showInHeader: false,
    spreadLeftTitle: 'AI & Machine Learning Horizon',
    spreadRightTitle: 'Unfinished Pages & Research Roadmap',
  },
  {
    id: 'contact',
    number: '13',
    roman: 'XIII',
    title: 'Colophon & Correspondence',
    navLabel: 'Contact',
    subtitle: 'Direct Channels & Verified Dispatch',
    epigraph:
      'Thank you for taking the time to explore my journey. Every chapter is still being written.',
    path: '/chapter/contact',
    showInHeader: true,
    spreadLeftTitle: 'Direct Correspondence Channels',
    spreadRightTitle: 'Send a Dispatch',
  },
];

export const CHAPTER_MAP: Record<ChapterSlug, ChapterMeta> = CHAPTERS.reduce(
  (acc, chapter) => {
    acc[chapter.id] = chapter;
    return acc;
  },
  {} as Record<ChapterSlug, ChapterMeta>
);

export function getChapterBySlug(slug?: string): ChapterMeta {
  if (!slug) return CHAPTER_MAP.home;
  const normalized = slug.toLowerCase() as ChapterSlug;
  return CHAPTER_MAP[normalized] || CHAPTER_MAP.home;
}

export function getChapterIndex(slug: ChapterSlug): number {
  return CHAPTERS.findIndex((c) => c.id === slug);
}
