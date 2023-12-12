import { FC, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import { Book } from "../types/book";

interface BookInputProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

export const BookInput: FC<BookInputProps> = ({ books, setBooks }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    length: 0,
    read: false,
  });

  // Sets Title, Author, Genre, and Length
  const handleChange = (event: SelectChangeEvent) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Sets Read checkbox
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.checked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFormSubmit();
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/books/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Book created:", result);

      // Fetch the updated book list from the back-end and update the books state variable
      const booksResponse = await fetch("http://localhost:8000/books");
      if (!booksResponse.ok) {
        throw new Error(`HTTP error! Status: ${booksResponse.status}`);
      }
      const updatedBooks = await booksResponse.json();
      setBooks(updatedBooks);

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 1.5,
        }}
      >
        <FormControl component="fieldset" sx={{ width: "100%" }}>
          <Box sx={{ textAlign: "left" }}>
            <Typography variant="subtitle2" gutterBottom>
              New Book:
            </Typography>
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <TextField
                id="filled-basic"
                label="Title"
                variant="filled"
                sx={{ width: "100%" }}
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="filled-basic"
                label="Author"
                variant="filled"
                sx={{ width: "100%" }}
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={2}>
              <FormControl sx={{ width: 85, bgcolor: "#ECECEC" }}>
                <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.genre}
                  label="Genre"
                  onChange={handleChange}
                  name="genre"
                  required
                >
                  <MenuItem value={"Fiction"}>Fiction</MenuItem>
                  <MenuItem value={"Science Fiction"}>Science Fiction</MenuItem>
                  <MenuItem value={"Non-Fiction"}>Non-Fiction</MenuItem>
                  <MenuItem value={"Action"}>Action</MenuItem>
                  <MenuItem value={"Drama"}>Drama</MenuItem>
                  <MenuItem value={"Thriller"}>Thriller</MenuItem>
                  <MenuItem value={"Mystery"}>Mystery</MenuItem>
                  <MenuItem value={"Fantacy"}>Fantacy</MenuItem>
                  <MenuItem value={"Educational"}>Educational</MenuItem>
                  <MenuItem value={"Biography"}>Biography</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <TextField
                type="number"
                label="Length"
                InputProps={{
                  inputProps: { min: 0 },
                }}
                sx={{ width: "100%", bgcolor: "#ECECEC" }}
                name="length"
                value={formData.length || ""}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={2}>
              <FormControlLabel
                value="Read?"
                control={
                  <Checkbox
                    defaultChecked
                    sx={{
                      color: purple[300],
                      "&.Mui-checked": {
                        color: purple[400],
                      },
                    }}
                    name="read"
                    checked={formData.read}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Read?"
                labelPlacement="top"
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </form>
  );
};
