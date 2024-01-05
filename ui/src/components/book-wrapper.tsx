import { Box } from "@mui/material";
import { BookTable } from "./book-table";

export const BookWrapper = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: "800px",
      }}
    >
      <BookTable />
    </Box>
  );
};
