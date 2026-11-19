import React, { useState } from 'react';
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Layers,
  Sparkles,
  Archive,
  Star,
  Cpu,
  AlertTriangle,
  Code2,
  Monitor,
  Terminal,
} from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { ProjectCategory, ProjectItem } from '@/types/portfolio';

const PROJECT_CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'Artificial Intelligence',
  'Machine Learning',
  'Web Development',
  'Software Development',
  'Research',
];

export function renderProjectsSpread(): {
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
} {
  return ProjectsStateWrapper();
}

function ProjectsStateWrapper() {
  const { data } = usePortfolio();
  const [viewTab, setViewTab] = useState<'featured' | 'archive'>('featured');
  const [categoryFilter, setCategoryFilter] = useState<'All' | ProjectCategory>('All');

  const sortedProjects = [...(data.projects || [])].sort(
    (a, b) => a.featured_order - b.featured_order
  );

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    sortedProjects[0]?.id || ''
  );

  const filteredProjects = sortedProjects.filter((p) => {
    const matchesTab = viewTab === 'archive' ? true : p.is_featured;
    const matchesCat =
      categoryFilter === 'All' ? true : p.category === categoryFilter;
    return matchesTab && matchesCat;
  });

  const activeProject =
    sortedProjects.find((p) => p.id === selectedProjectId) ||
    filteredProjects[0] ||
    sortedProjects[0];

  return {
    leftPage: (
      <ProjectsCatalogLeftPage
        projects={filteredProjects}
        totalCount={sortedProjects.length}
        viewTab={viewTab}
        onChangeTab={setViewTab}
        categoryFilter={categoryFilter}
        onChangeCategory={setCategoryFilter}
        selectedId={activeProject?.id || ''}
        onSelectProject={(p) => setSelectedProjectId(p.id)}
      />
    ),
    rightPage: <ProjectDetailRightPage project={activeProject} />,
  };
}

