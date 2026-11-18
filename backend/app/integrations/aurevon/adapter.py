"""
AUREVON AI Integration Adapter
Bridges THE MAKING OF ABDURRAHMAN with:
1. Local Ollama runtime (`qwen2.5:3b` at http://127.0.0.1:11434)
2. Existing AUREVON AI backend (`http://127.0.0.1:8000/api`)
3. Cloud OpenAI-Compatible Provider (Groq / OpenAI / DeepSeek) for public hosting
4. Authoritative Portfolio Knowledge Graph fallback (zero-hallucination guarantee)
"""
import logging
from typing import List, Dict, Any
import httpx
from backend.app.core.config import settings
from backend.app.database.store import AUTHORITATIVE_PORTFOLIO_BUNDLE

logger = logging.getLogger("portfolio.aurevon")


def build_portfolio_system_prompt() -> str:
    profile = AUTHORITATIVE_PORTFOLIO_BUNDLE["profile"]
    edu_lines = [
        f"- {e['year']}: {e['qualification']} at {e['institution']} ({e['status']}) -> {e['results_summary']}"
        for e in AUTHORITATIVE_PORTFOLIO_BUNDLE["education"]
    ]
    proj_lines = [
        f"- {p['title']} [{p['status']}, {p['category']}]: {p['short_description']} (Stack: {', '.join(p['technologies'])})"
        for p in AUTHORITATIVE_PORTFOLIO_BUNDLE["projects"]
    ]
    exp_lines = [
        f"- {x['position']} ({x['date_range']}): {x['summary']}"
        for x in AUTHORITATIVE_PORTFOLIO_BUNDLE["experience"]
    ]
    cert_lines = [
        f"- {c['title']} ({c['issuing_institution']}, {c['status']})"
        for c in AUTHORITATIVE_PORTFOLIO_BUNDLE["certifications"]
    ]

    return (
        "You are AUREVON AI, the official intelligent portfolio companion for 'THE MAKING OF ABDURRAHMAN'.\n"
        "STRICT KNOWLEDGE RULES:\n"
        "1. Answer questions about Abdurrahman Zarook strictly using the verified facts below.\n"
        "2. Never invent grades, GPA, certificates, repositories, or personal details.\n"
        "3. If a detail (like A/L subject grades or the 2nd pending certificate) is marked pending, state honestly that it is pending verification.\n\n"
        f"IDENTITY: {profile['full_name']} — {profile['headline']}\n"
        f"BIO: {profile['short_bio']}\n"
        f"LANGUAGES: English (Fluent), Tamil (Native), Sinhala (Fluent)\n"
        f"CONTACT: Email: {profile['email']} | GitHub: {profile['github_url']} | LinkedIn: {profile['linkedin_url']}\n\n"
        "EDUCATION:\n" + "\n".join(edu_lines) + "\n\n"
        "CERTIFICATIONS:\n" + "\n".join(cert_lines) + "\n\n"
        "EXPERIENCE:\n" + "\n".join(exp_lines) + "\n\n"
        "PROJECTS (12 Verified Total: 7 Completed, 5 Ongoing):\n" + "\n".join(proj_lines)
    )


async def check_ollama_or_aurevon_online() -> bool:
    try:
        async with httpx.AsyncClient(timeout=1.5) as client:
            res = await client.get(f"{settings.OLLAMA_BASE_URL.rstrip('/')}/api/tags")
            if res.status_code == 200:
                return True
    except Exception:
        pass
    return False


async def generate_aurevon_reply(
    user_message: str,
    mode: str = "portfolio",
    history: List[Dict[str, str]] = None,
) -> Dict[str, Any]:
    history = history or []

    if mode == "portfolio":
        system_prompt = build_portfolio_system_prompt()
        sources = [
            "Authoritative Portfolio Knowledge Graph",
            "Chapter 03: Education & Chapter 07: Projects",
        ]
    else:
        system_prompt = (
            "You are AUREVON AI operating in Mode 2 (General AI Assistant) inside Abdurrahman Zarook's portfolio book. "
            "Provide helpful, accurate technical or general answers while clearly distinguishing general AI knowledge from verified personal facts about Abdurrahman."
        )
        sources = ["AUREVON General Model Inference"]

    messages = [{"role": "system", "content": system_prompt}]
    for turn in history[-6:]:
        role = turn.get("role", "user")
        if role in ("user", "assistant"):
            messages.append({"role": role, "content": turn.get("content", "")})
    messages.append({"role": "user", "content": user_message})

    # 1. Try Local Ollama (`qwen2.5:3b`) directly using the same protocol as AUREVON-AI's OllamaProvider
    try:
        async with httpx.AsyncClient(timeout=12.0) as client:
            resp = await client.post(
                f"{settings.OLLAMA_BASE_URL.rstrip('/')}/api/chat",
                json={
                    "model": settings.DEFAULT_AI_MODEL,
                    "messages": messages,
                    "stream": False,
                    "options": {"temperature": 0.4 if mode == "portfolio" else 0.7},
                },
            )
            if resp.status_code == 200:
                data = resp.json()
                reply_text = data.get("message", {}).get("content", "").strip()
                if reply_text:
                    return {
                        "reply": reply_text,
                        "mode": mode,
                        "provider": "ollama",
                        "model": settings.DEFAULT_AI_MODEL,
                        "sources": sources,
                    }
    except Exception as exc:
        logger.info(f"Local Ollama not active ({exc}); using deterministic knowledge synthesis.")

    # 2. Try Cloud OpenAI-Compatible Provider if configured in production
    if settings.CLOUD_AI_API_KEY and settings.CLOUD_AI_PROVIDER:
        base_map = {
            "groq": "https://api.groq.com/openai/v1",
            "openai": "https://api.openai.com/v1",
            "deepseek": "https://api.deepseek.com/v1",
        }
        base_url = base_map.get(settings.CLOUD_AI_PROVIDER.lower(), "https://api.groq.com/openai/v1")
        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                resp = await client.post(
                    f"{base_url}/chat/completions",
                    headers={"Authorization": f"Bearer {settings.CLOUD_AI_API_KEY}"},
                    json={
                        "model": settings.CLOUD_AI_MODEL,
                        "messages": messages,
                        "temperature": 0.4,
                    },
                )
                if resp.status_code == 200:
                    data = resp.json()
                    reply_text = data["choices"][0]["message"]["content"].strip()
                    return {
                        "reply": reply_text,
                        "mode": mode,
                        "provider": settings.CLOUD_AI_PROVIDER,
                        "model": settings.CLOUD_AI_MODEL,
                        "sources": sources,
                    }
        except Exception as exc:
            logger.warning(f"Cloud AI provider call failed: {exc}")

    # 3. Deterministic Grounded Synthesis (100% accurate, zero hallucination)
    return synthesize_deterministic_answer(user_message, mode)


