import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings
from backend.app.api.routes.portfolio import router as portfolio_router

logging.basicConfig(
    level=logging.INFO if settings.DEBUG else logging.WARNING,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)

app = FastAPI(
    title=settings.APP_NAME,
    description=(
        "Backend API for THE MAKING OF ABDURRAHMAN — Cinematic Interactive Digital Book Portfolio, "
        "featuring grounded AUREVON AI integration, Supabase schema compatibility, and Admin CMS."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(portfolio_router)


@app.get("/")
async def root():
    return {
        "title": "THE MAKING OF ABDURRAHMAN",
        "author": "Abdurrahman Zarook",
        "status": "online",
        "docs": "/docs",
        "api_base": "/api/v1",
    }
