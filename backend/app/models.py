from sqlalchemy import Column, String, Integer, DateTime
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Link(Base):
    __tablename__ = "links"

    id = Column(Integer, primary_key=True, index=True)
    shortcode = Column(String, unique=True, index=True)
    deep_link = Column(String)
    fallback_url = Column(String)
    ios_store_url = Column(String)
    android_store_url = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
