import React, { useState } from 'react';
import {
  Code2,
  Cpu,
  Database,
  Layers,
  Sparkles,
  Terminal,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { SkillCategory, SkillItem } from '@/types/portfolio';

const CATEGORIES: ('All' | SkillCategory)[] = [
  'All',
  'Programming Languages',
  'Frontend Development',
  'Backend Development',
  'Artificial Intelligence & Machine Learning',
  'Databases',
  'Development Tools',
  'Frameworks & Libraries',
];

export function renderTechnologySpread(): {
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
} {
  return TechnologyStateWrapper();
}

function TechnologyStateWrapper() {
  const { data } = usePortfolio();
  const skillsList = data.skills || [];
  const [selectedCategory, setSelectedCategory] = useState<'All' | SkillCategory>('All');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(
    skillsList[0] || null
  );

  const filtered =
    selectedCategory === 'All'
      ? skillsList
      : skillsList.filter((s) => s.category === selectedCategory);

  return {
    leftPage: (
      <TechnologyLeftPage
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        totalSkills={skillsList.length}
        selectedSkill={selectedSkill || skillsList[0] || null}
      />
    ),
    rightPage: (
      <TechnologyRightPage
        skills={filtered}
        selectedSkill={selectedSkill || skillsList[0] || null}
        onSelectSkill={setSelectedSkill}
      />
    ),
  };
}

const TechnologyLeftPage: React.FC<{
  selectedCategory: 'All' | SkillCategory;
  onSelectCategory: (cat: 'All' | SkillCategory) => void;
  totalSkills: number;
  selectedSkill: SkillItem | null;
}> = ({ selectedCategory, onSelectCategory, totalSkills, selectedSkill }) => {
  return (
    <div className="flex h-full flex-col justify-between space-y-5">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          Chapter 06 • Technology Arsenal
        </span>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">
          Verified Engineering Ecosystem
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
          Only technologies actively used in Abdurrahman’s verified repositories are included. Instead of arbitrary percentage bars, each tool is linked to the actual systems built with it.
        </p>

        {/* Category Filter Buttons */}
        <div className="mt-5 space-y-1.5">
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            Filter by Domain ({totalSkills} Verified Tools)
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  className={`rounded-lg border px-3 py-1.5 text-left font-mono text-[11px] transition ${
                    active
                      ? 'border-accent bg-accent text-page font-semibold shadow-sm'
                      : 'border-rule bg-page-alt/70 text-ink-secondary hover:border-accent/60 hover:text-ink'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Technology Spotlight Card */}
      {selectedSkill && (
        <div className="rounded-2xl border border-accent/50 bg-page-alt p-5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
              Technology Spotlight • {selectedSkill.category}
            </span>
            <span className="rounded-full bg-sage/20 px-2.5 py-0.5 font-mono text-[10px] font-medium text-sage">
              {selectedSkill.proficiency_label}
            </span>
          </div>

          <h3 className="mt-1.5 font-serif text-2xl font-bold text-ink">
            {selectedSkill.name}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
            {selectedSkill.description}
          </p>

          <div className="mt-4 border-t border-rule pt-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
              Verified In Repositories:
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {selectedSkill.verified_projects.map((proj) => (
                <span
                  key={proj}
                  className="inline-flex items-center gap-1 rounded-md border border-rule bg-page px-2 py-0.5 font-mono text-[10px] text-ink"
                >
                  <CheckCircle2 className="h-3 w-3 text-accent" />
                  {proj}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TechnologyRightPage: React.FC<{
  skills: SkillItem[];
  selectedSkill: SkillItem | null;
  onSelectSkill: (skill: SkillItem) => void;
}> = ({ skills, selectedSkill, onSelectSkill }) => {
  const getCategoryIcon = (cat: SkillCategory) => {
    switch (cat) {
      case 'Programming Languages':
        return <Code2 className="h-4 w-4 text-accent" />;
      case 'Frontend Development':
        return <Layers className="h-4 w-4 text-accent" />;
      case 'Backend Development':
        return <Terminal className="h-4 w-4 text-accent" />;
      case 'Artificial Intelligence & Machine Learning':
        return <Sparkles className="h-4 w-4 text-accent" />;
      case 'Databases':
        return <Database className="h-4 w-4 text-accent" />;
      case 'Development Tools':
        return <Wrench className="h-4 w-4 text-accent" />;
      default:
        return <Cpu className="h-4 w-4 text-accent" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
          Showing {skills.length} Verified Technologies (Click any card to inspect)
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {skills.map((skill) => {
          const isSelected = selectedSkill?.id === skill.id;
          return (
            <button
              key={skill.id}
              type="button"
              onClick={() => onSelectSkill(skill)}
              className={`group relative flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all duration-200 ${
                isSelected
                  ? 'border-accent bg-accent/15 shadow-card'
                  : 'border-rule bg-page-alt/60 hover:border-accent/60 hover:bg-page-alt'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-rule bg-page">
                      {getCategoryIcon(skill.category)}
                    </span>
                    <h4 className="font-serif text-base font-bold text-ink group-hover:text-accent">
                      {skill.name}
                    </h4>
                  </div>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-ink-secondary line-clamp-2">
                  {skill.description}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-rule/60 pt-2 font-mono text-[10px]">
                <span className="text-accent">{skill.proficiency_label}</span>
                <span className="text-ink-muted truncate max-w-[130px]">
                  {skill.verified_projects[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
