from typing import List, Union
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from src.db import crud, models, schemas
from src.db.database import SessionLocal, engine 

from fastapi import FastAPI

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/books", response_model=List[schemas.Book])
def get_books(db: Session = Depends(get_db)):
    return crud.get_books(db=db)

@app.post("/books/new", response_model=schemas.Book)
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    return crud.create_book(db=db, book=book)

@app.put("/books/update", response_model=schemas.Book)
def update_book(updated_book: schemas.BookUpdate, db: Session = Depends(get_db)):
    return crud.update_book(db=db, updated_book=updated_book)

@app.delete("/books/delete/{id}")
def delete_book(id: int, db: Session = Depends(get_db)):
    return crud.delete_book(db=db, id=id)
