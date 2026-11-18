-- ============================================================================
-- THE MAKING OF ABDURRAHMAN — Supabase PostgreSQL Schema & Row Level Security
-- Migration: 001_initial_schema.sql
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(120) NOT NULL,
    headline VARCHAR(220) NOT NULL,
    tagline TEXT,
    quote TEXT NOT NULL,
    closing_quote TEXT NOT NULL,
    short_bio TEXT NOT NULL,
    extended_bio TEXT,
    location VARCHAR(150),
    email VARCHAR(160) NOT NULL,
    github_url VARCHAR(255) NOT NULL,
    linkedin_url VARCHAR(255) NOT NULL,
    cv_url VARCHAR(255) NOT NULL,
    avatar_model_url VARCHAR(255),
    avatar_fallback_url VARCHAR(255),
    typing_phrases JSONB DEFAULT '[]'::jsonb,
    languages JSONB DEFAULT '[]'::jsonb,
    soft_skills JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year VARCHAR(40) NOT NULL,
    qualification VARCHAR(180) NOT NULL,
    institution VARCHAR(200) NOT NULL,
    location VARCHAR(120),
    status VARCHAR(40) NOT NULL DEFAULT 'Completed',
    results_summary TEXT NOT NULL,
    verified_results BOOLEAN NOT NULL DEFAULT TRUE,
    description TEXT NOT NULL,
    highlights JSONB DEFAULT '[]'::jsonb,
    supporting_image_url VARCHAR(255),
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_education_order ON public.education(display_order);

-- 3. CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    issuing_institution VARCHAR(200) NOT NULL,
    issue_date VARCHAR(60) NOT NULL,
    status VARCHAR(40) NOT NULL DEFAULT 'Verified',
    credential_id VARCHAR(120),
    verification_url VARCHAR(255),
    certificate_image_url VARCHAR(255),
    description TEXT NOT NULL,
    skills_covered JSONB DEFAULT '[]'::jsonb,
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_certifications_order ON public.certifications(display_order);

-- 4. EXPERIENCE TABLE
CREATE TABLE IF NOT EXISTS public.experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    position VARCHAR(180) NOT NULL,
    organization VARCHAR(180) NOT NULL,
    employment_type VARCHAR(80),
    date_range VARCHAR(80) NOT NULL,
    is_current BOOLEAN NOT NULL DEFAULT TRUE,
    category VARCHAR(80) NOT NULL DEFAULT 'Teaching & Mentorship',
    summary TEXT NOT NULL,
    responsibilities JSONB DEFAULT '[]'::jsonb,
    measurable_contributions JSONB DEFAULT '[]'::jsonb,
    technologies JSONB DEFAULT '[]'::jsonb,
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_experience_order ON public.experience(display_order);

-- 5. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    proficiency_label VARCHAR(80) NOT NULL DEFAULT 'Core Stack',
    description TEXT NOT NULL,
    verified_projects JSONB DEFAULT '[]'::jsonb,
    icon_key VARCHAR(60) DEFAULT 'Code2',
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_skills_category ON public.skills(category);

-- 6. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(140) UNIQUE NOT NULL,
    title VARCHAR(180) NOT NULL,
    subtitle VARCHAR(240),
    short_description TEXT NOT NULL,
    overview TEXT NOT NULL,
    problem_statement TEXT,
    proposed_solution TEXT,
    key_features JSONB DEFAULT '[]'::jsonb,
    architecture_summary TEXT,
    development_challenges TEXT,
    category VARCHAR(80) NOT NULL,
    status VARCHAR(40) NOT NULL DEFAULT 'Completed',
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    featured_order INTEGER NOT NULL DEFAULT 99,
    technologies JSONB DEFAULT '[]'::jsonb,
    cover_image_url VARCHAR(255),
    github_url VARCHAR(255),
    live_demo_url VARCHAR(255),
    year VARCHAR(40),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(is_featured, featured_order);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);

-- 7. PROJECT_IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON public.project_images(project_id);

-- 8. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_value INTEGER NOT NULL,
    metric_suffix VARCHAR(16) DEFAULT '+',
    label VARCHAR(120) NOT NULL,
    sublabel VARCHAR(220),
    verification_note TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(160) NOT NULL,
    description TEXT NOT NULL,
    relevant_technologies JSONB DEFAULT '[]'::jsonb,
    example_project_title VARCHAR(160),
    example_project_slug VARCHAR(140),
    deliverables JSONB DEFAULT '[]'::jsonb,
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. BLOG_POSTS TABLE
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(180) UNIQUE NOT NULL,
    title VARCHAR(240) NOT NULL,
    category VARCHAR(80) NOT NULL,
    publication_date VARCHAR(60) NOT NULL,
    reading_time VARCHAR(40) NOT NULL,
    short_introduction TEXT NOT NULL,
    content_sections JSONB NOT NULL DEFAULT '[]'::jsonb,
    related_project VARCHAR(140),
    cover_image_url VARCHAR(255),
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(is_published);

-- 11. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    person_name VARCHAR(140) NOT NULL,
    role_or_relationship VARCHAR(180) NOT NULL,
    organization VARCHAR(180),
    testimonial_text TEXT NOT NULL,
    photograph_url VARCHAR(255),
    is_approved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON public.testimonials(is_approved);

-- 12. CONTACT_MESSAGES TABLE (Private Admin Data)
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(120) NOT NULL,
    email VARCHAR(160) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    ip_hash VARCHAR(64),
    delivered_via VARCHAR(40) NOT NULL DEFAULT 'database_logged',
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON public.contact_messages(created_at DESC);

-- 13. AI_CONVERSATIONS TABLE (Optional Consented Session Audit)
CREATE TABLE IF NOT EXISTS public.ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_key VARCHAR(64) NOT NULL,
    mode VARCHAR(32) NOT NULL DEFAULT 'portfolio',
    user_query TEXT NOT NULL,
    assistant_reply TEXT NOT NULL,
    model_used VARCHAR(80),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Public read-only access for verified portfolio content.
-- Strictly no public access to contact_messages or ai_conversations.
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public read education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public read certifications" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Public read experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read project_images" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Public read achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public read published blog_posts" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public read approved testimonials" ON public.testimonials FOR SELECT USING (is_approved = true);
