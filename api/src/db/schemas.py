from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class BookBase(BaseModel):
    title: str
    author: str
    genre: Optional[str] = None
    length: Optional[int] = None
    read: bool


class BookCreate(BookBase):
    pass


class BookUpdate(BookBase):
    id: int


class Book(BookBase):
    id: int
    date_added: datetime

    class Config:
        orm_mode = True
