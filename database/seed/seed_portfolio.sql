-- ============================================================================
-- THE MAKING OF ABDURRAHMAN — Verified Seed Data for Supabase PostgreSQL
-- Seed: seed_portfolio.sql
-- ============================================================================

INSERT INTO public.profiles (
    full_name,
    headline,
    tagline,
    quote,
    closing_quote,
    short_bio,
    extended_bio,
    location,
    email,
    github_url,
    linkedin_url,
    cv_url,
    avatar_model_url,
    avatar_fallback_url,
    typing_phrases,
    languages,
    soft_skills
) VALUES (
    'Abdurrahman Zarook',
    'Artificial Intelligence Undergraduate | Developer | Technology Enthusiast',
    'Building intelligent software, privacy-conscious AI systems, and human-centered applications.',
    'Every great journey begins with curiosity, but it is built through the courage to create.',
    'Thank you for taking the time to explore my journey. Every chapter is still being written.',
    'I am an Artificial Intelligence undergraduate at NSBM Green University with a Diploma in Software Engineering from NIBM Kandy Campus. My work spans local-first multimodal AI systems, federated machine learning research, and full-stack software engineering.',
    'Driven by a disciplined curiosity for how mathematical foundations translate into working software, I focus on building practical systems that respect user privacy and solve tangible problems.',
    'Mawanella / Kandy / Colombo, Sri Lanka',
    'abdurrahmanzarook4455@gmail.com',
    'https://github.com/abdurrahman-44',
    'https://www.linkedin.com/in/abdurrahman-zarook-11525b3a2/',
    '/assets/cv/Abdurrahman-Zarook-CV.pdf',
    '/assets/models/abdurrahman-avatar.glb',
    '/assets/images/abdurrahman-portrait.png',
    '["Artificial Intelligence Enthusiast", "Software Developer", "Machine Learning Explorer", "Technology Creator"]'::jsonb,
    '[{"name": "English", "proficiency": "Fluent"}, {"name": "Tamil", "proficiency": "Native"}, {"name": "Sinhala", "proficiency": "Fluent"}]'::jsonb,
    '[{"id": "soft-leadership", "title": "Leadership", "description": "Coordinating university software and research teams.", "principle": "Lead through clarity and shared ownership."}, {"id": "soft-communication", "title": "Communication", "description": "Translating mathematical and algorithmic concepts clearly.", "principle": "Clarity of thought precedes clarity of code."}, {"id": "soft-problem-solving", "title": "Problem-Solving", "description": "Decomposing complex challenges into testable components.", "principle": "First principles over guesswork."}, {"id": "soft-collaboration", "title": "Team Collaboration", "description": "Working across frontend, backend, and research roles.", "principle": "Great systems are built in dialogue."}]'::jsonb
);

INSERT INTO public.education (year, qualification, institution, location, status, results_summary, verified_results, description, display_order)
VALUES
('2021 (2022)', 'G.C.E. Ordinary Level (O/L)', 'Zahira National College, Mawanella', 'Mawanella, Sri Lanka', 'Completed', 'Verified Results: 6A and 3B passes', true, 'Built a strong academic foundation in Mathematics, Science, and ICT.', 1),
('2024', 'G.C.E. Advanced Level (A/L)', 'Zahira National College, Mawanella', 'Mawanella, Sri Lanka', 'Completed', 'Completed Upper-Secondary Collegiate Examination Cycle', true, 'Completed G.C.E. Advanced Level studies prior to Software Engineering and AI degree progression.', 2),
('2025', 'Diploma in Software Engineering', 'NIBM, Kandy Campus', 'Kandy, Sri Lanka', 'Completed', 'Completed Diploma Programme in Software Engineering', true, 'Formal training in OOP, relational databases, and desktop/web application engineering.', 3),
('2026 – Present', 'BSc (Hons) Artificial Intelligence', 'NSBM Green University', 'Homagama, Sri Lanka', 'Ongoing', 'Current Undergraduate Degree Programme', true, 'Honours undergraduate degree specializing in Artificial Intelligence and Machine Learning.', 4);

INSERT INTO public.certifications (title, issuing_institution, issue_date, status, description, display_order)
VALUES
('NSBM Advanced Certificate for Computing', 'NSBM Green University', '2025 / 2026', 'Verified', 'Academic credential validating foundational proficiency in computing principles and programming logic.', 1),
('Diploma in Software Engineering', 'National Institute of Business Management (NIBM), Kandy Campus', '2025', 'Verified', 'Professional qualification in object-oriented software construction, relational database engineering, and full-stack web systems.', 2);

INSERT INTO public.experience (position, organization, employment_type, date_range, is_current, category, summary, display_order)
VALUES
('Mathematics Tutor', 'Independent Academic Mentorship', 'Part-Time', 'March 2025 – Present', true, 'Teaching & Mentorship', 'O/L mathematics teaching, student guidance, and learning support.', 1),
('IT Tutor', 'Independent Technical Mentorship', 'Part-Time', 'December 2025 – Present', true, 'Teaching & Mentorship', 'IT education, technical guidance, and supporting learners.', 2);
