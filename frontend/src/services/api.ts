import { ContactSubmissionPayload, PortfolioBundle } from '@/types/portfolio';
import { INITIAL_PORTFOLIO_DATA } from '@/data/verifiedPortfolioData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export interface RemoteBundleResponse {
  bundle: PortfolioBundle;
  aurevon_online: boolean;
  model: string;
}

export async function fetchPortfolioBundle(): Promise<RemoteBundleResponse | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(`${API_BASE_URL}/portfolio/bundle`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export interface ContactSubmissionResult {
  success: boolean;
  delivered_via: 'smtp' | 'resend' | 'database_logged' | 'mailto_fallback';
  message: string;
  mailto_url?: string;
}

export async function submitContactForm(
  payload: ContactSubmissionPayload
): Promise<ContactSubmissionResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return await res.json();
    }
    const err = await res.json().catch(() => ({ detail: 'Server validation error' }));
    throw new Error(err.detail || 'Could not send message through server.');
  } catch {
    // Provide verified mailto fallback if backend email service is unreachable
    const recipient = INITIAL_PORTFOLIO_DATA.profile.email;
    const subject = encodeURIComponent(payload.subject || `Portfolio Inquiry from ${payload.name}`);
    const body = encodeURIComponent(
      `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`
    );
    return {
      success: true,
      delivered_via: 'mailto_fallback',
      message:
        'Your correspondence has been formatted and is ready for immediate dispatch through your mail client.',
      mailto_url: `mailto:${recipient}?subject=${subject}&body=${body}`,
    };
  }
}

export interface AurevonResponsePayload {
  reply: string;
  mode: 'portfolio' | 'general';
  provider: string;
  model: string;
  sources: string[];
}

export async function queryAurevonAssistant(
  message: string,
  mode: 'portfolio' | 'general',
  history: { role: 'user' | 'assistant'; content: string }[],
  bundle: PortfolioBundle
): Promise<AurevonResponsePayload> {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        mode,
        history: history.slice(-8),
      }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fall through to deterministic verified knowledge engine when backend is offline
  }

  return synthesizeVerifiedLocalResponse(message, mode, bundle);
}

/**
 * Authoritative Grounded Portfolio Knowledge Synthesis
 * Ensures zero hallucination even when local Ollama or backend server is offline.
 */
