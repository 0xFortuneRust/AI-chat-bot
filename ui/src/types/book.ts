export interface Book {
  title: string;
  author: string;
  genre: string;
  length: number;
  read: boolean;
  id: number;
  date_added: string;
  isNew?: boolean;
  readToggleChanged?: boolean;
}

export interface BookCreate {
  title: string;
  author: string;
  genre: string;
  length: number;
  read: boolean;
}
