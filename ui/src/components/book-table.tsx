import { List } from "@mui/material";
import { FC } from "react";
import { Book } from "../types/book";
import { BookRow } from "./book-row";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

export const BookTable: FC = () => {
  const books: Book[] = [
    {
      title: "string",
      author: "string",
      genre: "string",
      length: 0,
      read: true,
      id: 0,
      date_added: "2023-12-04T03:28:26.646Z",
    },
    {
      title: "string",
      author: "string",
      genre: "string",
      length: 0,
      read: true,
      id: 0,
      date_added: "2023-12-04T03:28:26.646Z",
    },
    {
      title: "string",
      author: "string",
      genre: "string",
      length: 0,
      read: true,
      id: 0,
      date_added: "2023-12-04T03:28:26.646Z",
    },
  ];

  const rows = books.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    length: book.length,
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
      width: 110,
      editable: true,
    },
    {
      field: "length",
      headerName: "Length",
      type: "number",
      width: 110,
      editable: true,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};
