import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  X,
  Send,
  Trash2,
  BookOpen,
  Cpu,
  ShieldCheck,
  Loader2,
} from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { AurevonChatMessage } from '@/types/portfolio';
import { queryAurevonAssistant } from '@/services/api';

const SUGGESTED_QUESTIONS = [
  "Tell me about Abdurrahman's AI projects.",
  'What is FederatedMind?',
  'What technologies does he use?',
  'Explain his education journey.',
  'How can I contact him?',
];

export const AurevonCompanionWidget: React.FC = () => {
  const {
    data,
    isAurevonOpen,
    setIsAurevonOpen,
    pendingAurevonPrompt,
    clearPendingAurevonPrompt,
    aurevonStatus,
  } = usePortfolio();

  const [mode, setMode] = useState<'portfolio' | 'general'>('portfolio');
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<AurevonChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content:
        'Greetings. I am **AUREVON AI**, the intelligent companion integrated into *THE MAKING OF ABDURRAHMAN*.\n\n' +
        'In **Portfolio Assistant Mode**, I answer strictly from Abdurrahman Zarook’s verified academic, research, and project records. In **General AI Mode**, I connect to the underlying model (`qwen2.5:3b` / AUREVON backend) for broader technical questions.',
      mode: 'portfolio',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      sources: ['Authoritative Portfolio Knowledge Graph'],
    },
  ]);

  const scrollEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isAurevonOpen]);

  const handleSendMessage = async (
    rawText: string,
    overrideMode?: 'portfolio' | 'general'
  ) => {
    const trimmed = rawText.trim();
    if (!trimmed || isTyping) return;

    const activeMode = overrideMode || mode;
    const userMsg: AurevonChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      mode: activeMode,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const res = await queryAurevonAssistant(
        trimmed,
        activeMode,
        historyPayload,
        data
      );

      const assistantMsg: AurevonChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: res.reply,
        mode: res.mode,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        sources: res.sources,
        provider: `${res.provider} (${res.model})`,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Trigger external prompts (e.g., from Chapter 01 or Chapter 07 cards)
  useEffect(() => {
    if (pendingAurevonPrompt && isAurevonOpen) {
      setMode(pendingAurevonPrompt.mode);
      handleSendMessage(
        pendingAurevonPrompt.prompt,
        pendingAurevonPrompt.mode
      );
      clearPendingAurevonPrompt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingAurevonPrompt, isAurevonOpen]);

  const clearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content:
          'Conversation cleared. Ask me any question about Abdurrahman Zarook’s projects, education, skills, or contact details.',
        mode,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);
  };

  return (
    <>
      {/* Floating AUREVON Trigger Button */}
      <div className="fixed bottom-16 right-4 z-40 sm:bottom-20 sm:right-6">
        <button
          type="button"
          onClick={() => setIsAurevonOpen(!isAurevonOpen)}
          className="group relative flex items-center gap-2.5 rounded-full border border-accent/60 bg-page px-4 py-2.5 text-xs font-semibold text-ink shadow-book transition-all duration-300 hover:scale-105 hover:border-accent"
          aria-label="Toggle AUREVON AI Portfolio Assistant"
        >
          <span className="relative flex h-6 w-6 items-center justify-center">
            <img
              src="/assets/images/aurevon-logo.svg"
              alt="AUREVON AI"
              className="h-6 w-6"
            />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-sage animate-ping" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-sage" />
          </span>
          <span className="font-serif text-sm font-bold tracking-wide text-ink">
            AUREVON AI
          </span>
        </button>
      </div>

      {/* Chat Window Modal / Drawer */}
      <AnimatePresence>
        {isAurevonOpen && (
          <motion.aside
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-16 right-3 z-50 flex h-[540px] max-h-[82vh] w-[calc(100vw-1.5rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-rule-strong bg-page shadow-book sm:bottom-20 sm:right-6"
            role="dialog"
            aria-label="AUREVON AI Portfolio Companion"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-rule bg-page-alt px-4 py-3">
              <div className="flex items-center gap-2.5">
                <img
                  src="/assets/images/aurevon-logo.svg"
                  alt="AUREVON AI"
                  className="h-7 w-7"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif text-base font-bold text-ink">
                      AUREVON AI
                    </h3>
                    <span className="rounded-full bg-sage/20 px-2 py-0.5 font-mono text-[9px] font-medium text-sage">
                      {aurevonStatus === 'online' ? 'Qwen2.5 3B Live' : 'Verified Graph'}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-ink-muted">
                    Intelligent Portfolio & Research Companion
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={clearHistory}
                  title="Clear Conversation"
                  aria-label="Clear Conversation"
                  className="rounded-lg p-1.5 text-ink-muted hover:bg-page hover:text-ink"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsAurevonOpen(false)}
                  title="Close AUREVON Companion"
                  aria-label="Close AUREVON Companion"
                  className="rounded-lg p-1.5 text-ink-muted hover:bg-page hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Dual Mode Selector: Mode 1 (Portfolio) vs Mode 2 (General AI) */}
            <div className="grid grid-cols-2 gap-1.5 border-b border-rule bg-page-alt/50 px-3 py-2">
              <button
                type="button"
                onClick={() => setMode('portfolio')}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 font-mono text-[10px] transition ${
                  mode === 'portfolio'
                    ? 'bg-accent text-page font-semibold shadow-sm'
                    : 'bg-page text-ink-secondary hover:text-ink'
                }`}
              >
                <BookOpen className="h-3 w-3" />
                <span>Mode 1: Portfolio Facts</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('general')}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 font-mono text-[10px] transition ${
                  mode === 'general'
                    ? 'bg-accent text-page font-semibold shadow-sm'
                    : 'bg-page text-ink-secondary hover:text-ink'
                }`}
              >
                <Cpu className="h-3 w-3" />
                <span>Mode 2: General AI</span>
              </button>
            </div>

            {/* Messages Stream */}
            <div className="book-page-scroll flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      isUser ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        isUser
                          ? 'bg-accent text-page font-medium'
                          : 'border border-rule bg-page-alt text-ink'
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.content}</div>

                      {!isUser && msg.sources && msg.sources.length > 0 && (
                        <div className="mt-2 flex flex-wrap items-center gap-1 border-t border-rule/60 pt-1.5 font-mono text-[9px] text-ink-muted">
                          <ShieldCheck className="h-3 w-3 text-sage" />
                          <span>Sources: {msg.sources.join(' • ')}</span>
                        </div>
                      )}
                    </div>
                    <span className="mt-1 px-1 font-mono text-[9px] text-ink-muted">
                      {msg.timestamp}
                      {msg.provider ? ` • ${msg.provider}` : ''}
                    </span>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 rounded-xl border border-rule bg-page-alt px-3 py-2 text-xs text-ink-secondary w-fit">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" />
                  <span className="font-mono text-[11px]">
                    AUREVON is synthesizing...
                  </span>
                </div>
              )}

              <div ref={scrollEndRef} />
            </div>

            {/* Suggested Questions Pills */}
            <div className="border-t border-rule bg-page-alt/40 px-3 py-2">
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSendMessage(q)}
                    className="shrink-0 rounded-full border border-rule bg-page px-2.5 py-1 font-mono text-[10px] text-ink-secondary transition hover:border-accent hover:text-accent"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="flex items-center gap-2 border-t border-rule bg-page-alt p-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === 'portfolio'
                    ? 'Ask about Abdurrahman’s projects, education, skills...'
                    : 'Ask a general AI question (Qwen2.5 3B)...'
                }
                className="flex-1 rounded-xl border border-rule bg-page px-3 py-2 text-xs text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-page transition hover:bg-accent-strong disabled:opacity-40"
                aria-label="Send question to AUREVON AI"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
