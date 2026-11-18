from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Request, status
from backend.app.core.config import settings
from backend.app.database.store import (
    AUTHORITATIVE_PORTFOLIO_BUNDLE,
    CONTACT_SUBMISSIONS_LOG,
    get_portfolio_store,
)
from backend.app.schemas.portfolio import (
    ContactRequestSchema,
    ContactResponseSchema,
    AdminLoginRequest,
    AdminLoginResponse,
    AurevonChatRequest,
    AurevonChatResponse,
    ProjectCreateUpdateSchema,
)
from backend.app.security.auth import (
    verify_admin_credentials,
    create_admin_jwt,
    require_admin_user,
    hash_client_ip,
)
from backend.app.integrations.aurevon.adapter import (
    check_ollama_or_aurevon_online,
    generate_aurevon_reply,
)
from backend.app.integrations.email.sender import (
    check_rate_limit,
    send_contact_email,
)

router = APIRouter(prefix="/api/v1")


@router.get("/health", tags=["Health"])
async def health_check():
    aurevon_online = await check_ollama_or_aurevon_online()
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "aurevon_ollama_online": aurevon_online,
        "default_model": settings.DEFAULT_AI_MODEL,
    }


@router.get("/portfolio/bundle", tags=["Portfolio"])
async def get_full_portfolio_bundle():
    aurevon_online = await check_ollama_or_aurevon_online()
    return {
        "bundle": get_portfolio_store(),
        "aurevon_online": aurevon_online,
        "model": settings.DEFAULT_AI_MODEL,
    }


@router.get("/portfolio/projects", tags=["Portfolio"])
async def list_projects(featured_only: bool = False):
    projects = AUTHORITATIVE_PORTFOLIO_BUNDLE["projects"]
    if featured_only:
        projects = [p for p in projects if p.get("is_featured")]
    return {"projects": projects, "total": len(projects)}


@router.post("/contact", response_model=ContactResponseSchema, tags=["Contact"])
async def submit_contact_correspondence(
    payload: ContactRequestSchema, request: Request
):
    # Spam honeypot check
    if payload.honeypot and payload.honeypot.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Automated spam submission rejected.",
        )

    client_host = request.client.host if request.client else "127.0.0.1"
    ip_hash = hash_client_ip(client_host)

    if not check_rate_limit(ip_hash):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit exceeded. Please wait a few minutes before sending another message.",
        )

    delivery_result = await send_contact_email(
        name=payload.name.strip(),
        email=payload.email.strip(),
        subject=payload.subject.strip(),
        message=payload.message.strip(),
    )

    CONTACT_SUBMISSIONS_LOG.append(
        {
            "id": f"msg-{len(CONTACT_SUBMISSIONS_LOG) + 1}",
            "name": payload.name.strip(),
            "email": payload.email.strip(),
            "subject": payload.subject.strip(),
            "message": payload.message.strip(),
            "ip_hash": ip_hash,
            "delivered_via": delivery_result["delivered_via"],
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
    )

    return ContactResponseSchema(**delivery_result)


@router.post("/ai/chat", response_model=AurevonChatResponse, tags=["AUREVON AI"])
async def aurevon_chat_endpoint(payload: AurevonChatRequest):
    history_dicts = [
        {"role": h.role, "content": h.content} for h in payload.history
    ]
    result = await generate_aurevon_reply(
        user_message=payload.message,
        mode=payload.mode,
        history=history_dicts,
    )
    return AurevonChatResponse(**result)


@router.post("/admin/login", response_model=AdminLoginResponse, tags=["Admin"])
async def admin_login(payload: AdminLoginRequest):
    if not verify_admin_credentials(payload.email, payload.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid owner email or passkey.",
        )
    token = create_admin_jwt(payload.email)
    return AdminLoginResponse(access_token=token, owner_email=payload.email)


@router.get("/admin/messages", tags=["Admin"])
async def admin_list_contact_messages(admin_email: str = Depends(require_admin_user)):
    return {
        "owner": admin_email,
        "messages": CONTACT_SUBMISSIONS_LOG,
        "count": len(CONTACT_SUBMISSIONS_LOG),
    }


@router.post("/admin/projects", tags=["Admin"])
async def admin_upsert_project(
    project: ProjectCreateUpdateSchema,
    admin_email: str = Depends(require_admin_user),
):
    proj_dict = project.model_dump()
    if not proj_dict.get("id"):
        proj_dict["id"] = f"proj-{len(AUTHORITATIVE_PORTFOLIO_BUNDLE['projects']) + 1}"
    proj_dict["screenshots"] = []

    existing = AUTHORITATIVE_PORTFOLIO_BUNDLE["projects"]
    updated = False
    for idx, item in enumerate(existing):
        if item["id"] == proj_dict["id"] or item["slug"] == proj_dict["slug"]:
            existing[idx] = proj_dict
            updated = True
            break
    if not updated:
        existing.append(proj_dict)

    return {"status": "saved", "project": proj_dict, "updated_by": admin_email}