const ProjectsCatalogLeftPage: React.FC<{
  projects: ProjectItem[];
  totalCount: number;
  viewTab: 'featured' | 'archive';
  onChangeTab: (tab: 'featured' | 'archive') => void;
  categoryFilter: 'All' | ProjectCategory;
  onChangeCategory: (cat: 'All' | ProjectCategory) => void;
  selectedId: string;
  onSelectProject: (p: ProjectItem) => void;
}> = ({
  projects,
  totalCount,
  viewTab,
  onChangeTab,
  categoryFilter,
  onChangeCategory,
  selectedId,
  onSelectProject,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Chapter 07 • Selected Works & Archive
          </span>
          <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">
            Engineering Portfolio ({totalCount} Verified)
          </h2>
        </div>

        {/* Featured vs Full Archive Toggle */}
        <div className="inline-flex rounded-xl border border-rule bg-page-alt p-1">
          <button
            type="button"
            onClick={() => onChangeTab('featured')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] transition ${
              viewTab === 'featured'
                ? 'bg-accent text-page font-semibold shadow-sm'
                : 'text-ink-secondary hover:text-ink'
            }`}
          >
            <Star className="h-3 w-3" />
            <span>Featured</span>
          </button>
          <button
            type="button"
            onClick={() => onChangeTab('archive')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] transition ${
              viewTab === 'archive'
                ? 'bg-accent text-page font-semibold shadow-sm'
                : 'text-ink-secondary hover:text-ink'
            }`}
          >
            <Archive className="h-3 w-3" />
            <span>All Archive ({totalCount})</span>
          </button>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex flex-wrap gap-1.5">
        {PROJECT_CATEGORIES.map((cat) => {
          const active = categoryFilter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onChangeCategory(cat)}
              className={`rounded-full border px-2.5 py-1 font-mono text-[10px] transition ${
                active
                  ? 'border-accent bg-accent/20 font-semibold text-ink'
                  : 'border-rule bg-page-alt/60 text-ink-secondary hover:border-accent/50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Project Cards List */}
      <div className="space-y-2.5 pt-1">
        {projects.map((proj) => {
          const isSelected = proj.id === selectedId;
          const isCompleted = proj.status === 'Completed';
          return (
            <div
              key={proj.id}
              onClick={() => onSelectProject(proj)}
              className={`cursor-pointer rounded-xl border p-3.5 transition ${
                isSelected
                  ? 'border-accent bg-page-alt shadow-card'
                  : 'border-rule bg-page-alt/40 hover:border-accent/50 hover:bg-page-alt/80'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                    {proj.category}
                  </span>
                  {proj.is_featured && (
                    <span className="inline-flex items-center gap-0.5 rounded bg-accent/15 px-1.5 py-0.5 font-mono text-[9px] text-accent">
                      <Star className="h-2.5 w-2.5" /> Featured
                    </span>
                  )}
                </div>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${
                    isCompleted
                      ? 'bg-sage/20 text-sage'
                      : 'bg-accent/20 text-accent'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : (
                    <Clock className="h-3 w-3" />
                  )}
                  {proj.status}
                </span>
              </div>

              <h3 className="mt-1 font-serif text-lg font-bold text-ink">
                {proj.title}
              </h3>
              <p className="mt-0.5 text-xs text-ink-secondary line-clamp-2">
                {proj.short_description}
              </p>

              <div className="mt-2.5 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {proj.technologies.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded border border-rule bg-page px-1.5 py-0.5 font-mono text-[9px] text-ink-secondary"
                    >
                      {t}
                    </span>
                  ))}
                  {proj.technologies.length > 4 && (
                    <span className="font-mono text-[9px] text-ink-muted">
                      +{proj.technologies.length - 4}
                    </span>
                  )}
                </div>

                <span className="shrink-0 font-mono text-[10px] font-semibold text-accent">
                  View Details →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ProjectDetailRightPage: React.FC<{ project?: ProjectItem }> = ({
  project,
}) => {
  const { askAurevonPrompt } = usePortfolio();
  if (!project) return null;

  const isCompleted = project.status === 'Completed';

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="rounded-2xl border border-accent/50 bg-page-alt p-5 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            {project.category} • {project.year}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-xs font-medium ${
              isCompleted ? 'bg-sage/20 text-sage' : 'bg-accent/20 text-accent'
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              <Clock className="h-3.5 w-3.5" />
            )}
            {project.status}
          </span>
        </div>

        <h3 className="mt-1.5 font-serif text-2xl font-bold text-ink sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-0.5 font-serif text-sm italic text-ink-secondary">
          {project.subtitle}
        </p>

        <p className="mt-3 text-xs leading-relaxed text-ink-secondary sm:text-sm">
          {project.overview}
        </p>

        {/* Action Links */}
        <div className="mt-4 flex flex-wrap items-center gap-2.5 border-t border-rule pt-3.5">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-page transition hover:bg-accent-strong"
            >
              <FolderGit2 className="h-3.5 w-3.5" />
              <span>GitHub Repository</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}

          {project.live_demo_url && project.live_demo_url !== '#' && (
            <a
              href={project.live_demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-rule-strong bg-page px-3.5 py-2 text-xs font-semibold text-ink hover:border-accent"
            >
              <span>Live Demo</span>
              <ExternalLink className="h-3 w-3 text-accent" />
            </a>
          )}

          <button
            type="button"
            onClick={() =>
              askAurevonPrompt(
                `Explain the architecture and key features of ${project.title}.`,
                'portfolio'
              )
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-page px-3 py-2 text-xs font-medium text-ink hover:border-accent"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Ask AUREVON</span>
          </button>
        </div>
      </div>

      {/* Interactive Architectural Blueprint & System Preview Plate */}
      <div className="overflow-hidden rounded-2xl border border-rule-strong bg-canvas shadow-sm">
        <div className="flex items-center justify-between border-b border-rule bg-page-alt px-4 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-sage/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-rule-strong" />
            <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
              System Architecture & Interface Plate — {project.slug}
            </span>
          </div>
          <Monitor className="h-3.5 w-3.5 text-accent" />
        </div>

        <div className="p-4">
          {project.screenshots && project.screenshots.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {project.screenshots.map((shot, idx) => (
                <figure
                  key={idx}
                  className="overflow-hidden rounded-xl border border-rule bg-page"
                >
                  <img
                    src={shot.url}
                    alt={shot.caption}
                    className="h-32 w-full object-cover"
                  />
                  <figcaption className="px-3 py-1.5 font-mono text-[10px] text-ink-secondary">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {/* Visual Pipeline Nodes */}
              <div className="flex flex-wrap items-center gap-2">
                {project.architecture_summary
                  .split(/->|<->/)
                  .map((stage, i, arr) => (
                    <React.Fragment key={i}>
                      <div className="flex-1 min-w-[130px] rounded-xl border border-accent/30 bg-page p-2.5 shadow-sm">
                        <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-accent">
                          <Terminal className="h-3 w-3" />
                          <span>Stage 0{i + 1}</span>
                        </div>
                        <div className="mt-1 font-mono text-[11px] font-medium text-ink">
                          {stage.trim()}
                        </div>
                      </div>
                      {i < arr.length - 1 && (
                        <span className="font-mono text-xs font-bold text-accent">
                          →
                        </span>
                      )}
                    </React.Fragment>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Problem & Solution Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-rule bg-page-alt/60 p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">
            Problem Statement
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">
            {project.problem_statement}
          </p>
        </div>
        <div className="rounded-xl border border-rule bg-page-alt/60 p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-sage">
            Proposed Solution
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">
            {project.proposed_solution}
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="rounded-xl border border-rule bg-page-alt/60 p-4">
        <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
          <Layers className="h-3.5 w-3.5" />
          <span>Key Features & Capabilities</span>
        </div>
        <ul className="mt-2 space-y-1.5">
          {project.key_features.map((feat, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-xs text-ink-secondary"
            >
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Architecture & Challenges */}
      <div className="space-y-3 rounded-xl border border-rule bg-page-alt/60 p-4">
        <div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">
            <Cpu className="h-3.5 w-3.5" />
            <span>System Architecture</span>
          </div>
          <p className="mt-1 font-mono text-[11px] leading-relaxed text-ink">
            {project.architecture_summary}
          </p>
        </div>

        <div className="border-t border-rule pt-2.5">
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
            <AlertTriangle className="h-3.5 w-3.5 text-accent" />
            <span>Development Challenges</span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
            {project.development_challenges}
          </p>
        </div>

        {/* Technology Stack Pills */}
        <div className="border-t border-rule pt-2.5">
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
            <Code2 className="h-3.5 w-3.5 text-accent" />
            <span>Technology Stack</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-rule bg-page px-2.5 py-1 font-mono text-[10px] font-medium text-ink"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
