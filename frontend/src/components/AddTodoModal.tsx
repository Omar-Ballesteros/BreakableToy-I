import { useEffect, useState } from "react";
import { useModalContext } from "../context/ModalContext";
import { useTodoContext } from "../context/TodoContext";
import { addTodo, updateTodo } from "../api/api";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";

export default function AddTodoModal() {
  const { open, setOpen, id, setId } = useModalContext();
  const { refetchTodos, todos } = useTodoContext();

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const [todoText, setTodoText] = useState(""); //Default value empty
  const [dueDate, setDueDate] = useState(""); // Default value empty
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium"); //Default value empty

  const todo = todos.find((todo) => todo.id === id);

  useEffect(() => {
    if (todo) {
      setTodoText(todo.todoText);
      setPriority(todo.priority);
      setDueDate(todo.dueDate || "");
    } else {
      setTodoText("");
      setPriority("medium");
      setDueDate("");
    }
  }, [todo, id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { todoText, dueDate, priority };
      if (todo) {
        await updateTodo(id, body);
      } else {
        await addTodo(body);
      }
      refetchTodos();
      handleClose();
    } catch (error) {
      console.error("Error al agregar to-do:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setId("");
    setTodoText("");
    setDueDate("");
    setPriority("medium");
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      onClose={(_, reason) => {
        if (reason !== "backdropClick") {
          handleClose();
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>{todo ? "Update To-do" : "New To-do"}</DialogTitle>

        <DialogContent sx={{ px: 4, pt: 1 }}>
          <Stack spacing={3}>
            <TextField
              label="Name"
              variant="outlined"
              required
              fullWidth
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              placeholder="Enter to-do name"
              className="w-full rounded-md border border-gray-600 p-2 mb-4"
            />

            <FormControl fullWidth required>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priority}
                label="Priority"
                onChange={(e) =>
                  setPriority(e.target.value as "low" | "medium" | "high")
                }
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: today }}
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 4, pb: 3 }}>
          <Button onClick={handleClose} color="inherit" variant="outlined">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!todoText.trim() || !priority.trim()}
            color="primary"
          >
            {todo ? "Update To-do" : "Add To-do"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
