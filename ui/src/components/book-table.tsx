import { FC, useEffect, useState } from "react";
import { Book } from "../types/book";
import { DataGrid, GridColDef, GridFilterModel } from "@mui/x-data-grid";
import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface BookTableProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

export const BookTable: FC<BookTableProps> = ({ books, setBooks }) => {
  const [filterModel, setFilterModel] = useState<GridFilterModel>();

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:8000/books");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleFilterModelChange = (model: GridFilterModel) => {
    setFilterModel(model);
  };

  const handleReadToggle = async (id: number, newBook: Book) => {
    try {
      const response = await fetch("http://localhost:8000/books/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update the state with the new read status
      const updatedBooks = books.map((book) =>
        book.id === newBook.id ? { ...book, read: !newBook.read } : book
      );
      setBooks(updatedBooks);

      console.log(`Updated read status for book with id ${newBook.id}`);
    } catch (error) {
      console.error(
        `Error updating read status for book with id ${newBook.id}:`,
        error
      );
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/books/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Remove the deleted book from the state
      const updatedBooks = books.filter((book) => book.id !== id);
      setBooks(updatedBooks);

      console.log(`Deleted book with id: ${id}`);
    } catch (error) {
      console.error(`Error deleting book with id ${id}:`, error);
    }
  };

  const rows = books.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    length: book.length,
    read: book.read,
    date: book.date_added,
  }));

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      type: "string",
      width: 150,
      editable: true,
    },
    {
      field: "author",
      headerName: "Author",
      type: "string",
      width: 150,
      editable: true,
    },
    {
      field: "genre",
      headerName: "Genre",
      type: "string",
      width: 130,
      editable: true,
    },
    {
      field: "length",
      headerName: "Length",
      type: "string",
      width: 110,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date Added",
      type: "string",
      width: 110,
      editable: true,
    },
    {
      field: "read",
      headerName: "Read",
      type: "bool",
      width: 70,
      renderCell: (params) => (
        <Checkbox
          checked={params.value as boolean}
          onChange={() => {
            // handleReadToggle(params.id as number, !params.value as boolean)
            const book = params.row as Book;
            handleReadToggle(params.id as number, book);
          }}
        />
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      type: "bool",
      width: 70,
      renderCell: (params) => (
        <IconButton
          color="secondary"
          onClick={() => handleDelete(params.id as number)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        filterModel={filterModel}
        onFilterModelChange={handleFilterModelChange}
      />
    </div>
  );
};
