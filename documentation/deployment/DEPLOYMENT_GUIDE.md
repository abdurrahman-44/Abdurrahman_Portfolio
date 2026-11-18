# THE MAKING OF ABDURRAHMAN — Production Deployment Guide

## 1. Architecture Overview
- **Frontend**: Deployed on **Vercel** (`frontend/` root directory).
- **Backend**: Deployed on **Render / Railway / Fly.io** (`backend/` FastAPI application).
- **Database**: **Supabase PostgreSQL** (`database/migrations/001_initial_schema.sql` + `database/seed/seed_portfolio.sql`).
- **AI Companion**: Connects to the server-side AUREVON AI adapter (supports self-hosted Ollama `qwen2.5:3b` or Groq/OpenAI cloud inference so the public website never attempts to connect to a visitor's local machine).

---

## 2. Step-by-Step Deployment

### Step 1 — Configure Supabase PostgreSQL
1. Create a new project in [Supabase](https://supabase.com).
2. Open the **SQL Editor** and execute `database/migrations/001_initial_schema.sql`. This creates all 13 tables (`profiles`, `education`, `certifications`, `experience`, `skills`, `projects`, `project_images`, `achievements`, `services`, `blog_posts`, `testimonials`, `contact_messages`, `ai_conversations`) and enables **Row Level Security (RLS)**.
3. Execute `database/seed/seed_portfolio.sql` to populate verified initial records.
4. Copy your `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` (keep the service role key strictly on the backend).

### Step 2 — Deploy FastAPI Backend
1. Host the repository on Render, Railway, or a Docker VPS.
2. Set the start command:
   ```bash
   uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT
   ```
3. Configure environment variables (see `.env.example`):
   - `SECRET_KEY`: Strong random string
   - `ADMIN_EMAIL`: `abdurrahmanzarook4455@gmail.com`
   - `ADMIN_INITIAL_PASSWORD`: Strong owner password
   - `CORS_ORIGINS`: Your Vercel production domain (e.g., `https://makingofabdurrahman.vercel.app`)
   - `RESEND_API_KEY` or `SMTP_USERNAME` / `SMTP_PASSWORD` for live email delivery
   - `CLOUD_AI_PROVIDER=groq` and `CLOUD_AI_API_KEY=...` (or a private hosted Ollama URL) for public AUREVON AI inference.

### Step 3 — Deploy React Frontend to Vercel
1. Import the GitHub repository into [Vercel](https://vercel.com).
2. Set the **Root Directory** to `frontend`.
3. Set Build Command: `npm run build` and Output Directory: `dist`.
4. Add `frontend/vercel.json` (already included) so direct chapter URLs (`/chapter/projects`, `/chapter/education`, `/admin`) resolve cleanly on refresh.
5. Set Environment Variable:
   - `VITE_API_BASE_URL=https://your-backend-domain.onrender.com/api/v1`
