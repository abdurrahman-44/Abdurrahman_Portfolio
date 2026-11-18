from typing import List, Union
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator
import os


class Settings(BaseSettings):
    APP_NAME: str = "THE MAKING OF ABDURRAHMAN API"
    APP_ENV: str = "development"
    DEBUG: bool = True
    HOST: str = "127.0.0.1"
    PORT: int = 8005

    CORS_ORIGINS: Union[List[str], str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
    ]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",") if i.strip()]
        if isinstance(v, list):
            return v
        return ["http://localhost:5175", "http://127.0.0.1:5175"]

    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./portfolio.db"
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""

    # Admin Security
    SECRET_KEY: str = "dev-making-of-abdurrahman-secret-key-change-in-prod"
    ADMIN_EMAIL: str = "abdurrahmanzarook4455@gmail.com"
    ADMIN_INITIAL_PASSWORD: str = "AbdurrahmanAdmin2026!"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 720

    # AUREVON AI & Ollama Connection
    AUREVON_BACKEND_URL: str = "http://127.0.0.1:8000/api"
    OLLAMA_BASE_URL: str = "http://127.0.0.1:11434"
    DEFAULT_AI_MODEL: str = "qwen2.5:3b"
    CLOUD_AI_PROVIDER: str = ""
    CLOUD_AI_API_KEY: str = ""
    CLOUD_AI_MODEL: str = "llama-3.3-70b-versatile"

    # Email Delivery
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USERNAME: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM_EMAIL: str = "abdurrahmanzarook4455@gmail.com"
    CONTACT_RECIPIENT_EMAIL: str = "abdurrahmanzarook4455@gmail.com"
    RESEND_API_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))),
            ".env",
        ),
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
