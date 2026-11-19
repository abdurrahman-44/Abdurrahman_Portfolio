import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  PortfolioBundle,
  ProjectItem,
  CertificationItem,
  EducationMilestone,
  ExperienceItem,
  SkillItem,
  BlogPostItem,
  TestimonialItem,
  ProfileData,
} from '@/types/portfolio';
import { INITIAL_PORTFOLIO_DATA } from '@/data/verifiedPortfolioData';
import { fetchPortfolioBundle } from '@/services/api';

interface PortfolioContextValue {
  data: PortfolioBundle;
  isLoading: boolean;
  backendConnected: boolean;
  aurevonStatus: 'online' | 'local-ready' | 'standby';
  refreshData: () => Promise<void>;
  updateProfileLocal: (profile: Partial<ProfileData>) => void;
  upsertProjectLocal: (project: ProjectItem) => void;
  deleteProjectLocal: (id: string) => void;
  upsertCertificateLocal: (cert: CertificationItem) => void;
  upsertEducationLocal: (edu: EducationMilestone) => void;
  upsertExperienceLocal: (exp: ExperienceItem) => void;
  upsertSkillLocal: (skill: SkillItem) => void;
  upsertBlogPostLocal: (post: BlogPostItem) => void;
  upsertTestimonialLocal: (testimonial: TestimonialItem) => void;
  selectedProjectForModal: ProjectItem | null;
  setSelectedProjectForModal: (project: ProjectItem | null) => void;
  isAurevonOpen: boolean;
  setIsAurevonOpen: (open: boolean) => void;
  askAurevonPrompt: (prompt: string, mode?: 'portfolio' | 'general') => void;
  pendingAurevonPrompt: { prompt: string; mode: 'portfolio' | 'general' } | null;
  clearPendingAurevonPrompt: () => void;
}

const PortfolioContext = createContext<PortfolioContextValue | undefined>(undefined);

