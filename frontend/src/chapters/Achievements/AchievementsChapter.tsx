import React, { useEffect, useState } from 'react';
import { Trophy, CheckCircle2, Code2, Award, Sparkles, BookOpen } from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { AchievementStat } from '@/types/portfolio';

export function renderAchievementsSpread(): {
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
} {
  return {
    leftPage: <AchievementsLeftPage />,
    rightPage: <AchievementsRightPage />,
  };
}

const AnimatedStatCard: React.FC<{ stat: AchievementStat }> = ({ stat }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const target = stat.metric_value;
    const step = Math.max(1, Math.ceil(target / 28));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 35);
    return () => clearInterval(timer);
  }, [stat.metric_value]);

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-rule-strong bg-page-alt p-5 shadow-card">
      <div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
            Verified Metric
          </span>
          <CheckCircle2 className="h-4 w-4 text-sage" />
        </div>

        <div className="mt-3 font-serif text-4xl font-bold text-ink sm:text-5xl">
          {count}
          <span className="text-accent">{stat.metric_suffix}</span>
        </div>

        <h3 className="mt-1 font-serif text-lg font-bold text-ink">
          {stat.label}
        </h3>
        <p className="mt-1 text-xs font-medium text-ink-secondary">
          {stat.sublabel}
        </p>
      </div>

      <p className="mt-4 border-t border-rule pt-2.5 text-[11px] leading-relaxed text-ink-muted">
        {stat.verification_note}
      </p>
    </div>
  );
};

const AchievementsLeftPage: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <div className="space-y-5">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          Chapter 08 • Achievements & Metrics
        </span>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">
          Quantified Progress & Verified Benchmarks
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
          Every metric below is reconciled directly against Abdurrahman’s verified project records, academic milestones, and certification registry.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {(data.achievements || []).map((stat) => (
          <AnimatedStatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </div>
  );
};

const AchievementsRightPage: React.FC = () => {
  const milestones = [
    {
      year: '2026',
      title: 'Engineered AUREVON AI v1.0 (Phases 1–10 Verified)',
      detail:
        'Designed and tested a complete local-first multimodal AI assistant platform with Ollama (Qwen2.5 3B), Document RAG, Long-Term Semantic Memory, and 11 passing pytest suites.',
      icon: <Sparkles className="h-4 w-4 text-accent" />,
    },
    {
      year: '2026',
      title: 'FederatedMind Research Pipeline (PyTorch + Flower)',
      detail:
        'Implemented distributed Federated Learning simulation studying IID and Dirichlet non-IID client data splits.',
      icon: <Code2 className="h-4 w-4 text-accent" />,
    },
    {
      year: '2026',
      title: 'BSc (Hons) Artificial Intelligence Undergraduate',
      detail:
        'Enrolled in the honours Artificial Intelligence degree programme at NSBM Green University following completion of the NSBM Advanced Certificate for Computing.',
      icon: <Award className="h-4 w-4 text-accent" />,
    },
    {
      year: '2025',
      title: 'Diploma in Software Engineering & 7+ Completed Systems',
      detail:
        'Completed formal software engineering training at NIBM Kandy Campus and shipped full-stack & desktop systems across React, Supabase, Java, C#, and PHP/MySQL.',
      icon: <Trophy className="h-4 w-4 text-accent" />,
    },
    {
      year: '2021–2025',
      title: 'G.C.E. O/L Distinctions (6A, 3B) & Academic Mentorship',
      detail:
        'Achieved 6As and 3Bs at Zahira National College, Mawanella, and transitioned into mentoring students in O/L Mathematics and Information Technology.',
      icon: <BookOpen className="h-4 w-4 text-accent" />,
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          Milestone Ledger
        </span>
        <h3 className="mt-1 font-serif text-2xl font-bold text-ink">
          Key Engineering & Academic Highlights
        </h3>
      </div>

      <div className="space-y-3">
        {milestones.map((m, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3.5 rounded-xl border border-rule bg-page-alt/70 p-4"
          >
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rule bg-page">
              {m.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-accent">
                  {m.year}
                </span>
                <h4 className="font-serif text-base font-bold text-ink">
                  {m.title}
                </h4>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
                {m.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
