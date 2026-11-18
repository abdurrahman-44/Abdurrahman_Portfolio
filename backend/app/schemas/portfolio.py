from typing import List, Optional, Dict, Any
from pydantic import BaseModel, EmailStr, Field


class ContactRequestSchema(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    subject: str = Field(..., min_length=3, max_length=200)
    message: str = Field(..., min_length=10, max_length=4000)
    honeypot: Optional[str] = Field(default="")


class ContactResponseSchema(BaseModel):
    success: bool
    delivered_via: str
    message: str
    mailto_url: Optional[str] = None


class AdminLoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=128)


class AdminLoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    owner_email: str


class AurevonChatHistoryTurn(BaseModel):
    role: str
    content: str


class AurevonChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    mode: str = Field(default="portfolio", pattern="^(portfolio|general)$")
    history: List[AurevonChatHistoryTurn] = Field(default_factory=list)


class AurevonChatResponse(BaseModel):
    reply: str
    mode: str
    provider: str
    model: str
    sources: List[str]


class ProjectCreateUpdateSchema(BaseModel):
    id: Optional[str] = None
    slug: str
    title: str
    subtitle: str = ""
    short_description: str
    overview: str
    problem_statement: str = ""
    proposed_solution: str = ""
    key_features: List[str] = Field(default_factory=list)
    architecture_summary: str = ""
    development_challenges: str = ""
    category: str
    status: str = "Ongoing"
    is_featured: bool = False
    featured_order: int = 99
    technologies: List[str] = Field(default_factory=list)
    github_url: Optional[str] = None
    live_demo_url: Optional[str] = None
    year: str = "2026"
