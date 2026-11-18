import React, { useState } from 'react';
import {
  CheckCircle2,
  FolderGit2,
  Send,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { ChapterSlug, ServiceCapability } from '@/types/portfolio';

export function renderServicesSpread(
  onSelectChapter: (slug: ChapterSlug) => void
): {
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
} {
  return ServicesStateWrapper({ onSelectChapter });
}

function ServicesStateWrapper({
  onSelectChapter,
}: {
  onSelectChapter: (slug: ChapterSlug) => void;
}) {
  const { data } = usePortfolio();
  const servicesList = data.services || [];
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    servicesList[0]?.id || ''
  );

  const activeService =
    servicesList.find((s) => s.id === selectedServiceId) || servicesList[0];

  return {
    leftPage: (
      <ServicesCatalogLeftPage
        services={servicesList}
        selectedId={activeService?.id || ''}
        onSelect={(s) => setSelectedServiceId(s.id)}
      />
    ),
    rightPage: (
      <ServiceDetailRightPage
        service={activeService}
        onSelectChapter={onSelectChapter}
      />
    ),
  };
}

const ServicesCatalogLeftPage: React.FC<{
  services: ServiceCapability[];
  selectedId: string;
  onSelect: (s: ServiceCapability) => void;
}> = ({ services, selectedId, onSelect }) => {
  return (
    <div className="space-y-4">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          Chapter 09 • Services & Capabilities
        </span>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">
          Areas of Technical Contribution
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
          Presented honestly as the individual engineering, research, and mentorship capabilities of an AI undergraduate and software developer—grounded in real completed and ongoing builds.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {services.map((srv) => {
          const isSelected = srv.id === selectedId;
          return (
            <button
              key={srv.id}
              type="button"
              onClick={() => onSelect(srv)}
              className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition ${
                isSelected
                  ? 'border-accent bg-accent/15 shadow-card'
                  : 'border-rule bg-page-alt/60 hover:border-accent/50'
              }`}
            >
              <div>
                <h3 className="font-serif text-base font-bold text-ink">
                  {srv.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary line-clamp-3">
                  {srv.description}
                </p>
              </div>
              <div className="mt-3 border-t border-rule/60 pt-2 font-mono text-[10px] text-accent">
                Ref: {srv.example_project_title}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ServiceDetailRightPage: React.FC<{
  service?: ServiceCapability;
  onSelectChapter: (slug: ChapterSlug) => void;
}> = ({ service, onSelectChapter }) => {
  if (!service) return null;

  return (
    <div className="flex h-full flex-col justify-between space-y-6">
      <div className="rounded-2xl border border-accent/50 bg-page-alt p-5 shadow-card">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
          <Wrench className="h-4 w-4" />
          <span>Capability Specification</span>
        </div>

        <h3 className="mt-2 font-serif text-2xl font-bold text-ink sm:text-3xl">
          {service.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          {service.description}
        </p>

        {/* Deliverables */}
        <div className="mt-5">
          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Practical Deliverables & Focus
          </h4>
          <ul className="mt-2.5 space-y-2">
            {service.deliverables.map((d, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-ink-secondary"
              >
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Relevant Technologies */}
        <div className="mt-5">
          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Relevant Technologies
          </h4>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {service.relevant_technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-rule bg-page px-2.5 py-1 font-mono text-xs text-ink"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Example Project Reference */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rule bg-page p-3.5">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
              Verified Reference Build
            </div>
            <div className="font-serif text-base font-bold text-ink">
              {service.example_project_title}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectChapter('projects')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-rule bg-page-alt px-3 py-1.5 font-mono text-xs text-ink hover:border-accent"
            >
              <FolderGit2 className="h-3.5 w-3.5 text-accent" />
              <span>View Project</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectChapter('contact')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-1.5 text-xs font-semibold text-page hover:bg-accent-strong"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Inquire</span>
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-rule bg-page-alt/60 p-4 text-xs text-ink-secondary">
        <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Collaboration Ethos</span>
        </div>
        <p className="mt-1 leading-relaxed">
          Available for undergraduate research collaborations, internship opportunities, freelance software/AI builds, and academic tutoring in Mathematics and Information Technology.
        </p>
      </div>
    </div>
  );
};
