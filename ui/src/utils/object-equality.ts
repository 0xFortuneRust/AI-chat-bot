import { Book } from "../types/book";

export function areBooksEqual(book1: Book, book2: Book): boolean {
  return (
    book1.title === book2.title &&
    book1.author === book2.author &&
    book1.genre === book2.genre &&
    book1.length === book2.length &&
    book1.read === book2.read &&
    book1.id === book2.id &&
    book1.date_added === book2.date_added &&
    book1.isNew === book2.isNew &&
    book1.readToggleChanged === book2.readToggleChanged
  );
}
