import { Box } from "@mui/material";
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
      <BookTable books={books} setBooks={setBooks} />
    </Box>
  );
};
