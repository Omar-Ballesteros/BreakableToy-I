import { Todo } from "../types/todo";
import { useModalContext } from "../context/ModalContext";
import { useState } from "react";
import { deleteTodo, setAsDone, setAsUnDone } from "../api/api";
import { useTodoContext } from "../context/TodoContext";
import {
  TableRow,
  TableCell,
  Checkbox,
  Button,
  Typography,
  Box,
} from "@mui/material";

interface TodoItemProps {
  todo: Todo;
}

export function getDueDateColor(todo: Todo): string {
  const today = new Date();
  const dueDate = todo.dueDate ? new Date(todo.dueDate) : null;
  const daysLeft = dueDate
    ? Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  if (daysLeft !== null) {
    if (daysLeft <= 7) return "#ef4444"; // rojo
    if (daysLeft <= 14) return "#facc15"; // amarillo
    return "#22c55e"; // verde
  }

  return "transparent";
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { setOpen, setId } = useModalContext();
  const { refetchTodos } = useTodoContext();
  const [isDone, setIsDone] = useState(todo.done);

  const handleEdit = () => {
    setOpen(true);
    setId(todo.id);
  };

  const handleToggleDone = async () => {
    try {
      if (isDone) {
        await setAsUnDone(todo.id);
      } else {
        await setAsDone(todo.id);
      }
      setIsDone(!isDone);
      refetchTodos();
    } catch (error) {
      console.error("Error changing todo state", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      refetchTodos();
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  return (
    <TableRow
      sx={{
        "&:hover": {
          backgroundColor: "grey.100",
          transition: "background-color 0.2s ease-in-out",
        },
      }}
    >
      {/* Checkbox */}
      <TableCell align="center" sx={{ width: "5%" }}>
        <Checkbox checked={isDone} onChange={handleToggleDone} />
      </TableCell>

      {/* Texto del To-do */}
      <TableCell align="left" sx={{ width: "40%", pl: 10 }}>
        <Typography
          noWrap
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textDecoration: isDone ? "line-through" : "none",
            color: isDone ? "grey.800" : "black",
            fontSize: "1rem",
          }}
        >
          {todo.todoText}
        </Typography>
      </TableCell>

      {/* Prioridad */}
      <TableCell align="center" sx={{ width: "15%" }}>
        <Typography
          sx={{
            textDecoration: isDone ? "line-through" : "none",
            color: isDone ? "grey.800" : "black",
            fontSize: "1rem",
          }}
        >
          {todo.priority}
        </Typography>
      </TableCell>

      {/* Fecha */}
      <TableCell align="center" sx={{ width: "20%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {!isDone && (
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: getDueDateColor(todo),
                flexShrink: 0,
              }}
            />
          )}
          <Typography
            sx={{
              textDecoration: isDone ? "line-through" : "none",
              color: isDone ? "grey.800" : "black",
              fontSize: "1rem",
            }}
          >
            {todo.dueDate}
          </Typography>
        </Box>
      </TableCell>

      {/* Botones */}
      <TableCell align="center" sx={{ width: "20%" }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleEdit}
          sx={{ mx: 0.5 }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleDelete}
          sx={{ mx: 0.5 }}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
