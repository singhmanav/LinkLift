from pydantic import BaseModel
from typing import Optional

class LinkCreate(BaseModel):
    deep_link: str
    fallback_url: str
    ios_store_url: Optional[str]
    android_store_url: Optional[str]
    custom_alias: Optional[str] = None

class LinkOut(BaseModel):
    shortcode: str
    deep_link: str
    fallback_url: str

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
