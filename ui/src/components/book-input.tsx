import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { purple, blue } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import { useState } from "react";

export const BookInput = () => {
  const [genre, setGenre] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setGenre(event.target.value as string);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 1.5,
      }}
    >
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
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            id="filled-basic"
            label="Author"
            variant="filled"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={2}>
          <FormControl sx={{ width: 85, bgcolor: "#ECECEC" }}>
            <InputLabel id="demo-simple-select-label">Genre</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={genre}
              label="Genre"
              onChange={handleChange}
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
            label="Pages"
            InputProps={{
              inputProps: { min: 0 },
            }}
            sx={{ width: "100%", bgcolor: "#ECECEC" }}
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
              />
            }
            label="Read?"
            labelPlacement="top"
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained">Submit</Button>
        </Grid>
      </Grid>
    </Box>
  );
};
