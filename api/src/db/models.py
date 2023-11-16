from sqlalchemy import Boolean, Column, Integer, String, Date
from sqlalchemy.orm import relationship

from .database import Base


class Books(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    author = Column(String)
    genre = Column(String, nullable=True)
    length = Column(Integer, nullable=True)
    date_added = Column(Date)
    read = Column(Boolean, default=False)
