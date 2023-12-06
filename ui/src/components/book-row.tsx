import { Grid, ListItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FC } from "react";
import { Book } from "../types/book";

interface BookRowProps {
  book: Book;
}

export const BookRow: FC<BookRowProps> = ({ book }) => {
  return (
    <ListItem>
      <Grid
        container
        spacing={2}
        sx={{ border: "1px solid #ddd", padding: 0.5 }}
      >
        <Grid item xs={2}>
          {book.title}
        </Grid>
        <Grid item xs={2}>
          {book.author}
        </Grid>
        <Grid item xs={2}>
          {book.genre}
        </Grid>
        <Grid item xs={2}>
          {book.length}
        </Grid>
        <Grid item xs={2}>
          {book.read ? <>Read</> : <>Unread</>}
        </Grid>
      </Grid>
    </ListItem>
  );
};
