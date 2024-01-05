import { Book, BookCreate } from "../types/book";
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
  GridRowsProp,
  GridRowModesModel,
  GridEventListener,
  GridRowId,
  GridCellParams,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { FC, useEffect, useState } from "react";
import { areBooksEqual } from "../utils/object-equality";
import { Checkbox } from "@mui/material";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleNewBookClick = () => {
    // Create temporary ID and set Read to false by default
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, isNew: true, read: false }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleNewBookClick}
      >
        Add book
      </Button>
    </GridToolbarContainer>
  );
}

export const BookTable: FC = () => {
  const [rows, setRows] = useState<Book[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

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

      // Update the rows state variable with the fetched data
      setRows(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    // Make API request to delete
    try {
      const response = await fetch(`http://localhost:8000/books/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(`Deleted book with id: ${id}`);
    } catch (error) {
      console.error(`Error deleting book with id ${id}:`, error);
    }

    // Update rows state variable to disclude the deleted book
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: Book) => {
    const currentRow = rows.find((book) => book.id === newRow.id);

    console.log(currentRow, newRow);
    if (
      areBooksEqual(currentRow as Book, newRow) &&
      !currentRow?.readToggleChanged
    ) {
      return currentRow;
    }

    if (currentRow?.isNew) {
      // Create book with POST
      const newBook: BookCreate = {
        title: newRow.title,
        author: newRow.author,
        genre: newRow.genre,
        length: newRow.length,
        read: newRow.read,
      };

      return fetch("http://localhost:8000/books/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: Book) => {
          setRows((oldRows) => {
            return oldRows.map((row) => {
              if (row.id == newRow.id) {
                return data;
              }
              return row;
            });
          });
          return newRow;
        })
        .catch((error) => {
          console.error(`Error creating book with id ${newRow.id}:`, error);
        });
    } else {
      // Update book with PUT
      console.log(`Updated Read value: ${newRow.read}.`);
      return fetch("http://localhost:8000/books/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRow),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.error(`Error updating book with id ${newRow.id}:`, error);
        });
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleReadToggle = (id: GridRowId, checked: boolean) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.id === id) {
          return !row?.readToggleChanged
            ? { ...row, read: checked, readToggleChanged: true }
            : { ...row, read: checked, readToggleChanged: false };
        }
        return row;
      });
      return updatedRows;
    });
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 200,
      type: "string",
      align: "center" as const,
      headerAlign: "center" as const,
      editable: true,
    },
    {
      field: "author",
      headerName: "Author",
      width: 145,
      type: "string",
      align: "center" as const,
      headerAlign: "center" as const,
      editable: true,
    },
    {
      field: "genre",
      headerName: "Genre",
      width: 130,
      align: "center" as const,
      headerAlign: "center" as const,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        "Fiction",
        "Nonfiction",
        "Science Fiction",
        "Action Adventure",
        "Romance",
        "Drama",
        "Thriller",
        "Mystery",
        "Philosophy",
        "Educational",
        "Self Betterment",
        "Biography",
      ],
    },
    {
      field: "length",
      headerName: "Length",
      width: 60,
      type: "number",
      align: "center" as const,
      headerAlign: "center" as const,
      editable: true,
      valueParser: (value: string) => {
        const parsedValue = parseFloat(value);
        return isNaN(parsedValue) || parsedValue < 0 ? null : parsedValue;
      },
      valueFormatter: (params: { value: number | null }) => {
        return params.value !== null ? params.value?.toString() : "";
      },
    },
    {
      field: "read",
      headerName: "Read",
      width: 60,
      type: "bool",
      align: "center" as const,
      headerAlign: "center" as const,
      renderCell: (params: GridCellParams) => {
        const isRowInEditMode =
          rowModesModel[params.id as GridRowId]?.mode === GridRowModes.Edit;

        return (
          <Checkbox
            checked={params.value as boolean}
            onChange={(e) =>
              handleReadToggle(params.id as GridRowId, e.target.checked)
            }
            disabled={!isRowInEditMode}
          />
        );
      },
    },
    {
      field: "date_added",
      headerName: "Date Added",
      width: 100,
      type: "string",
      align: "center" as const,
      headerAlign: "center" as const,
      valueFormatter: (params: { value: string | null }) => {
        if (params.value !== null) {
          const dateObject = new Date(params?.value);
          return dateObject.toLocaleDateString() !== "Invalid Date"
            ? dateObject.toLocaleDateString()
            : "";
        }
        return "";
      },
    },
    {
      field: "actions",
      width: 70,
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      getActions: ({ id }: { id: string }) => {
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
        // height: 700,
        height: "100%",
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
        autoHeight
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
};
