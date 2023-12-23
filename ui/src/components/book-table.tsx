import * as React from "react";
import { Book } from "../types/book";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { FC, useEffect, useState } from "react";

interface BookTableProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add book
      </Button>
    </GridToolbarContainer>
  );
}

export const BookTable: FC<BookTableProps> = ({ books, setBooks }) => {
  const [rows, setRows] = React.useState<Book[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    length: 0,
    read: false,
  });

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
      setRows(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

    // try {
    //   // Get the edited row
    //   const editedRow = rows.find((row) => row.id === id);
    //   console.log(editedRow);
    //   // Get the values in the cells of the row
    //   const newBook = {};

    //   // If the row is marked as new, it means it's an added book
    //   if (editedRow.isNew) {
    //     // Submit the form data for the new book
    //     await fetch("http://localhost:8000/books/new", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(editedRow),
    //     });

    //     // Fetch the updated book list from the back-end and update the books state variable
    //     const booksResponse = await fetch("http://localhost:8000/books");
    //     if (!booksResponse.ok) {
    //       throw new Error(`HTTP error! Status: ${booksResponse.status}`);
    //     }
    //     const updatedBooks = await booksResponse.json();
    //     setBooks(updatedBooks);
    //   }

    //   // Reset the form after successful submission
    //   setFormData({
    //     title: "",
    //     author: "",
    //     genre: "",
    //     length: 0,
    //     read: false,
    //   });
    // } catch (error) {
    //   console.error("Error creating book:", error);
    // }
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));

    // Make API request to delete
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    // Make API request to update
    try {
      // If the row is marked as new, it means it's an added book
      if (newRow.isNew) {
        // Create a copy of the newRow without the isNew field
        const bookWithoutIsNew = { ...newRow };
        delete bookWithoutIsNew.isNew;
        console.log(bookWithoutIsNew);

        // Submit the form data for the new book
        await fetch("http://localhost:8000/books/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookWithoutIsNew),
        });

        // Fetch the updated book list from the back-end and update the books state variable
        const booksResponse = await fetch("http://localhost:8000/books");
        if (!booksResponse.ok) {
          throw new Error(`HTTP error! Status: ${booksResponse.status}`);
        }
        const updatedBooks = await booksResponse.json();
        setBooks(updatedBooks);
      }

      // Reset the form after successful submission
      setFormData({
        title: "",
        author: "",
        genre: "",
        length: 0,
        read: false,
      });
    } catch (error) {
      console.error("Error creating book:", error);
    }

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleAddBookClick = () => {
    const newId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 1;
    const newBook = { id: newId, isNew: true };

    setRows((oldRows) => [...oldRows, newBook]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [newId]: { mode: GridRowModes.Edit, fieldToFocus: "title" },
    }));
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      type: "string",
      width: 130,
      align: "left",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "author",
      headerName: "Author",
      type: "string",
      width: 130,
      align: "left",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "genre",
      headerName: "Genre",
      width: 130,
      align: "left",
      headerAlign: "center",
      editable: true,
      type: "singleSelect",
      valueOptions: [
        "Fiction",
        "Non-Fiction",
        "Action Adventure",
        "Romance",
        "Drama",
        "Thriller",
        "Horror",
        "Education",
        "Self-help",
        "Biography",
      ],
    },
    {
      field: "length",
      headerName: "Length",
      type: "number",
      width: 130,
      align: "left",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "date_added",
      headerName: "Date Added",
      type: "string",
      width: 130,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 115,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: () => (
            <GridToolbarContainer>
              <Button
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddBookClick}
              >
                Add book
              </Button>
            </GridToolbarContainer>
          ),
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
};
