import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, Tag, Terminal } from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { BlogPostItem, JournalCategory } from '@/types/portfolio';

const JOURNAL_CATEGORIES: ('All' | JournalCategory)[] = [
  'All',
  'Artificial Intelligence',
  'Machine Learning',
  'Software Development',
  'Project Development',
  'Learning Experiences',
  'Technical Challenges',
];

export function renderJournalSpread(): {
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
} {
  return JournalStateWrapper();
}

function JournalStateWrapper() {
  const { data } = usePortfolio();
  const publishedPosts = (data.journal || []).filter((p) => p.is_published);
  const [selectedCategory, setSelectedCategory] = useState<'All' | JournalCategory>('All');
  const [selectedPostId, setSelectedPostId] = useState<string>(
    publishedPosts[0]?.id || ''
  );

  const filtered =
    selectedCategory === 'All'
      ? publishedPosts
      : publishedPosts.filter((p) => p.category === selectedCategory);

  const activePost =
    publishedPosts.find((p) => p.id === selectedPostId) ||
    filtered[0] ||
    publishedPosts[0];

  return {
    leftPage: (
      <JournalIndexLeftPage
        posts={filtered}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedPostId={activePost?.id || ''}
        onSelectPost={(p) => setSelectedPostId(p.id)}
      />
    ),
    rightPage: <JournalReaderRightPage post={activePost} />,
  };
}

const JournalIndexLeftPage: React.FC<{
  posts: BlogPostItem[];
  selectedCategory: 'All' | JournalCategory;
  onSelectCategory: (c: 'All' | JournalCategory) => void;
  selectedPostId: string;
  onSelectPost: (p: BlogPostItem) => void;
}> = ({
  posts,
  selectedCategory,
  onSelectCategory,
  selectedPostId,
  onSelectPost,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          Chapter 10 • Technical & Personal Journal
        </span>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">
          Field Notes & Engineering Reflections
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
          First-hand technical notes from building FederatedMind, AUREVON AI, Travel-Lanka AI, and browser computer vision pipelines.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-1.5">
        {JOURNAL_CATEGORIES.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`rounded-full border px-2.5 py-1 font-mono text-[10px] transition ${
                active
                  ? 'border-accent bg-accent text-page font-semibold'
                  : 'border-rule bg-page-alt/60 text-ink-secondary hover:border-accent/50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Article Cards */}
      <div className="space-y-3 pt-1">
        {posts.map((post) => {
          const isSelected = post.id === selectedPostId;
          return (
            <button
              key={post.id}
              type="button"
              onClick={() => onSelectPost(post)}
              className={`w-full rounded-xl border p-4 text-left transition ${
                isSelected
                  ? 'border-accent bg-page-alt shadow-card'
                  : 'border-rule bg-page-alt/40 hover:border-accent/50'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px]">
                <span className="inline-flex items-center gap-1 text-accent">
                  <Tag className="h-3 w-3" />
                  {post.category}
                </span>
                <div className="flex items-center gap-3 text-ink-muted">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.publication_date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.reading_time}
                  </span>
                </div>
              </div>

              <h3 className="mt-1.5 font-serif text-lg font-bold text-ink">
                {post.title}
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-ink-secondary line-clamp-2">
                {post.short_introduction}
              </p>

              <div className="mt-2.5 flex items-center justify-between border-t border-rule/60 pt-2 font-mono text-[10px]">
                <span className="text-ink-muted">
                  {post.related_project ? `Project: ${post.related_project}` : 'Essay'}
                </span>
                <span className="font-semibold text-accent">Read Essay →</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const JournalReaderRightPage: React.FC<{ post?: BlogPostItem }> = ({ post }) => {
  if (!post) return null;

  return (
    <article className="space-y-5">
      <div className="border-b border-rule pb-4">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-accent">
          <BookOpen className="h-3.5 w-3.5" />
          <span>{post.category}</span>
          <span>•</span>
          <span>{post.publication_date}</span>
          <span>•</span>
          <span>{post.reading_time}</span>
        </div>

        <h3 className="mt-2 font-serif text-2xl font-bold leading-snug text-ink sm:text-3xl">
          {post.title}
        </h3>

        <p className="mt-2 font-serif text-sm italic leading-relaxed text-ink-secondary">
          {post.short_introduction}
        </p>
      </div>

      {/* Complete Article Body */}
      <div className="space-y-5">
        {post.content_sections.map((sec, idx) => (
          <section key={idx} className="space-y-2">
            <h4 className="font-serif text-lg font-bold text-ink">
              {sec.heading}
            </h4>
            <p className="text-xs leading-relaxed text-ink-secondary sm:text-sm">
              {sec.body}
            </p>
            {sec.code_snippet && (
              <div className="mt-2 overflow-x-auto rounded-xl border border-rule-strong bg-canvas p-3.5 font-mono text-xs text-ink">
                <div className="mb-1.5 flex items-center justify-between border-b border-rule pb-1 text-[10px] uppercase text-accent">
                  <span className="inline-flex items-center gap-1">
                    <Terminal className="h-3 w-3" />
                    {sec.code_snippet.language}
                  </span>
                  <span>Verified Configuration</span>
                </div>
                <pre className="leading-relaxed">
                  <code>{sec.code_snippet.code}</code>
                </pre>
              </div>
            )}
          </section>
        ))}
      </div>
    </article>
  );
};
