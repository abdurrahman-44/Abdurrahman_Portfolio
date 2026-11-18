export type ChapterSlug =
  | 'home'
  | 'intro'
  | 'education'
  | 'certificates'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'achievements'
  | 'services'
  | 'journal'
  | 'perspectives'
  | 'next-chapter'
  | 'contact';

export interface ChapterMeta {
  id: ChapterSlug;
  number: string;
  roman: string;
  title: string;
  navLabel: string;
  subtitle: string;
  epigraph: string;
  path: string;
  showInHeader: boolean;
  spreadLeftTitle: string;
  spreadRightTitle: string;
}

export interface ProfileData {
  id: string;
  full_name: string;
  headline: string;
  tagline: string;
  quote: string;
  closing_quote: string;
  short_bio: string;
  extended_bio: string;
  location: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  cv_url: string;
  avatar_model_url: string;
  avatar_fallback_url: string;
  typing_phrases: string[];
  languages: {
    name: string;
    proficiency: string;
    native_script?: string;
  }[];
  soft_skills: {
    id: string;
    title: string;
    description: string;
    principle: string;
  }[];
}

export interface EducationMilestone {
  id: string;
  year: string;
  qualification: string;
  institution: string;
  location: string;
  status: 'Completed' | 'Ongoing' | 'Pending Verification';
  results_summary: string;
  verified_results: boolean;
  description: string;
  highlights: string[];
  supporting_image_url?: string;
  display_order: number;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuing_institution: string;
  issue_date: string;
  status: 'Verified' | 'Pending Proof';
  credential_id?: string;
  verification_url?: string;
  certificate_image_url?: string;
  description: string;
  skills_covered: string[];
  display_order: number;
}

export interface ExperienceItem {
  id: string;
  position: string;
  organization: string;
  employment_type: string;
  date_range: string;
  is_current: boolean;
  category: 'Teaching & Mentorship' | 'Leadership & Coordination';
  summary: string;
  responsibilities: string[];
  measurable_contributions: string[];
  technologies: string[];
  display_order: number;
}

export type SkillCategory =
  | 'Programming Languages'
  | 'Frontend Development'
  | 'Backend Development'
  | 'Artificial Intelligence & Machine Learning'
  | 'Databases'
  | 'Development Tools'
  | 'Frameworks & Libraries';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency_label: 'Core Stack' | 'Active Practice' | 'Research & Exploration';
  description: string;
  verified_projects: string[];
  icon_key: string;
  display_order: number;
}

export type ProjectCategory =
  | 'Artificial Intelligence'
  | 'Machine Learning'
  | 'Web Development'
  | 'Software Development'
  | 'Research';

export type ProjectStatus = 'Completed' | 'Ongoing' | 'Research Prototype';

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  short_description: string;
  overview: string;
  problem_statement: string;
  proposed_solution: string;
  key_features: string[];
  architecture_summary: string;
  development_challenges: string;
  category: ProjectCategory;
  status: ProjectStatus;
  is_featured: boolean;
  featured_order: number;
  technologies: string[];
  cover_image_url?: string;
  screenshots: { url: string; caption: string }[];
  github_url?: string;
  live_demo_url?: string;
  year: string;
}

export interface AchievementStat {
  id: string;
  metric_value: number;
  metric_suffix: string;
  label: string;
  sublabel: string;
  verification_note: string;
  is_verified: boolean;
  display_order: number;
}

export interface ServiceCapability {
  id: string;
  title: string;
  description: string;
  relevant_technologies: string[];
  example_project_title: string;
  example_project_slug: string;
  deliverables: string[];
  display_order: number;
}

export type JournalCategory =
  | 'Artificial Intelligence'
  | 'Machine Learning'
  | 'Software Development'
  | 'Project Development'
  | 'Learning Experiences'
  | 'Technical Challenges';

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  category: JournalCategory;
  publication_date: string;
  reading_time: string;
  short_introduction: string;
  content_sections: {
    heading: string;
    body: string;
    code_snippet?: {
      language: string;
      code: string;
    };
  }[];
  related_project?: string;
  is_published: boolean;
  cover_image_url?: string;
}

export interface TestimonialItem {
  id: string;
  person_name: string;
  role_or_relationship: string;
  organization?: string;
  testimonial_text: string;
  photograph_url?: string;
  is_approved: boolean;
  is_placeholder?: boolean;
}

export interface NextChapterVision {
  ai_research_interests: { title: string; detail: string }[];
  ml_interests: { title: string; detail: string }[];
  technologies_exploring: { name: string; focus: string }[];
  professional_goals: string[];
  future_project_ideas: { title: string; concept: string }[];
  long_term_direction: string;
}

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface AurevonChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  mode: 'portfolio' | 'general';
  timestamp: string;
  sources?: string[];
  provider?: string;
}

export interface PortfolioBundle {
  profile: ProfileData;
  education: EducationMilestone[];
  certifications: CertificationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  achievements: AchievementStat[];
  services: ServiceCapability[];
  journal: BlogPostItem[];
  testimonials: TestimonialItem[];
  next_chapter: NextChapterVision;
}
