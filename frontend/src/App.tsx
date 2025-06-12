import TodoList from "./components/TodoList";
import SearchTodoForm from "./components/SearchTodoForm";
import AddTodoModal from "./components/AddTodoModal";
import { useModalContext } from "./context/ModalContext";
import TaskMetrics from "./components/Metrics";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";

function App() {
  const { setOpen, setId } = useModalContext();

  const handleAdd = () => {
    setId("");
    setOpen(true);
  };

  return (
    <Container maxWidth={false} sx={{ py: 6, px: { xs: 2, sm: 4, md: 8 } }}>
      {" "}
      <Typography variant="h3" align="center" gutterBottom mb={4}>
        TO-DO APP
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 6 }}>
        <SearchTodoForm />
      </Paper>
      <Box textAlign="center" mb={6}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleAdd}
        >
          Add Todo
        </Button>
        <AddTodoModal />
      </Box>
      <Stack spacing={3}>
        <TodoList />
        <TaskMetrics />
      </Stack>
    </Container>
  );
}

export default App;