const LOCAL_OVERRIDE_KEY = 'making_of_abdurrahman_cms_data_v2';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioBundle>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_OVERRIDE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_PORTFOLIO_DATA, ...parsed };
      }
    } catch {
      // Fallback to verified seed data
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [backendConnected, setBackendConnected] = useState<boolean>(false);
  const [aurevonStatus, setAurevonStatus] = useState<'online' | 'local-ready' | 'standby'>('local-ready');
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ProjectItem | null>(null);
  const [isAurevonOpen, setIsAurevonOpen] = useState<boolean>(false);
  const [pendingAurevonPrompt, setPendingAurevonPrompt] = useState<{
    prompt: string;
    mode: 'portfolio' | 'general';
  } | null>(null);

  const persistLocal = (next: PortfolioBundle) => {
    setData(next);
    try {
      localStorage.setItem(LOCAL_OVERRIDE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage quota errors
    }
  };

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      const remote = await fetchPortfolioBundle();
      if (remote && remote.bundle) {
        setData((prev) => ({
          ...INITIAL_PORTFOLIO_DATA,
          ...prev,
          ...remote.bundle,
          profile: { ...INITIAL_PORTFOLIO_DATA.profile, ...(remote.bundle.profile || {}) },
          education: remote.bundle.education?.length ? remote.bundle.education : prev.education,
          certifications: remote.bundle.certifications?.length ? remote.bundle.certifications : prev.certifications,
          experience: remote.bundle.experience?.length ? remote.bundle.experience : prev.experience,
          skills: remote.bundle.skills?.length ? remote.bundle.skills : prev.skills,
          projects: remote.bundle.projects?.length ? remote.bundle.projects : prev.projects,
          achievements: remote.bundle.achievements?.length ? remote.bundle.achievements : prev.achievements,
          services: remote.bundle.services?.length ? remote.bundle.services : prev.services,
          journal: remote.bundle.journal?.length ? remote.bundle.journal : prev.journal,
          testimonials: remote.bundle.testimonials || prev.testimonials || [],
          next_chapter: remote.bundle.next_chapter || prev.next_chapter || INITIAL_PORTFOLIO_DATA.next_chapter,
        }));
        setBackendConnected(true);
        setAurevonStatus(remote.aurevon_online ? 'online' : 'local-ready');
      }
    } catch {
      setBackendConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const updateProfileLocal = (profileUpdate: Partial<ProfileData>) => {
    persistLocal({
      ...data,
      profile: { ...data.profile, ...profileUpdate },
    });
  };

  const upsertProjectLocal = (project: ProjectItem) => {
    const exists = data.projects.some((p) => p.id === project.id);
    const updated = exists
      ? data.projects.map((p) => (p.id === project.id ? project : p))
      : [project, ...data.projects];
    persistLocal({ ...data, projects: updated });
  };

  const deleteProjectLocal = (id: string) => {
    persistLocal({
      ...data,
      projects: data.projects.filter((p) => p.id !== id),
    });
  };

  const upsertCertificateLocal = (cert: CertificationItem) => {
    const exists = data.certifications.some((c) => c.id === cert.id);
    const updated = exists
      ? data.certifications.map((c) => (c.id === cert.id ? cert : c))
      : [...data.certifications, cert];
    persistLocal({ ...data, certifications: updated });
  };

  const upsertEducationLocal = (edu: EducationMilestone) => {
    const exists = data.education.some((e) => e.id === edu.id);
    const updated = exists
      ? data.education.map((e) => (e.id === edu.id ? edu : e))
      : [...data.education, edu];
    persistLocal({ ...data, education: updated });
  };

  const upsertExperienceLocal = (exp: ExperienceItem) => {
    const exists = data.experience.some((e) => e.id === exp.id);
    const updated = exists
      ? data.experience.map((e) => (e.id === exp.id ? exp : e))
      : [...data.experience, exp];
    persistLocal({ ...data, experience: updated });
  };

  const upsertSkillLocal = (skill: SkillItem) => {
    const exists = data.skills.some((s) => s.id === skill.id);
    const updated = exists
      ? data.skills.map((s) => (s.id === skill.id ? skill : s))
      : [...data.skills, skill];
    persistLocal({ ...data, skills: updated });
  };

  const upsertBlogPostLocal = (post: BlogPostItem) => {
    const exists = data.journal.some((b) => b.id === post.id);
    const updated = exists
      ? data.journal.map((b) => (b.id === post.id ? post : b))
      : [post, ...data.journal];
    persistLocal({ ...data, journal: updated });
  };

  const upsertTestimonialLocal = (testimonial: TestimonialItem) => {
    const exists = data.testimonials.some((t) => t.id === testimonial.id);
    const updated = exists
      ? data.testimonials.map((t) => (t.id === testimonial.id ? testimonial : t))
      : [...data.testimonials, testimonial];
    persistLocal({ ...data, testimonials: updated });
  };

  const askAurevonPrompt = (prompt: string, mode: 'portfolio' | 'general' = 'portfolio') => {
    setPendingAurevonPrompt({ prompt, mode });
    setIsAurevonOpen(true);
  };

  const clearPendingAurevonPrompt = () => {
    setPendingAurevonPrompt(null);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isLoading,
        backendConnected,
        aurevonStatus,
        refreshData,
        updateProfileLocal,
        upsertProjectLocal,
        deleteProjectLocal,
        upsertCertificateLocal,
        upsertEducationLocal,
        upsertExperienceLocal,
        upsertSkillLocal,
        upsertBlogPostLocal,
        upsertTestimonialLocal,
        selectedProjectForModal,
        setSelectedProjectForModal,
        isAurevonOpen,
        setIsAurevonOpen,
        askAurevonPrompt,
        pendingAurevonPrompt,
        clearPendingAurevonPrompt,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export function usePortfolio(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return ctx;
}
