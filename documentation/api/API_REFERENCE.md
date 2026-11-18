# THE MAKING OF ABDURRAHMAN — REST API Reference

Base URL (Local Development): `http://127.0.0.1:8005/api/v1`  
Interactive Swagger UI: `http://127.0.0.1:8005/docs`

---

## 1. Public Endpoints

### `GET /api/v1/health`
Returns service health, active AI model configuration (`qwen2.5:3b`), and whether the local Ollama / AUREVON runtime is reachable.

### `GET /api/v1/portfolio/bundle`
Returns the complete verified portfolio dataset across all 13 chapters (`profile`, `education`, `certifications`, `experience`, `skills`, `projects`, `achievements`, `services`, `journal`, `testimonials`, `next_chapter`).

### `GET /api/v1/portfolio/projects?featured_only=false`
Returns the verified projects list (7 completed, 5 ongoing/research).

### `POST /api/v1/contact`
Validates and dispatches a contact form submission.
- **Request Body**:
  ```json
  {
    "name": "Sender Name",
    "email": "sender@example.com",
    "subject": "Collaboration Inquiry",
    "message": "Your message (10–4000 chars)",
    "honeypot": ""
  }
  ```
- **Protections**: Email format validation, honeypot spam trap, per-IP SHA-256 rate limiting (max 5 requests per 5 minutes), SMTP/Resend delivery, and `mailto:` fallback URL generation.

### `POST /api/v1/ai/chat`
Communicates with the AUREVON AI Companion.
- **Request Body**:
  ```json
  {
    "message": "What is FederatedMind?",
    "mode": "portfolio",
    "history": []
  }
  ```

---

## 2. Protected Owner Admin Endpoints

### `POST /api/v1/admin/login`
Authenticates the portfolio owner (`ADMIN_EMAIL` and `ADMIN_INITIAL_PASSWORD`) and returns a signed HS256 JWT bearer token.

### `GET /api/v1/admin/messages`
Requires `Authorization: Bearer <token>`. Lists private contact submissions.

### `POST /api/v1/admin/projects`
Requires `Authorization: Bearer <token>`. Creates or updates a project and its featured status/order.
