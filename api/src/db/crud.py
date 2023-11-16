from datetime import datetime
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from . import models, schemas

def get_book(db: Session, id: int):
    return db.query(models.Books).filter(models.Books.id == id).first()


def get_books(db: Session):
    return db.query(models.Books).all()


def create_book(db: Session, book: schemas.BookCreate):
    db_book = models.Books(
        title=book.title, 
        author=book.author, 
        genre=book.genre, 
        length=book.length, 
        read=book.read,
        date_added=datetime.now()
    )
    print(db_book)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def update_book(db: Session, updated_book: schemas.BookUpdate):
    book = db.query(models.Books).filter(models.Books.id == updated_book.id).first()

    if not book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")
    
    for field, value in updated_book.dict().items():
        setattr(book, field, value)

    try:
        db.commit()
        db.refresh(book)
        return book
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error updating book: {str(e)}")


def delete_book(db: Session, id: int):
    book = db.query(models.Books).filter(models.Books.id == id).first()

    if not book:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Book not found"
        )

    try:
        db.delete(book)
        db.commit()
        return {"message": "Book deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail=f"Error deleting book: {str(e)}"
        )