def synthesize_deterministic_answer(query: str, mode: str) -> Dict[str, Any]:
    q = query.lower()
    profile = AUTHORITATIVE_PORTFOLIO_BUNDLE["profile"]
    projects = AUTHORITATIVE_PORTFOLIO_BUNDLE["projects"]
    education = AUTHORITATIVE_PORTFOLIO_BUNDLE["education"]

    if mode == "general":
        return {
            "reply": (
                "**AUREVON AI (General Mode — Local Inference Standby)**\n\n"
                f"Local Ollama (`{settings.DEFAULT_AI_MODEL}`) is currently in standby mode on `{settings.OLLAMA_BASE_URL}`. "
                "When Ollama is running (`ollama run qwen2.5:3b`), this endpoint streams live general responses directly from your local model.\n\n"
                "Switch to **Mode 1: Portfolio Facts** at any time to query Abdurrahman Zarook's verified projects, education, and skills."
            ),
            "mode": "general",
            "provider": "aurevon-adapter",
            "model": f"{settings.DEFAULT_AI_MODEL} (standby)",
            "sources": ["AUREVON Runtime Status"],
        }

    if "federated" in q or "flower" in q:
        fm = next(p for p in projects if p["slug"] == "federated-mind")
        return {
            "reply": (
                f"**{fm['title']}** — *{fm['subtitle']}*\n\n"
                f"{fm['short_description']}\n\n"
                f"- **Architecture**: {fm['architecture_summary']}\n"
                f"- **Key Features**: {', '.join(fm['key_features'])}\n"
                f"- **Status**: {fm['status']} ({fm['year']})"
            ),
            "mode": "portfolio",
            "provider": "aurevon-knowledge-engine",
            "model": "verified-portfolio-graph",
            "sources": ["Chapter 07: Projects — FederatedMind"],
        }

    if "educat" in q or "nsbm" in q or "nibm" in q or "zahira" in q:
        lines = [
            f"- **{e['year']}**: {e['qualification']} — *{e['institution']}* ({e['results_summary']})"
            for e in education
        ]
        return {
            "reply": "**Abdurrahman Zarook's Verified Education Journey (Chapter 03):**\n\n" + "\n".join(lines),
            "mode": "portfolio",
            "provider": "aurevon-knowledge-engine",
            "model": "verified-portfolio-graph",
            "sources": ["Chapter 03: Education Journey"],
        }

    if "contact" in q or "email" in q or "reach" in q or "hire" in q:
        return {
            "reply": (
                "**Verified Contact Channels (Chapter 13):**\n\n"
                f"- **Email**: {profile['email']}\n"
                f"- **GitHub**: {profile['github_url']}\n"
                f"- **LinkedIn**: {profile['linkedin_url']}\n"
                f"- **CV**: Downloadable via `{profile['cv_url']}`"
            ),
            "mode": "portfolio",
            "provider": "aurevon-knowledge-engine",
            "model": "verified-portfolio-graph",
            "sources": ["Chapter 13: Contact"],
        }

    completed = [p for p in projects if p["status"] == "Completed"]
    ongoing = [p for p in projects if p["status"] != "Completed"]
    return {
        "reply": (
            f"**{profile['full_name']}** ({profile['headline']}) has built **{len(completed)} completed systems** "
            f"and is developing **{len(ongoing)} active AI & research projects**:\n\n"
            + "**Featured Projects:**\n"
            + "\n".join(
                f"- **{p['title']}** ({p['status']}): {p['short_description']}"
                for p in projects[:6]
            )
        ),
        "mode": "portfolio",
        "provider": "aurevon-knowledge-engine",
        "model": "verified-portfolio-graph",
        "sources": ["Chapter 01: Home", "Chapter 07: Projects"],
    }
