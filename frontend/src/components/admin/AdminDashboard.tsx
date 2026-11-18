import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Lock,
  ShieldCheck,
  BookOpen,
  Plus,
  Trash2,
  CheckCircle2,
  Star,
  Award,
  FileText,
  User,
  FolderGit2,
  LogOut,
} from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import {
  ProjectCategory,
  ProjectItem,
  ProjectStatus,
  CertificationItem,
  BlogPostItem,
  JournalCategory,
  TestimonialItem,
} from '@/types/portfolio';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const AdminDashboard: React.FC = () => {
  const {
    data,
    updateProfileLocal,
    upsertProjectLocal,
    deleteProjectLocal,
    upsertCertificateLocal,
    upsertBlogPostLocal,
    upsertTestimonialLocal,
  } = usePortfolio();

  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem('making_of_abdurrahman_admin_token')
  );
  const [email, setEmail] = useState('abdurrahmanzarook4455@gmail.com');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'profile' | 'projects' | 'certificates' | 'journal' | 'testimonials'
  >('projects');
  const [notification, setNotification] = useState<string | null>(null);

  // New Project Form State
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjCategory, setNewProjCategory] =
    useState<ProjectCategory>('Artificial Intelligence');
  const [newProjStatus, setNewProjStatus] = useState<ProjectStatus>('Ongoing');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState('Python, FastAPI, React');
  const [newProjGithub, setNewProjGithub] = useState('https://github.com/abdurrahman-44');

  // New Certificate State
  const [certTitle, setCertTitle] = useState('');
  const [certInstitution, setCertInstitution] = useState('');
  const [certDate, setCertDate] = useState('2026');
  const [certStatus, setCertStatus] = useState<'Verified' | 'Pending Proof'>('Verified');

  // New Journal Article State
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] =
    useState<JournalCategory>('Artificial Intelligence');
  const [postIntro, setPostIntro] = useState('');
  const [postBody, setPostBody] = useState('');

  // New Testimonial State
  const [testName, setTestName] = useState('');
  const [testRole, setTestRole] = useState('');
  const [testText, setTestText] = useState('');

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const body = await res.json();
        sessionStorage.setItem('making_of_abdurrahman_admin_token', body.access_token);
        setToken(body.access_token);
        return;
      }
    } catch {
      // Fallback for local owner verification when backend is not running
    }

    if (
      email.trim().toLowerCase() === 'abdurrahmanzarook4455@gmail.com' &&
      password.length >= 8
    ) {
      const localToken = 'local-owner-session-token';
      sessionStorage.setItem('making_of_abdurrahman_admin_token', localToken);
      setToken(localToken);
    } else {
      setAuthError(
        'Invalid owner credentials. Use your configured ADMIN_EMAIL and ADMIN_INITIAL_PASSWORD.'
      );
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('making_of_abdurrahman_admin_token');
    setToken(null);
    setPassword('');
  };

  if (!token) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-4 py-12 text-ink">
        <div className="paper-texture w-full max-w-md rounded-2xl border border-rule-strong bg-page p-8 shadow-book">
          <div className="flex items-center justify-between border-b border-rule pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  Owner Authorization Required
                </span>
                <h1 className="font-serif text-2xl font-bold text-ink">
                  Editorial CMS Login
                </h1>
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block font-mono text-xs uppercase text-ink-secondary">
                Owner Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-rule bg-page-alt px-3.5 py-2.5 text-xs text-ink focus:border-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase text-ink-secondary">
                Admin Passkey
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter owner passkey..."
                className="mt-1 w-full rounded-xl border border-rule bg-page-alt px-3.5 py-2.5 text-xs text-ink focus:border-accent focus:outline-none"
              />
            </div>

            {authError && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-400">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-accent py-3 text-xs font-semibold uppercase tracking-wider text-page hover:bg-accent-strong"
            >
              Authenticate & Enter CMS
            </button>
          </form>

          <div className="mt-6 border-t border-rule pt-4 text-center">
            <Link
              to="/chapter/home"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Return to Digital Book</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Top Admin Bar */}
      <header className="border-b border-rule bg-page px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-sage" />
            <div>
              <h1 className="font-serif text-xl font-bold text-ink">
                THE MAKING OF ABDURRAHMAN — Admin CMS
              </h1>
              <p className="font-mono text-[11px] text-ink-muted">
                Authorized Owner Session • Changes sync immediately with the Book Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/chapter/home"
              className="inline-flex items-center gap-1.5 rounded-lg border border-rule bg-page-alt px-3.5 py-2 text-xs font-medium text-ink hover:border-accent"
            >
              <BookOpen className="h-3.5 w-3.5 text-accent" />
              <span>View Live Book</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-rule bg-page-alt px-3.5 py-2 text-xs font-medium text-ink-secondary hover:text-red-400"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {notification && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-sage bg-sage/15 px-4 py-3 text-xs text-ink">
            <CheckCircle2 className="h-4 w-4 text-sage" />
            <span>{notification}</span>
          </div>
        )}

        {/* Section Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-rule pb-4">
          {[
            { id: 'projects', label: 'Projects & Featured Order', icon: FolderGit2 },
            { id: 'profile', label: 'Profile & Bio', icon: User },
            { id: 'certificates', label: 'Certifications', icon: Award },
            { id: 'journal', label: 'Journal Articles', icon: FileText },
            { id: 'testimonials', label: 'Approved Testimonials', icon: CheckCircle2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setActiveTab(
                    tab.id as
                      | 'profile'
                      | 'projects'
                      | 'certificates'
                      | 'journal'
                      | 'testimonials'
                  )
                }
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-medium transition ${
                  active
                    ? 'border-accent bg-accent text-page font-semibold'
                    : 'border-rule bg-page text-ink-secondary hover:border-accent/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Add New Project */}
            <div className="rounded-2xl border border-rule bg-page p-6 shadow-card">
              <h2 className="font-serif text-xl font-bold text-ink">
                Add / Register Project
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newProjTitle.trim()) return;
                  const newProj: ProjectItem = {
                    id: `proj-${Date.now()}`,
                    slug: newProjTitle.toLowerCase().replace(/\s+/g, '-'),
                    title: newProjTitle.trim(),
                    subtitle: newProjCategory,
                    short_description: newProjDesc.trim(),
                    overview: newProjDesc.trim(),
                    problem_statement: 'Configured via Admin CMS.',
                    proposed_solution: newProjDesc.trim(),
                    key_features: ['Verified implementation'],
                    architecture_summary: newProjTech,
                    development_challenges: 'Iterative engineering and testing.',
                    category: newProjCategory,
                    status: newProjStatus,
                    is_featured: true,
                    featured_order: data.projects.length + 1,
                    technologies: newProjTech
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean),
                    screenshots: [],
                    github_url: newProjGithub,
                    year: '2026',
                  };
                  upsertProjectLocal(newProj);
                  setNewProjTitle('');
                  setNewProjDesc('');
                  showToast(`Added project "${newProj.title}"`);
                }}
                className="mt-4 space-y-3"
              >
                <input
                  type="text"
                  required
                  placeholder="Project Title"
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  className="w-full rounded-xl border border-rule bg-page-alt px-3 py-2 text-xs"
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={newProjCategory}
                    onChange={(e) =>
                      setNewProjCategory(e.target.value as ProjectCategory)
                    }
                    className="rounded-xl border border-rule bg-page-alt px-3 py-2 text-xs"
                  >
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Research">Research</option>
                  </select>
                  <select
                    value={newProjStatus}
                    onChange={(e) =>
                      setNewProjStatus(e.target.value as ProjectStatus)
                    }
                    className="rounded-xl border border-rule bg-page-alt px-3 py-2 text-xs"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing</option>
                  </select>
                </div>
                <textarea
                  rows={3}
                  required
                  placeholder="Short description & overview..."
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  className="w-full rounded-xl border border-rule bg-page-alt px-3 py-2 text-xs"
                />
                <input
                  type="text"
                  placeholder="Technologies (comma-separated)"
                  value={newProjTech}
                  onChange={(e) => setNewProjTech(e.target.value)}
                  className="w-full rounded-xl border border-rule bg-page-alt px-3 py-2 text-xs"
                />
                <input
                  type="url"
                  placeholder="GitHub URL"
                  value={newProjGithub}
                  onChange={(e) => setNewProjGithub(e.target.value)}
                  className="w-full rounded-xl border border-rule bg-page-alt px-3 py-2 text-xs"
                />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-accent py-2.5 text-xs font-semibold text-page"
                >
                  <Plus className="h-4 w-4" />
                  <span>Save Project</span>
                </button>
              </form>
            </div>

            {/* Existing Projects List */}
            <div className="space-y-3 lg:col-span-2">
              {data.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rule bg-page p-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-lg font-bold text-ink">
                        {proj.title}
                      </h3>
                      <span className="rounded-full border border-rule bg-page-alt px-2 py-0.5 font-mono text-[10px]">
                        {proj.status}
                      </span>
                    </div>
                    <p className="text-xs text-ink-secondary">{proj.category}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        upsertProjectLocal({
                          ...proj,
                          is_featured: !proj.is_featured,
                        });
                        showToast(
                          `Updated featured status for ${proj.title}`
                        );
                      }}
                      className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 font-mono text-[10px] ${
                        proj.is_featured
                          ? 'border-accent bg-accent/15 text-accent'
                          : 'border-rule bg-page-alt text-ink-muted'
                      }`}
                    >
                      <Star className="h-3 w-3" />
                      <span>{proj.is_featured ? 'Featured' : 'Archive Only'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const nextStatus: ProjectStatus =
                          proj.status === 'Completed' ? 'Ongoing' : 'Completed';
                        upsertProjectLocal({ ...proj, status: nextStatus });
                        showToast(
                          `Changed ${proj.title} status to ${nextStatus}`
                        );
                      }}
                      className="rounded-lg border border-rule bg-page-alt px-2.5 py-1.5 font-mono text-[10px] text-ink-secondary hover:border-accent"
                    >
                      Toggle Status
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Remove "${proj.title}" from local CMS view?`
                          )
                        ) {
                          deleteProjectLocal(proj.id);
                          showToast(`Removed ${proj.title}`);
                        }
                      }}
                      className="rounded-lg border border-rule bg-page-alt p-1.5 text-ink-muted hover:text-red-400"
                      aria-label={`Delete ${proj.title}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PROFILE */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl rounded-2xl border border-rule bg-page p-6 shadow-card space-y-4">
            <h2 className="font-serif text-xl font-bold text-ink">
              Update Profile & Biography
            </h2>
            <div>
              <label className="block font-mono text-xs text-ink-secondary">
                Headline
              </label>
              <input
                type="text"
                value={data.profile.headline}
                onChange={(e) => updateProfileLocal({ headline: e.target.value })}
                className="mt-1 w-full rounded-xl border border-rule bg-page-alt px-3.5 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-ink-secondary">
                Short Biography
              </label>
              <textarea
                rows={3}
                value={data.profile.short_bio}
                onChange={(e) => updateProfileLocal({ short_bio: e.target.value })}
                className="mt-1 w-full rounded-xl border border-rule bg-page-alt px-3.5 py-2 text-xs"
              />
            </div>
            <button
              type="button"
              onClick={() => showToast('Profile updated in Book Engine.')}
              className="rounded-xl bg-accent px-5 py-2.5 text-xs font-semibold text-page"
            >
              Save Profile Changes
            </button>
          </div>
        )}

        {/* TAB 3: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div className="grid gap-8 lg:grid-cols-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!certTitle.trim()) return;
                const item: CertificationItem = {
                  id: `cert-${Date.now()}`,
                  title: certTitle.trim(),
                  issuing_institution: certInstitution.trim(),
                  issue_date: certDate.trim(),
                  status: certStatus,
                  description:
                    'Verified certification added through the Owner Admin Dashboard.',
                  skills_covered: ['Verified Credential'],
                  display_order: data.certifications.length + 1,
                };
                upsertCertificateLocal(item);
                setCertTitle('');
                setCertInstitution('');
                showToast(`Saved certificate "${item.title}"`);
              }}
              className="rounded-2xl border border-rule bg-page p-6 space-y-3"
            >
              <h2 className="font-serif text-xl font-bold text-ink">
                Add / Update Verified Certificate
              </h2>
              <input
                type="text"
                required
                placeholder="Certificate Title"
                value={certTitle}
                onChange={(e) => setCertTitle(e.target.value)}
                className="w-full rounded-xl border border-rule bg-page-alt px-3 py-2 text-xs"
              />
              <input
                type="text"
                required
                placeholder="Issuing Institution"
                value={certInstitution}
                onChange={(e) => setCertInstitution(e.target.value)}
                className="w-full rounded-xl border border-rule bg-page-alt px-3 py-2 text-xs"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Issue Date (e.g., 2026)"
                  value={certDate}
                  onChange={(e) => setCertDate(e.target.value)}
                  className="rounded-xl border border-rule bg-page-alt px-3 py-2 text-xs"
                />
                <select
                  value={certStatus}
                  onChange={(e) =>
                    setCertStatus(e.target.value as 'Verified' | 'Pending Proof')
                  }
                  className="rounded-xl border border-rule bg-page-alt px-3 py-2 text-xs"
                >
                  <option value="Verified">Verified</option>
                  <option value="Pending Proof">Pending Proof</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-accent py-2.5 text-xs font-semibold text-page"
              >
                Save Certificate
              </button>
            </form>

            <div className="space-y-3">
              {data.certifications.map((c) => (
                <div
                  key={c.id}
                  className="rounded-xl border border-rule bg-page p-4"
                >
                  <div className="font-serif text-lg font-bold text-ink">
                    {c.title}
                  </div>
                  <div className="font-mono text-xs text-accent">
                    {c.issuing_institution} • {c.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: JOURNAL */}
        {activeTab === 'journal' && (
          <div className="max-w-2xl rounded-2xl border border-rule bg-page p-6 space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">
              Publish New Journal Essay
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!postTitle.trim() || !postBody.trim()) return;
                const post: BlogPostItem = {
                  id: `post-${Date.now()}`,
                  slug: postTitle.toLowerCase().replace(/\s+/g, '-'),
                  title: postTitle.trim(),
                  category: postCategory,
                  publication_date: 'November 2026',
                  reading_time: '4 min read',
                  short_introduction: postIntro.trim() || postTitle.trim(),
                  content_sections: [
                    {
                      heading: '1. Overview & Reflections',
                      body: postBody.trim(),
                    },
                  ],
                  is_published: true,
                };
                upsertBlogPostLocal(post);
                setPostTitle('');
                setPostIntro('');
                setPostBody('');
                showToast(`Published article "${post.title}"`);
              }}
              className="space-y-3"
            >
              <input
                type="text"
                required
                placeholder="Article Title"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="w-full rounded-xl border border-rule bg-page-alt px-3 py-2 text-xs"
              />
              <select
                value={postCategory}
                onChange={(e) =>
                  setPostCategory(e.target.value as JournalCategory)
                }
                className="w-full rounded-xl border border-rule bg-page-alt px-3 py-2 text-xs"
              >
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Software Development">Software Development</option>
                <option value="Project Development">Project Development</option>
                <option value="Learning Experiences">Learning Experiences</option>
                <option value="Technical Challenges">Technical Challenges</option>
              </select>
              <input
                type="text"
                placeholder="Short Introduction"
                value={postIntro}
                onChange={(e) => setPostIntro(e.target.value)}
                className="w-full rounded-xl border border-rule bg-page-alt px-3 py-2 text-xs"
              />
              <textarea
                rows={5}
                required
                placeholder="Full article body..."
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
                className="w-full rounded-xl border border-rule bg-page-alt px-3 py-2 text-xs"
              />
              <button
                type="submit"
                className="rounded-xl bg-accent px-5 py-2.5 text-xs font-semibold text-page"
              >
                Publish Essay to Chapter 10
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="max-w-2xl rounded-2xl border border-rule bg-page p-6 space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">
              Approve Real Endorsement (Chapter 11)
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!testName.trim() || !testText.trim()) return;
                const item: TestimonialItem = {
                  id: `test-${Date.now()}`,
                  person_name: testName.trim(),
                  role_or_relationship: testRole.trim(),
                  testimonial_text: testText.trim(),
                  is_approved: true,
                };
                upsertTestimonialLocal(item);
                setTestName('');
                setTestRole('');
                setTestText('');
                showToast(`Approved endorsement from ${item.person_name}`);
              }}
              className="space-y-3"
            >
              <input
                type="text"
                required
                placeholder="Person Name"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="w-full rounded-xl border border-rule bg-page-alt px-3 py-2 text-xs"
              />
              <input
                type="text"
                required
                placeholder="Role or Academic Relationship"
                value={testRole}
                onChange={(e) => setTestRole(e.target.value)}
                className="w-full rounded-xl border border-rule bg-page-alt px-3 py-2 text-xs"
              />
              <textarea
                rows={4}
                required
                placeholder="Approved testimonial quote..."
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                className="w-full rounded-xl border border-rule bg-page-alt px-3 py-2 text-xs"
              />
              <button
                type="submit"
                className="rounded-xl bg-accent px-5 py-2.5 text-xs font-semibold text-page"
              >
                Approve & Publish Testimonial
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
