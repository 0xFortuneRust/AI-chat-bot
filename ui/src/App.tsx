import { Container } from "@mui/material";
import { BookWrapper } from "./components/book-wrapper";

function App() {
  return (
    <Container
      sx={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <BookWrapper />
    </Container>
  );
}

export default App;
