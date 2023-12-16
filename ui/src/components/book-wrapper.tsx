import { Box } from "@mui/material";
import { BookInput } from "./book-input";
import { BookTable } from "./book-table";
import { useState } from "react";
import { Book } from "../types/book";

export const BookWrapper = () => {
  const [books, setBooks] = useState<Book[]>([]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: "800px",
      }}
    >
      <BookInput books={books} setBooks={setBooks} />
      <BookTable books={books} setBooks={setBooks} />
    </Box>
  );
};
