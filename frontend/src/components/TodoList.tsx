import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useTodoContext } from "../context/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos, totalPages, filterParams, setFilterParams } = useTodoContext();

  const toggleSort = (field: "priority" | "dueDate" | "title") => {
    setFilterParams((prev) => ({
      ...prev,
      sortBy: field,
      order: prev.sortBy === field && prev.order === "asc" ? "desc" : "asc",
      page: 0,
    }));
  };

  const renderSortIndicator = (field: string) => {
    if (filterParams.sortBy !== field) return "↑↓";
    return filterParams.order === "asc" ? "↑" : "↓";
  };

  const handlePreviousPage = () => {
    if ((filterParams.page || 0) > 0) {
      setFilterParams((prev) => ({
        ...prev,
        page: (prev.page || 0) - 1,
      }));
    }
  };

  const handleNextPage = () => {
    if ((filterParams.page || 0) < totalPages - 1) {
      setFilterParams((prev) => ({
        ...prev,
        page: (prev.page || 0) + 1,
      }));
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Done</TableCell>
              <TableCell
                align="center"
                onClick={() => toggleSort("title")}
                sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
              >
                Title {renderSortIndicator("title")}
              </TableCell>
              <TableCell
                align="center"
                onClick={() => toggleSort("priority")}
                sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
              >
                Priority {renderSortIndicator("priority")}
              </TableCell>
              <TableCell
                align="center"
                onClick={() => toggleSort("dueDate")}
                sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
              >
                Due Date {renderSortIndicator("dueDate")}
              </TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Button
          variant="outlined"
          onClick={handlePreviousPage}
          disabled={(filterParams.page || 0) === 0}
        >
          «
        </Button>
        <Typography variant="body1">
          Page {(filterParams.page || 0) + 1} of {totalPages}
        </Typography>
        <Button
          variant="outlined"
          onClick={handleNextPage}
          disabled={(filterParams.page || 0) >= totalPages - 1}
        >
          »
        </Button>
      </Stack>
    </>
  );
}
