import React, { useState } from 'react';
import {
  Mail,
  Send,
  ArrowDown,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  FolderGit2,
  Linkedin,
} from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { submitContactForm } from '@/services/api';

export function renderContactSpread(): {
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
} {
  return {
    leftPage: <ContactLeftPage />,
    rightPage: <ContactRightPage />,
  };
}

const ContactLeftPage: React.FC = () => {
  const { data } = usePortfolio();
  const profile = data.profile;

  return (
    <div className="flex h-full flex-col justify-between space-y-6">
      <div className="space-y-5">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Chapter 13 • Colophon & Correspondence
          </span>
          <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">
            Let’s Connect & Build Together
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-ink-secondary sm:text-sm">
            Whether you are reaching out regarding Artificial Intelligence research, software engineering opportunities, project collaboration, or academic mentorship, you can contact me directly through the verified channels below.
          </p>
        </div>

        {/* Direct Verified Channels */}
        <div className="space-y-3">
          {/* Email */}
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center justify-between rounded-xl border border-rule bg-page-alt/70 p-4 transition hover:border-accent"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-rule bg-page text-accent">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                  Direct Email
                </div>
                <div className="font-mono text-xs font-semibold text-ink group-hover:text-accent sm:text-sm">
                  {profile.email}
                </div>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-ink-muted group-hover:text-accent" />
          </a>

          {/* GitHub */}
          <a
            href={profile.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl border border-rule bg-page-alt/70 p-4 transition hover:border-accent"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-rule bg-page text-accent">
                <FolderGit2 className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                  GitHub Profile & Repositories
                </div>
                <div className="font-mono text-xs font-semibold text-ink group-hover:text-accent sm:text-sm">
                  {profile.github_url}
                </div>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-ink-muted group-hover:text-accent" />
          </a>

          {/* LinkedIn */}
          <a
            href={profile.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl border border-rule bg-page-alt/70 p-4 transition hover:border-accent"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-rule bg-page text-accent">
                <Linkedin className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                  Verified LinkedIn Profile
                </div>
                <div className="font-mono text-xs font-semibold text-ink group-hover:text-accent sm:text-sm">
                  linkedin.com/in/abdurrahman-zarook-11525b3a2
                </div>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-ink-muted group-hover:text-accent" />
          </a>

          {/* Direct CV Download */}
          <a
            href={profile.cv_url}
            download="Abdurrahman-Zarook-CV.pdf"
            className="group flex items-center justify-between rounded-xl border border-accent/50 bg-accent/10 p-4 transition hover:bg-accent hover:text-page"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-page text-accent">
                <ArrowDown className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider opacity-80">
                  Curriculum Vitae (PDF)
                </div>
                <div className="font-serif text-base font-bold">
                  Download Verified CV — Abdurrahman Zarook
                </div>
              </div>
            </div>
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Final Closing Book Epigraph */}
      <blockquote className="rounded-2xl border border-rule-strong bg-page-alt p-5">
        <p className="font-serif text-lg italic leading-relaxed text-ink">
          &ldquo;{profile.closing_quote}&rdquo;
        </p>
        <footer className="mt-2 font-mono text-[11px] uppercase tracking-widest text-accent">
          — Abdurrahman Zarook
        </footer>
      </blockquote>
    </div>
  );
};

const ContactRightPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resultState, setResultState] = useState<{
    message: string;
    mailtoUrl?: string;
    via: string;
  } | null>(null);

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setResultState(null);

    // Spam honeypot check
    if (honeypot.trim().length > 0) {
      return;
    }

    if (name.trim().length < 2) {
      setErrorMsg('Please enter your name (at least 2 characters).');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (subject.trim().length < 3) {
      setErrorMsg('Please provide a clear subject line (at least 3 characters).');
      return;
    }
    if (message.trim().length < 10) {
      setErrorMsg('Please write a message of at least 10 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitContactForm({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        honeypot,
      });

      setResultState({
        message: response.message,
        mailtoUrl: response.mailto_url,
        via: response.delivered_via,
      });

      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Unable to send message right now.';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full flex-col justify-between space-y-5">
      <div className="rounded-2xl border border-rule-strong bg-page-alt p-5 shadow-card sm:p-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Verified Correspondence Form
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-sage">
            <ShieldCheck className="h-3.5 w-3.5" />
            Rate-Limited & Validated
          </span>
        </div>

        <h3 className="mt-1 font-serif text-2xl font-bold text-ink">
          Send a Direct Message
        </h3>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5" noValidate>
          {/* Hidden Honeypot Field for Spam Protection */}
          <input
            type="text"
            name="website_url_hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div>
            <label
              htmlFor="contact-name"
              className="block font-mono text-[11px] uppercase tracking-wider text-ink-secondary"
            >
              Your Name *
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Dr. Perera / Collaborator"
              className="mt-1 w-full rounded-xl border border-rule bg-page px-3.5 py-2.5 text-xs text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block font-mono text-[11px] uppercase tracking-wider text-ink-secondary"
            >
              Email Address *
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@organization.com"
              className="mt-1 w-full rounded-xl border border-rule bg-page px-3.5 py-2.5 text-xs text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="contact-subject"
              className="block font-mono text-[11px] uppercase tracking-wider text-ink-secondary"
            >
              Subject *
            </label>
            <input
              id="contact-subject"
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="AI Research / Software Engineering / Tutoring Inquiry"
              className="mt-1 w-full rounded-xl border border-rule bg-page px-3.5 py-2.5 text-xs text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block font-mono text-[11px] uppercase tracking-wider text-ink-secondary"
            >
              Message *
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share details about your project, opportunity, or question..."
              className="mt-1 w-full resize-y rounded-xl border border-rule bg-page px-3.5 py-2.5 text-xs text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none"
            />
          </div>

          {errorMsg && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-400"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {resultState && (
            <div
              role="status"
              className="space-y-2 rounded-xl border border-sage/50 bg-sage/15 p-3.5 text-xs text-ink"
            >
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                <span>{resultState.message}</span>
              </div>
              {resultState.mailtoUrl && (
                <div className="pt-1">
                  <a
                    href={resultState.mailtoUrl}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 font-mono text-[11px] font-semibold text-page"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Open Default Email Client (mailto Fallback)</span>
                  </a>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-xs font-semibold uppercase tracking-wider text-page shadow-sm transition hover:bg-accent-strong disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Dispatching Message...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Send Correspondence</span>
              </>
            )}
          </button>
        </form>
      </div>

      <p className="text-center font-mono text-[10px] text-ink-muted">
        Privacy Notice: Submissions are validated server-side, never publicly exposed, and used solely to reply to your inquiry.
      </p>
    </div>
  );
};
