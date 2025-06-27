from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from backend.models.user import User
from backend.database import get_db
from typing import Optional
import os

# Security
security = HTTPBearer()
SECRET_KEY = os.getenv("SECRET_KEY", "a1betting-secret-key-change-in-production")

class AuthService:
    """Authentication service for user management."""
    
    @staticmethod
    def create_user(db: Session, username: str, email: str, password: str, 
                   first_name: str = None, last_name: str = None) -> User:
        """Create a new user."""
        
        # Check if user already exists
        existing_user = db.query(User).filter(
            (User.username == username) | (User.email == email)
        ).first()
        
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username or email already registered"
            )
        
        # Create new user
        user = User(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name
        )
        user.set_password(password)
        
        db.add(user)
        db.commit()
        db.refresh(user)
        
        return user
    
    @staticmethod
    def authenticate_user(db: Session, username: str, password: str) -> Optional[User]:
        """Authenticate user with username/email and password."""
        
        user = db.query(User).filter(
            (User.username == username) | (User.email == username)
        ).first()
        
        if not user or not user.check_password(password):
            return None
        
        if not user.is_active:
            return None
        
        return user
    
    @staticmethod
    def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security),
                        db: Session = Depends(get_db)) -> User:
        """Get current authenticated user from JWT token."""
        
        token = credentials.credentials
        payload = User.verify_token(token, SECRET_KEY)
        
        if payload is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        user = db.query(User).filter(User.id == payload["user_id"]).first()
        
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Inactive user",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        return user
    
    @staticmethod
    def create_access_token(user: User) -> str:
        """Create access token for user."""
        return user.generate_token(SECRET_KEY)
