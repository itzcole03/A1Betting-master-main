#!/usr/bin/env python3
"""
Complete the authentication system for A1Betting application.
This script creates a comprehensive JWT-based authentication system.
"""

import logging
import os
from pathlib import Path

logger = logging.getLogger(__name__)


def create_backend_auth_system():
    """Create complete backend authentication system."""

    # Create backend/models directory if it doesn't exist
    models_dir = Path("backend/models")
    models_dir.mkdir(exist_ok=True)

    # Create __init__.py for models package
    init_file = models_dir / "__init__.py"
    if not init_file.exists():
        init_file.write_text("")

    # Create User model
    user_model = '''from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
from typing import Optional

Base = declarative_base()

class User(Base):
    """User model for authentication and user management."""
    
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    first_name = Column(String(50))
    last_name = Column(String(50))
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def set_password(self, password: str):
        """Set password hash."""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password: str) -> bool:
        """Check if provided password matches hash."""
        return check_password_hash(self.password_hash, password)
    
    def generate_token(self, secret_key: str, expires_delta: Optional[timedelta] = None) -> str:
        """Generate JWT token for user."""
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(hours=24)
        
        payload = {
            "user_id": self.id,
            "username": self.username,
            "email": self.email,
            "exp": expire,
            "iat": datetime.utcnow()
        }
        
        return jwt.encode(payload, secret_key, algorithm="HS256")
    
    @staticmethod
    def verify_token(token: str, secret_key: str) -> Optional[dict]:
        """Verify JWT token and return payload."""
        try:
            payload = jwt.decode(token, secret_key, algorithms=["HS256"])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
    
    def to_dict(self) -> dict:
        """Convert user object to dictionary."""
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "is_active": self.is_active,
            "is_verified": self.is_verified,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }
'''

    with open(models_dir / "user.py", "w", encoding="utf-8") as f:
        f.write(user_model)

    # Create authentication service
    auth_service = '''from fastapi import HTTPException, Depends, status
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
'''

    with open("backend/auth.py", "w", encoding="utf-8") as f:
        f.write(auth_service)

    # Create database configuration
    database_config = '''from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Database URL
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/a1betting")

# Create engine
engine = create_engine(DATABASE_URL)

# Create session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create all tables
def create_tables():
    """Create all database tables."""
    Base.metadata.create_all(bind=engine)
'''

    with open("backend/database.py", "w", encoding="utf-8") as f:
        f.write(database_config)

    logger.info("✅ Backend authentication system created")


def create_auth_endpoints():
    """Add authentication endpoints to main.py or simple_healthy_backend.py."""

    # Check which backend file to modify
    main_file = Path("backend/main.py")
    simple_file = Path("backend/simple_healthy_backend.py")

    target_file = main_file if main_file.exists() else simple_file

    if not target_file.exists():
        logger.error("❌ No backend file found to add auth endpoints")
        return

    # Read existing content
    with open(target_file, "r", encoding="utf-8") as f:
        content = f.read()

    # Add auth endpoints if not already present
    if "/auth/login" not in content:
        auth_endpoints = '''
from backend.auth import AuthService
from backend.database import get_db
from backend.models.user import User
from sqlalchemy.orm import Session
from pydantic import BaseModel
from fastapi import Depends, HTTPException, status

# Pydantic models for requests
class UserRegistration(BaseModel):
    username: str
    email: str
    password: str
    first_name: str = None
    last_name: str = None

class UserLogin(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict

# Authentication endpoints
@app.post("/auth/register", response_model=TokenResponse)
async def register_user(user_data: UserRegistration, db: Session = Depends(get_db)):
    """Register a new user."""
    try:
        user = AuthService.create_user(
            db=db,
            username=user_data.username,
            email=user_data.email,
            password=user_data.password,
            first_name=user_data.first_name,
            last_name=user_data.last_name
        )
        
        token = AuthService.create_access_token(user)
        
        return TokenResponse(
            access_token=token,
            token_type="bearer",
            user=user.to_dict()
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@app.post("/auth/login", response_model=TokenResponse)
async def login_user(login_data: UserLogin, db: Session = Depends(get_db)):
    """Login user and return access token."""
    user = AuthService.authenticate_user(
        db=db,
        username=login_data.username,
        password=login_data.password
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = AuthService.create_access_token(user)
    
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=user.to_dict()
    )

@app.get("/auth/me")
async def get_current_user_info(current_user: User = Depends(AuthService.get_current_user)):
    """Get current user information."""
    return current_user.to_dict()

@app.get("/api/user/profile")
async def get_user_profile(current_user: User = Depends(AuthService.get_current_user)):
    """Get user profile information."""
    return current_user.to_dict()
'''

        # Insert auth endpoints before the main block
        if "if __name__ ==" in content:
            parts = content.split("if __name__ ==")
            content = parts[0] + auth_endpoints + "\n\nif __name__ ==" + parts[1]
        else:
            content += auth_endpoints

        # Write back to file
        with open(target_file, "w", encoding="utf-8") as f:
            f.write(content)

        logger.info(f"✅ Auth endpoints added to {target_file}")


def create_frontend_auth_components():
    """Create frontend authentication components."""

    # Create frontend directories
    frontend_src = Path("frontend/src")
    components_dir = frontend_src / "components"
    auth_dir = frontend_src / "auth"

    for directory in [frontend_src, components_dir, auth_dir]:
        directory.mkdir(exist_ok=True)

    # Create AuthContext
    auth_context = """import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Verify token and get user info
      fetch('/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          logout();
          throw new Error('Token validation failed');
        }
      })
      .then(userData => {
        setUser(userData);
      })
      .catch(error => {
        console.error('Auth verification failed:', error);
        logout();
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.access_token);
        setUser(data.user);
        localStorage.setItem('token', data.access_token);
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.detail };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.access_token);
        setUser(data.user);
        localStorage.setItem('token', data.access_token);
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.detail };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
"""

    with open(auth_dir / "AuthContext.jsx", "w", encoding="utf-8") as f:
        f.write(auth_context)

    # Create Login component
    login_component = """import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.username, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to A1Betting
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="username" className="sr-only">
              Username or Email
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username or Email"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => navigate('/register')}
              >
                Sign up
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
"""

    with open(components_dir / "Login.jsx", "w", encoding="utf-8") as f:
        f.write(login_component)

    # Create Register component
    register_component = """import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      first_name: formData.first_name,
      last_name: formData.last_name,
    });
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your A1Betting account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="sr-only">First Name</label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="last_name" className="sr-only">Last Name</label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => navigate('/login')}
              >
                Sign in
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
"""

    with open(components_dir / "Register.jsx", "w", encoding="utf-8") as f:
        f.write(register_component)

    logger.info("✅ Frontend authentication components created")


def main():
    """Main function to complete authentication system."""
    logging.basicConfig(level=logging.INFO)

    logger.info("🔐 Starting authentication system completion...")

    try:
        # Create backend authentication system
        create_backend_auth_system()

        # Add auth endpoints to backend
        create_auth_endpoints()

        # Create frontend auth components
        create_frontend_auth_components()

        logger.info("✅ Authentication system completion successful!")
        logger.info("📋 Next steps:")
        logger.info(
            "   1. Install required dependencies: pip install sqlalchemy psycopg2-binary PyJWT werkzeug"
        )
        logger.info("   2. Run database migrations to create tables")
        logger.info("   3. Test authentication endpoints")

        return True

    except Exception as e:
        logger.error(f"❌ Authentication system completion failed: {e}")
        return False


if __name__ == "__main__":
    main()
