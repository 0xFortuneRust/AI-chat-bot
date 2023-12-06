import { FC, useState } from "react";
import { Book } from "../types/book";
import { DataGrid, GridColDef, GridFilterModel } from "@mui/x-data-grid";

export const BookTable: FC = () => {
  const [filterModel, setFilterModel] = useState<GridFilterModel>();

  const books: Book[] = [
    {
      title: "Dune",
      author: "Frank Herbert",
      genre: "Science-Fiction",
      length: 100,
      read: true,
      id: 0,
      date_added: "2023-12-04T03:28:26.646Z",
    },
    {
      title: "Chaos Walking",
      author: "Unknwoen",
      genre: "Adventure",
      length: 100,
      read: true,
      id: 1,
      date_added: "2023-12-04T03:28:26.646Z",
    },
    {
      title: "Bone",
      author: "Unkown",
      genre: "Adevnture",
      length: 300,
      read: true,
      id: 2,
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

  const handleFilterModelChange = (model: GridFilterModel) => {
    setFilterModel(model);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
        filterModel={filterModel}
        onFilterModelChange={handleFilterModelChange}
      />
    </div>
  );
};
