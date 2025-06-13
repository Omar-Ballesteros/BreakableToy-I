import TodoList from "./components/TodoList";
import SearchTodoForm from "./components/SearchTodoForm";
import AddTodoModal from "./components/AddTodoModal";
import { useModalContext } from "./context/ModalContext";
import { TimeMetrics } from "./components/Metrics";
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
      <Typography variant="h2" align="center" gutterBottom mb={4}>
        TO-DO APP
      </Typography>
      <Paper elevation={3} sx={{ p: 4, mb: 8 }}>
        <SearchTodoForm />
      </Paper>
      <Box textAlign="center" mb={8}>
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
      <Stack spacing={4}>
        <TodoList />
        <Typography variant="h4" align="center" gutterBottom>
          Time Metrics
        </Typography>
        <TimeMetrics />
      </Stack>
    </Container>
  );
}

export default App;