function synthesizeVerifiedLocalResponse(
  query: string,
  mode: 'portfolio' | 'general',
  bundle: PortfolioBundle
): AurevonResponsePayload {
  const q = query.toLowerCase();

  if (mode === 'general') {
    return {
      reply:
        `**AUREVON AI — General Assistant Mode**\n\n` +
        `Live open-ended model inference (\`qwen2.5:3b\`) requires an active backend model connection. ` +
        `Right now, I am operating in **Authoritative Portfolio Knowledge Mode**, where I can answer detailed questions about Abdurrahman Zarook's AI research (**FederatedMind**, **AUREVON AI**), his 12 software projects, his education at **NSBM Green University** and **NIBM Kandy**, or his contact channels.`,
      mode: 'general',
      provider: 'aurevon-knowledge-engine',
      model: 'portfolio-knowledge-v1',
      sources: ['AUREVON Portfolio Knowledge Base'],
    };
  }

  if (q.includes('federated') || q.includes('flower') || q.includes('flwr')) {
    const fm = bundle.projects.find((p) => p.slug === 'federated-mind');
    return {
      reply:
        `**FederatedMind** is Abdurrahman's ongoing privacy-preserving Federated Learning research project.\n\n` +
        `- **Core Stack**: ${fm?.technologies.join(', ')}\n` +
        `- **Architecture**: Uses Flower (\`flwr 1.36\`) \`ServerApp\` and \`ClientApp\` with Ray simulation and PyTorch 2.10.\n` +
        `- **Research Focus**: Benchmarks IID versus non-IID (\`dirichlet-alpha = 0.3\`) client data partitions so deep learning models can train collaboratively without centralizing sensitive user data.\n` +
        `- **Status**: ${fm?.status} (${fm?.year})`,
      mode: 'portfolio',
      provider: 'aurevon-portfolio-knowledge',
      model: 'verified-knowledge-graph',
      sources: ['Chapter 07: Projects — FederatedMind', 'Chapter 10: Journal'],
    };
  }

  if (q.includes('aurevon')) {
    const aur = bundle.projects.find((p) => p.slug === 'aurevon-ai');
    return {
      reply:
        `**AUREVON AI** is Abdurrahman's independent, open-source-first multimodal AI assistant platform.\n\n` +
        `- **Capabilities**: Real-time SSE token streaming, Document RAG (PDF/MD/CSV/Code), Long-Term Semantic Memory, DuckDuckGo Web Research, and sandboxed AST Agent tools (\`SafeCalculator\`, \`ASTCodeAnalyzer\`).\n` +
        `- **Model Support**: Local Ollama (\`qwen2.5:3b\`, \`llava:7b\`) and cloud providers (OpenAI, Groq, DeepSeek).\n` +
        `- **Tech Stack**: ${aur?.technologies.join(', ')}`,
      mode: 'portfolio',
      provider: 'aurevon-portfolio-knowledge',
      model: 'verified-knowledge-graph',
      sources: ['Chapter 07: Projects — AUREVON AI'],
    };
  }

  if (q.includes('project') || q.includes('built') || q.includes('work') || q.includes('travel') || q.includes('pechavote') || q.includes('wahdath') || q.includes('attendance') || q.includes('greenroute')) {
    const completed = bundle.projects.filter((p) => p.status === 'Completed');
    const ongoing = bundle.projects.filter((p) => p.status !== 'Completed');
    return {
      reply:
        `Abdurrahman has **${bundle.projects.length} verified software and AI projects** (${completed.length} Completed, ${ongoing.length} Ongoing):\n\n` +
        `**Completed Projects (${completed.length}):**\n` +
        completed.map((p) => `- **${p.title}** (${p.category}): ${p.short_description}`).join('\n') +
        `\n\n**Ongoing / Research Projects (${ongoing.length}):**\n` +
        ongoing.map((p) => `- **${p.title}** (${p.category}): ${p.short_description}`).join('\n'),
      mode: 'portfolio',
      provider: 'aurevon-portfolio-knowledge',
      model: 'verified-knowledge-graph',
      sources: ['Chapter 07: Projects & Archive', 'Chapter 08: Achievements'],
    };
  }

  if (q.includes('educat') || q.includes('university') || q.includes('degree') || q.includes('school') || q.includes('nsbm') || q.includes('nibm') || q.includes('zahira')) {
    return {
      reply:
        `Here is Abdurrahman Zarook's **verified educational progression** (Chapter 03):\n\n` +
        bundle.education
          .map(
            (e) =>
              `- **${e.year} — ${e.qualification}** at *${e.institution}* (${e.status}): ${e.results_summary}.`
          )
          .join('\n'),
      mode: 'portfolio',
      provider: 'aurevon-portfolio-knowledge',
      model: 'verified-knowledge-graph',
      sources: ['Chapter 03: Education Journey'],
    };
  }

  if (q.includes('certif')) {
    return {
      reply:
        `Abdurrahman's **Certifications Registry** (Chapter 04):\n\n` +
        bundle.certifications
          .map((c) => `- **${c.title}** — *${c.issuing_institution}* (${c.status}): ${c.description}`)
          .join('\n'),
      mode: 'portfolio',
      provider: 'aurevon-portfolio-knowledge',
      model: 'verified-knowledge-graph',
      sources: ['Chapter 04: Certifications'],
    };
  }

  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('framework')) {
    const byCat = bundle.skills.reduce((acc, s) => {
      acc[s.category] = acc[s.category] || [];
      acc[s.category].push(s.name);
      return acc;
    }, {} as Record<string, string[]>);
    return {
      reply:
        `Abdurrahman's **Verified Technology Arsenal** (Chapter 06):\n\n` +
        Object.entries(byCat)
          .map(([cat, names]) => `- **${cat}**: ${names.join(', ')}`)
          .join('\n') +
        `\n\n**Spoken Languages**: ${bundle.profile.languages.map((l) => `${l.name} (${l.proficiency})`).join(', ')}.`,
      mode: 'portfolio',
      provider: 'aurevon-portfolio-knowledge',
      model: 'verified-knowledge-graph',
      sources: ['Chapter 02: Introduction', 'Chapter 06: Technology Arsenal'],
    };
  }

  if (q.includes('experience') || q.includes('tutor') || q.includes('work') || q.includes('teach')) {
    return {
      reply:
        `Abdurrahman's **Experience & Mentorship Timeline** (Chapter 05):\n\n` +
        bundle.experience
          .map((ex) => `- **${ex.position}** (${ex.date_range}) — *${ex.organization}*: ${ex.summary}`)
          .join('\n'),
      mode: 'portfolio',
      provider: 'aurevon-portfolio-knowledge',
      model: 'verified-knowledge-graph',
      sources: ['Chapter 05: Experience'],
    };
  }

  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('linkedin') || q.includes('github')) {
    return {
      reply:
        `You can reach **Abdurrahman Zarook** directly through his verified channels in **Chapter 13 (Contact)**:\n\n` +
        `- **Email**: [${bundle.profile.email}](mailto:${bundle.profile.email})\n` +
        `- **GitHub**: ${bundle.profile.github_url}\n` +
        `- **LinkedIn**: ${bundle.profile.linkedin_url}\n` +
        `- **CV**: Available via the downward-arrow **Download My CV** control in the persistent footer.`,
      mode: 'portfolio',
      provider: 'aurevon-portfolio-knowledge',
      model: 'verified-knowledge-graph',
      sources: ['Chapter 13: Contact'],
    };
  }

  return {
    reply:
      `I am **AUREVON AI**, the intelligent companion for *THE MAKING OF ABDURRAHMAN*.\n\n` +
      `**Abdurrahman Zarook** is an **Artificial Intelligence Undergraduate at NSBM Green University** with a **Diploma in Software Engineering from NIBM Kandy Campus**. He has built **7+ completed software applications** and is actively developing **5 AI & research systems** including **FederatedMind** (PyTorch + Flower) and **AUREVON AI**.\n\n` +
      `Ask me about his **AI projects**, **FederatedMind architecture**, **education journey**, **technology stack**, **tutoring experience**, or **contact details**!`,
    mode: 'portfolio',
    provider: 'aurevon-portfolio-knowledge',
    model: 'verified-knowledge-graph',
    sources: ['Chapter 01: Home', 'Chapter 02: Introduction', 'Chapter 07: Projects'],
  };
}
