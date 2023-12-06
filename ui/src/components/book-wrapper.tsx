import { Box } from "@mui/material";
import { BookInput } from "./book-input";
import { BookTable } from "./book-table";

export const BookWrapper = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: "600px",
      }}
    >
      <BookInput />
      <BookTable />
    </Box>
  );
};
