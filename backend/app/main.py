from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from .database import get_db, Base, engine
from . import models, crud, auth, schemas
from sqlalchemy.ext.asyncio import AsyncSession
import random, string

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

origins = ["*"]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["*"], allow_headers=["*"])

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.post("/token", response_model=schemas.Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    user = await crud.get_user_by_email(db, form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

async def get_current_user(db: AsyncSession = Depends(get_db), token: str = Depends(oauth2_scheme)):
    token_data = auth.decode_token(token)
    if not token_data or not token_data.email:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")
    user = await crud.get_user_by_email(db, token_data.email)
    if not user:
        raise HTTPException(status_code=400, detail="User not found")
    return user

@app.post("/links", response_model=schemas.LinkOut)
async def create_dynamic_link(link: schemas.LinkCreate, db: AsyncSession = Depends(get_db), user=Depends(get_current_user)):
    shortcode = link.custom_alias or ''.join(random.choices(string.ascii_letters + string.digits, k=6))
    link_data = link.dict(exclude={"custom_alias"})
    link_data.update({"shortcode": shortcode})
    db_link = await crud.create_link(db, link_data)
    return db_link

@app.get("/{shortcode}")
async def redirect_link(shortcode: str, db: AsyncSession = Depends(get_db)):
    link = await crud.get_link(db, shortcode)
    if not link:
        raise HTTPException(status_code=404, detail="Link not found")
    return {"deep_link": link.deep_link, "fallback_url": link.fallback_url}
