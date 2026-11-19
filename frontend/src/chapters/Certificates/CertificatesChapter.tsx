import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  ShieldCheck,
  X,
  Lock,
} from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { CertificationItem } from '@/types/portfolio';

export function renderCertificatesSpread(): {
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
} {
  return CertificatesStateWrapper();
}

function CertificatesStateWrapper() {
  const { data } = usePortfolio();
  const certsList = data.certifications || [];
  const [previewCert, setPreviewCert] = useState<CertificationItem | null>(
    certsList[0] || null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  return {
    leftPage: (
      <CertificatesLeftPage
        certifications={certsList}
        selectedCert={previewCert || certsList[0] || null}
        onSelect={(cert) => setPreviewCert(cert)}
        onOpenModal={(cert) => {
          setPreviewCert(cert);
          setIsModalOpen(true);
        }}
      />
    ),
    rightPage: (
      <CertificatesRightPage
        selectedCert={previewCert || certsList[0] || null}
        isModalOpen={isModalOpen}
        onOpenModal={() => setIsModalOpen(true)}
        onCloseModal={() => setIsModalOpen(false)}
      />
    ),
  };
}

const CertificatesLeftPage: React.FC<{
  certifications: CertificationItem[];
  selectedCert: CertificationItem | null;
  onSelect: (cert: CertificationItem) => void;
  onOpenModal: (cert: CertificationItem) => void;
}> = ({ certifications, selectedCert, onSelect, onOpenModal }) => {
  return (
    <div className="space-y-5">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          Chapter 04 • Certifications & Credentials
        </span>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">
          Academic & Technical Credentials
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
          Formal qualifications in computing principles, software engineering, and systems analysis completed across Sri Lankan higher-education institutions.
        </p>
      </div>

      <div className="space-y-3.5">
        {certifications.map((cert) => {
          const isSelected = selectedCert?.id === cert.id;
          const isVerified = cert.status === 'Verified';
          return (
            <div
              key={cert.id}
              onClick={() => onSelect(cert)}
              className={`cursor-pointer rounded-2xl border p-4 transition ${
                isSelected
                  ? 'border-accent bg-page-alt shadow-card'
                  : 'border-rule bg-page-alt/50 hover:border-accent/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                      isVerified
                        ? 'border-accent/50 bg-accent/15 text-accent'
                        : 'border-rule bg-page text-ink-muted'
                    }`}
                  >
                    {isVerified ? (
                      <Award className="h-5 w-5" />
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium ${
                          isVerified
                            ? 'bg-sage/20 text-sage'
                            : 'bg-accent/15 text-accent'
                        }`}
                      >
                        {isVerified ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        {cert.status}
                      </span>
                      <span className="font-mono text-[11px] text-ink-muted">
                        {cert.issue_date}
                      </span>
                    </div>

                    <h3 className="mt-1.5 font-serif text-xl font-bold text-ink">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-medium text-ink-secondary">
                      {cert.issuing_institution}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenModal(cert);
                  }}
                  className="inline-flex items-center gap-1 rounded-lg border border-rule bg-page px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink-secondary hover:border-accent hover:text-accent"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Preview</span>
                </button>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-ink-secondary">
                {cert.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {cert.skills_covered.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-rule bg-page px-2 py-0.5 font-mono text-[10px] text-ink-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CertificatesRightPage: React.FC<{
  selectedCert: CertificationItem | null;
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}> = ({ selectedCert, isModalOpen, onOpenModal, onCloseModal }) => {
  if (!selectedCert) return null;
  const isVerified = selectedCert.status === 'Verified';

  return (
    <div className="flex h-full flex-col justify-between space-y-5">
      {/* Framed Certificate Plate */}
      <div className="rounded-2xl border-2 border-rule-strong bg-page-alt p-6 shadow-card">
        <div className="border border-accent/40 bg-page p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
            <Award className="h-6 w-6" />
          </div>

          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
            {isVerified ? 'Official Academic Credential' : 'Reserved Credential Slot'}
          </p>

          <h3 className="mt-2 font-serif text-2xl font-bold text-ink">
            {selectedCert.title}
          </h3>

          <p className="mt-1 font-serif text-base italic text-ink-secondary">
            Awarded to <strong>Abdurrahman Zarook</strong>
          </p>

          <div className="my-4 h-px w-24 mx-auto bg-accent/40" />

          <p className="font-mono text-xs text-ink-secondary">
            Issuing Institution: <strong>{selectedCert.issuing_institution}</strong>
          </p>
          <p className="mt-1 font-mono text-[11px] text-ink-muted">
            Date / Status: {selectedCert.issue_date} ({selectedCert.status})
          </p>

          {selectedCert.certificate_image_url && (
            <div className="mt-4 overflow-hidden rounded-lg border border-rule">
              <img
                src={selectedCert.certificate_image_url}
                alt={selectedCert.title}
                className="max-h-44 w-full object-contain"
              />
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenModal}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-page transition hover:bg-accent-strong"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Open Full Inspection Modal</span>
            </button>

            {selectedCert.verification_url && (
              <a
                href={selectedCert.verification_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-rule bg-page-alt px-3.5 py-2 text-xs font-medium text-ink hover:border-accent"
              >
                <span>Verify Credential</span>
                <ExternalLink className="h-3.5 w-3.5 text-accent" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Academic Foundation Summary */}
      <div className="rounded-xl border border-rule bg-page-alt/60 p-4 text-xs text-ink-secondary">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
          Academic & Technical Foundation
        </div>
        <p className="mt-1 leading-relaxed">
          These qualifications form the technical bridge between upper-secondary quantitative studies at Zahira National College and current honours undergraduate research in Artificial Intelligence at NSBM Green University.
        </p>
      </div>

      {/* Fullscreen Certificate Preview Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate Preview: ${selectedCert.title}`}
        >
          <div className="paper-texture relative w-full max-w-xl rounded-2xl border border-rule-strong bg-page p-6 shadow-book sm:p-8">
            <button
              type="button"
              onClick={onCloseModal}
              className="absolute right-4 top-4 rounded-lg border border-rule bg-page-alt p-2 text-ink-secondary hover:text-ink"
              aria-label="Close Certificate Preview"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              Certificate Dossier Preview
            </span>
            <h3 className="mt-1 font-serif text-2xl font-bold text-ink">
              {selectedCert.title}
            </h3>
            <p className="mt-1 font-mono text-xs text-ink-secondary">
              {selectedCert.issuing_institution} • {selectedCert.issue_date}
            </p>

            <div className="mt-4 rounded-xl border border-rule bg-page-alt p-4 text-sm leading-relaxed text-ink-secondary">
              {selectedCert.description}
            </div>

            <div className="mt-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                Domains Covered
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedCert.skills_covered.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs text-ink"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
