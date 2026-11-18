import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.core.config import settings

client = TestClient(app)


def test_root_and_health():
    r_root = client.get("/")
    assert r_root.status_code == 200
    assert r_root.json()["title"] == "THE MAKING OF ABDURRAHMAN"

    r_health = client.get("/api/v1/health")
    assert r_health.status_code == 200
    assert r_health.json()["status"] == "healthy"


def test_portfolio_bundle_and_verified_projects():
    res = client.get("/api/v1/portfolio/bundle")
    assert res.status_code == 200
    bundle = res.json()["bundle"]
    assert bundle["profile"]["full_name"] == "Abdurrahman Zarook"
    assert len(bundle["projects"]) >= 12

    # Check FederatedMind and completed vs ongoing classification
    fm = next(p for p in bundle["projects"] if p["slug"] == "federated-mind")
    assert fm["status"] == "Ongoing"
    tl = next(p for p in bundle["projects"] if p["slug"] == "travel-lanka-ai")
    assert tl["status"] == "Completed"


def test_aurevon_portfolio_and_general_modes():
    # Mode 1: Portfolio question about FederatedMind
    r1 = client.post(
        "/api/v1/ai/chat",
        json={"message": "What is FederatedMind?", "mode": "portfolio", "history": []},
    )
    assert r1.status_code == 200
    data1 = r1.json()
    assert "FederatedMind" in data1["reply"]
    assert "Flower" in data1["reply"] or "PyTorch" in data1["reply"]

    # Mode 1: Education question
    r2 = client.post(
        "/api/v1/ai/chat",
        json={"message": "Explain his education journey.", "mode": "portfolio", "history": []},
    )
    assert r2.status_code == 200
    assert "NSBM Green University" in r2.json()["reply"]
    assert "Zahira National College" in r2.json()["reply"]


def test_contact_validation_and_delivery():
    # Valid contact submission
    res = client.post(
        "/api/v1/contact",
        json={
            "name": "Test Collaborator",
            "email": "collaborator@example.com",
            "subject": "AI Research Inquiry",
            "message": "Hello Abdurrahman, I would love to discuss FederatedMind.",
            "honeypot": "",
        },
    )
    assert res.status_code == 200
    body = res.json()
    assert body["success"] is True

    # Spam honeypot rejection
    res_spam = client.post(
        "/api/v1/contact",
        json={
            "name": "Spammer",
            "email": "spam@example.com",
            "subject": "Spam",
            "message": "Automated spam payload.",
            "honeypot": "http://spam-link.example",
        },
    )
    assert res_spam.status_code == 400


def test_admin_authentication_and_protected_routes():
    # Unauthorized access to contact messages must fail
    r_unauth = client.get("/api/v1/admin/messages")
    assert r_unauth.status_code == 401

    # Valid owner login
    r_login = client.post(
        "/api/v1/admin/login",
        json={
            "email": settings.ADMIN_EMAIL,
            "password": settings.ADMIN_INITIAL_PASSWORD,
        },
    )
    assert r_login.status_code == 200
    token = r_login.json()["access_token"]

    # Authorized access with Bearer JWT
    r_auth = client.get(
        "/api/v1/admin/messages",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert r_auth.status_code == 200
    assert r_auth.json()["count"] >= 1
