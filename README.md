# THE MAKING OF ABDURRAHMAN

> *"Every chapter is a reflection of what I have learned. Every next page is an opportunity to build something greater."*

**THE MAKING OF ABDURRAHMAN** is an immersive, cinematic interactive digital book portfolio chronicling the academic, research, and software engineering journey of **Abdurrahman Zarook** — Artificial Intelligence Undergraduate at NSBM Green University, Software Engineering Diplomate (NIBM Kandy Campus), and creator of **AUREVON AI** and **FederatedMind**.

---

## ✨ Key Features

1. **Prologue: Cinematic Game-Inspired Loading Sequence**:
   - Real-time 0%–100% progress illumination, AUREVON AI synchronization indicator, book-opening transition, and a **Skip Prologue** button for returning visitors.
2. **Reusable Two-Page Digital Book Engine**:
   - **Desktop (`lg+`)**: Open two-page book spread (Verso & Recto) with central spine depth, stacked paper edges, 3D page-turn motion, and independent internal scrollbars for long chapters.
   - **Mobile & Tablet**: Responsive single-page book layout with touch-swipe page turning and compact accessible chapter drawer.
   - **Full Navigation Sync**: Direct chapter URLs (`/chapter/home` through `/chapter/contact`), browser Back/Forward history, and keyboard arrow navigation (`←` / `→`).
3. **Intentional Editorial Theme System**:
   - **Light Edition (*The Parchment Edition*)**: Warm ivory, cream, muted sage, soft charcoal, and subtle bronze.
   - **Dark Edition (*The Midnight Folio Edition*)**: Midnight charcoal, deep navy, muted grey, soft champagne, and muted sage.
4. **Interactive 3D Portrait Stage (Chapter 02)**:
   - Built with **Three.js**, **React Three Fiber**, and **Drei**. Preserves Abdurrahman's verified facial identity in a studio-lit 3D sculpture with mouse/touch rotation limits, idle breathing animation, 2D portrait toggle, and automatic `.glb` full-head mesh support.
5. **13 Verified Editorial Chapters**:
   - **Ch. 01 — Home**: Editorial frontispiece, animated typing roles, CV download, and AUREVON AI introduction.
   - **Ch. 02 — The Person Behind the Code**: 3D portrait stage, verified project breakdown (7 Completed, 5 Ongoing), trilingual fluency (English, Tamil, Sinhala), and 4 interactive soft-skill pillars.
   - **Ch. 03 — Education Journey**: Interactive growing educational tree (2021 O/L 6A 3B at Zahira National College → 2024 A/L → 2025 NIBM Diploma in Software Engineering → 2026–Present BSc Hons AI at NSBM Green University).
   - **Ch. 04 — Certifications**: NSBM Advanced Certificate for Computing + transparent pending slot for the second certificate.
   - **Ch. 05 — Experience**: Mathematics Tutor (March 2025–Present), IT Tutor (December 2025–Present), and Academic Project Leadership.
   - **Ch. 06 — Technology Arsenal**: 19 verified technologies across 7 categories linked directly to real repositories.
   - **Ch. 07 — Selected Works & Archive**: Configurable Featured showcase + full 12-project archive (`FederatedMind`, `AUREVON AI`, `Travel-Lanka AI`, `PechaVote`, `WAHDATH`, `AI Smart Attendance`, `GreenRoute AI`, `Gym`, `Employee`, `Library`, and `Hotel Management Systems`).
   - **Ch. 08 — Achievements**: Animated verified counters (`7+ Completed Projects`, `5+ Milestones`, `400+ Coding Hours`, `2 Certifications Tracked`).
   - **Ch. 09 — Services & Capabilities**: 6 honest technical contribution areas linked to reference projects.
   - **Ch. 10 — Technical & Personal Journal**: 6 full-length technical essays with category filtering and complete article reader.
   - **Ch. 11 — Perspectives**: Zero-fabrication endorsements registry with production visibility control.
   - **Ch. 12 — The Next Chapter**: Federated learning research roadmap, SLMs, and future concepts.
   - **Ch. 13 — Contact**: Verified links, CV download, and rate-limited contact form with SMTP/Resend delivery and `mailto:` fallback.
6. **Integrated AUREVON AI Companion**:
   - Dual-mode assistant (**Mode 1: Grounded Portfolio Facts** + **Mode 2: General AI Assistant** via Ollama `qwen2.5:3b` / cloud adapter).
7. **Owner Admin CMS (`/admin`)**:
   - JWT-protected administration dashboard to manage profile details, projects, featured ordering, certificates, journal essays, and approved testimonials.

---

## 🚀 Running on Windows 11

### 1. One-Command Launch (Frontend + Backend)
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run_dev.ps1
```
- **Digital Book Frontend**: `http://127.0.0.1:5175`
- **FastAPI Backend**: `http://127.0.0.1:8005`
- **Interactive API Docs**: `http://127.0.0.1:8005/docs`

### 2. Run Backend Automated Test Suite (`pytest`)
```powershell
$env:PYTHONPATH = "c:\Users\abdur\OneDrive\Desktop\Portfolio"
& "C:\Users\abdur\OneDrive\Desktop\AUREVON-AI\backend\.venv\Scripts\python.exe" -m pytest backend/tests/ -v
```

### 3. Build Frontend Production Bundle
```powershell
cd frontend
$env:PATH = "C:\Users\abdur\Downloads\NodeJs;$env:PATH"
npm run build
```
