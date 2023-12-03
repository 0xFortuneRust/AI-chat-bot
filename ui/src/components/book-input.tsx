import {
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
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <TextField id="filled-basic" label="Title" variant="filled" />
      </Grid>
      <Grid item xs={2}>
        <TextField id="filled-basic" label="Author" variant="filled" />
      </Grid>
      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Genre</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={genre}
            label="Genre"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
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
  );
};
