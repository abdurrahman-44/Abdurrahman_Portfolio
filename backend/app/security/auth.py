from datetime import datetime, timedelta, timezone
from typing import Optional
import hashlib
import hmac
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from backend.app.core.config import settings

security_scheme = HTTPBearer(auto_error=False)


def verify_admin_credentials(email: str, password: str) -> bool:
    expected_email = settings.ADMIN_EMAIL.strip().lower()
    expected_pw = settings.ADMIN_INITIAL_PASSWORD
    email_ok = hmac.compare_digest(email.strip().lower(), expected_email)
    pw_ok = hmac.compare_digest(password, expected_pw)
    return email_ok and pw_ok


def create_admin_jwt(email: str) -> str:
    now = datetime.now(timezone.utc)
    expire = now + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {
        "sub": email,
        "role": "owner_admin",
        "iat": int(now.timestamp()),
        "exp": int(expire.timestamp()),
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")


def require_admin_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_scheme),
) -> str:
    if not credentials or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing owner authorization token.",
        )
    try:
        decoded = jwt.decode(
            credentials.credentials, settings.SECRET_KEY, algorithms=["HS256"]
        )
        if decoded.get("role") != "owner_admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions.",
            )
        return decoded.get("sub", "")
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired owner token.",
        )


def hash_client_ip(ip: str) -> str:
    return hashlib.sha256(f"{ip}:{settings.SECRET_KEY}".encode("utf-8")).hexdigest()[:32]
