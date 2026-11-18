import React from 'react';
import { Quote, ShieldCheck, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { ChapterSlug } from '@/types/portfolio';

export function renderPerspectivesSpread(
  onSelectChapter: (slug: ChapterSlug) => void
): {
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
} {
  return {
    leftPage: <PerspectivesLeftPage />,
    rightPage: <PerspectivesRightPage onSelectChapter={onSelectChapter} />,
  };
}

const PerspectivesLeftPage: React.FC = () => {
  const { data } = usePortfolio();
  const approvedTestimonials = (data.testimonials || []).filter((t) => t.is_approved);

  return (
    <div className="space-y-5">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          Chapter 11 • Perspectives & Endorsements
        </span>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">
          Voices From Collaborators & Mentorship
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
          In strict adherence to editorial integrity, this volume only publishes real, verifiable endorsements explicitly approved by the people who provided them.
        </p>
      </div>

      {approvedTestimonials.length > 0 ? (
        <div className="space-y-3.5">
          {approvedTestimonials.map((item) => (
            <blockquote
              key={item.id}
              className="rounded-2xl border border-rule-strong bg-page-alt p-5 shadow-card"
            >
              <Quote className="h-6 w-6 text-accent/60" />
              <p className="mt-2 font-serif text-base italic leading-relaxed text-ink">
                &ldquo;{item.testimonial_text}&rdquo;
              </p>
              <footer className="mt-4 flex items-center justify-between border-t border-rule pt-3">
                <div>
                  <div className="font-serif text-sm font-bold text-ink">
                    {item.person_name}
                  </div>
                  <div className="font-mono text-[10px] text-ink-secondary">
                    {item.role_or_relationship}
                    {item.organization ? ` • ${item.organization}` : ''}
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-sage/20 px-2.5 py-0.5 font-mono text-[10px] text-sage">
                  <CheckCircle2 className="h-3 w-3" /> Verified
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      ) : (
        /* Tasteful Editorial State when no approved testimonials are published yet */
        <div className="rounded-2xl border border-dashed border-accent/50 bg-page-alt/70 p-6 shadow-card">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                Zero-Fabrication Editorial Policy
              </span>
              <h3 className="font-serif text-xl font-bold text-ink">
                Verified Endorsements Registry (Awaiting Signed Approvals)
              </h3>
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-ink-secondary sm:text-sm">
            Rather than displaying synthetic or placeholder customer reviews, this section remains reserved exclusively for signed academic, tutoring, and project endorsements approved by their authors.
          </p>

          <div className="mt-4 rounded-xl border border-rule bg-page p-3.5 font-mono text-[11px] text-ink-secondary">
            <div className="flex items-center gap-1.5 text-ink font-semibold">
              <Lock className="h-3.5 w-3.5 text-accent" />
              <span>Production Visibility Control Active</span>
            </div>
            <p className="mt-1 text-[11px] text-ink-muted">
              Approved testimonials added through the Admin Dashboard (<code className="text-accent">/admin</code>) appear here automatically.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const PerspectivesRightPage: React.FC<{
  onSelectChapter: (slug: ChapterSlug) => void;
}> = ({ onSelectChapter }) => {
  return (
    <div className="flex h-full flex-col justify-between space-y-6">
      <div className="rounded-2xl border border-rule bg-page-alt p-5 shadow-card">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
          <Sparkles className="h-4 w-4" />
          <span>Collaborative Ethos & Mentorship Context</span>
        </div>

        <h3 className="mt-2 font-serif text-2xl font-bold text-ink">
          How I Work With Peers, Mentors & Students
        </h3>

        <div className="mt-4 space-y-3 text-xs leading-relaxed text-ink-secondary sm:text-sm">
          <p>
            Across university project groups at <strong>NSBM Green University</strong>, software engineering cohorts at <strong>NIBM Kandy Campus</strong>, and weekly tutoring sessions in <strong>O/L Mathematics</strong> and <strong>Information Technology</strong>, my work is guided by three commitments:
          </p>
          <ul className="space-y-2 pt-1">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
              <span>
                <strong>Honest Communication:</strong> Reporting real progress, documenting trade-offs clearly, and never over-promising capabilities.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
              <span>
                <strong>Reproducible Engineering:</strong> Structuring repositories with clean setup scripts, automated tests, and readable commit histories.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
              <span>
                <strong>Patient Knowledge Sharing:</strong> Ensuring every student or teammate understands the underlying &ldquo;why&rdquo; behind a solution.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="rounded-xl border border-accent/40 bg-page-alt p-4">
        <h4 className="font-serif text-base font-bold text-ink">
          Have We Collaborated or Studied Together?
        </h4>
        <p className="mt-1 text-xs text-ink-secondary">
          If I have mentored you in Mathematics or IT, or collaborated with you on an academic or software build, you can share a reflection via Chapter 13 (Contact).
        </p>
        <button
          type="button"
          onClick={() => onSelectChapter('contact')}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-page hover:bg-accent-strong"
        >
          <span>Go to Chapter 13: Contact →</span>
        </button>
      </div>
    </div>
  );
};
