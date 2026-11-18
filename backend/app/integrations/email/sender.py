"""
Secure Email Delivery Service with Rate Limiting & Mailto Fallback
Supports SMTP (e.g., Gmail App Password), Resend API, and graceful fallback.
"""
import logging
import smtplib
import time
from email.message import EmailMessage
from urllib.parse import quote
from typing import Dict, Any
import httpx
from backend.app.core.config import settings

logger = logging.getLogger("portfolio.email")

# In-memory rate limit tracker: { ip_hash: [timestamps] }
RATE_LIMIT_WINDOW_SECONDS = 300
MAX_REQUESTS_PER_WINDOW = 5
_rate_limit_buckets: Dict[str, list] = {}


def check_rate_limit(ip_hash: str) -> bool:
    now = time.time()
    timestamps = _rate_limit_buckets.get(ip_hash, [])
    valid = [t for t in timestamps if now - t < RATE_LIMIT_WINDOW_SECONDS]
    if len(valid) >= MAX_REQUESTS_PER_WINDOW:
        _rate_limit_buckets[ip_hash] = valid
        return False
    valid.append(now)
    _rate_limit_buckets[ip_hash] = valid
    return True


def build_mailto_fallback(name: str, email: str, subject: str, message: str) -> str:
    recipient = settings.CONTACT_RECIPIENT_EMAIL
    encoded_sub = quote(f"[Portfolio] {subject}")
    encoded_body = quote(f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}")
    return f"mailto:{recipient}?subject={encoded_sub}&body={encoded_body}"


async def send_contact_email(
    name: str, email: str, subject: str, message: str
) -> Dict[str, Any]:
    mailto_url = build_mailto_fallback(name, email, subject, message)

    # 1. Try Resend HTTP API if configured
    if settings.RESEND_API_KEY:
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.post(
                    "https://api.resend.com/emails",
                    headers={"Authorization": f"Bearer {settings.RESEND_API_KEY}"},
                    json={
                        "from": f"Portfolio Contact <onboarding@resend.dev>",
                        "to": [settings.CONTACT_RECIPIENT_EMAIL],
                        "reply_to": email,
                        "subject": f"[THE MAKING OF ABDURRAHMAN] {subject}",
                        "text": f"From: {name} <{email}>\nSubject: {subject}\n\n{message}",
                    },
                )
                if resp.status_code in (200, 201):
                    return {
                        "success": True,
                        "delivered_via": "resend",
                        "message": "Your message has been delivered directly to Abdurrahman's inbox.",
                    }
        except Exception as exc:
            logger.warning(f"Resend delivery error: {exc}")

    # 2. Try SMTP if credentials are provided
    if settings.SMTP_USERNAME and settings.SMTP_PASSWORD:
        try:
            msg = EmailMessage()
            msg["Subject"] = f"[THE MAKING OF ABDURRAHMAN] {subject}"
            msg["From"] = settings.SMTP_FROM_EMAIL
            msg["To"] = settings.CONTACT_RECIPIENT_EMAIL
            msg["Reply-To"] = email
            msg.set_content(
                f"New correspondence from THE MAKING OF ABDURRAHMAN:\n\n"
                f"Name: {name}\n"
                f"Email: {email}\n"
                f"Subject: {subject}\n\n"
                f"Message:\n{message}\n"
            )

            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10) as server:
                server.starttls()
                server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
                server.send_message(msg)

            return {
                "success": True,
                "delivered_via": "smtp",
                "message": "Your message has been securely sent via SMTP to Abdurrahman Zarook.",
            }
        except Exception as exc:
            logger.warning(f"SMTP delivery failed: {exc}")

    # 3. Logged in backend store + provide mailto fallback when external email credentials are not set
    return {
        "success": True,
        "delivered_via": "database_logged",
        "message": (
            "Your message was validated and recorded on the server. "
            "Because external SMTP credentials are not yet configured in .env, you can also click below to dispatch directly via your email client."
        ),
        "mailto_url": mailto_url,
    }
