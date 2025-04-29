from sqlalchemy.future import select
from .models import Link, User

async def create_link(db, link):
    db_link = Link(**link)
    db.add(db_link)
    await db.commit()
    await db.refresh(db_link)
    return db_link

async def get_link(db, shortcode):
    result = await db.execute(select(Link).where(Link.shortcode == shortcode))
    return result.scalars().first()

async def get_user_by_email(db, email: str):
    result = await db.execute(select(User).where(User.email == email))
    return result.scalars().first()
