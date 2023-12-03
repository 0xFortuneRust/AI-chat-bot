import { Box } from "@mui/material";
import { BookInput } from "./book-input";

export const BookWrapper = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: "600px",
      }}
    >
      <BookInput />
    </Box>
  );
};
