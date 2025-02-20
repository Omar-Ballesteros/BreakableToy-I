import { Todo } from "../types/todo";
import { useModalContext } from "../context/ModalContext";
import { useState } from "react";
import { deleteTodo, setAsDone, setAsUnDone } from "../api/api";
import { useTodoContext } from "../context/TodoContext";

interface TodoItemProps {
  todo: Todo;
}

export function getDueDateBgColor(todo: Todo): string {
  const today = new Date();
  const dueDate = todo.dueDate ? new Date(todo.dueDate) : null;
  const daysLeft = dueDate
    ? Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  // 🎨 Aplicar color de fondo según los días restantes
  let bgColor = "";
  if (daysLeft !== null) {
    if (daysLeft <= 7) bgColor = "bg-red-300";
    else if (daysLeft <= 14) bgColor = "bg-yellow-300";
    else bgColor = "bg-green-300";
  }

  return bgColor;
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
    <tr className={`${getDueDateBgColor(todo)}`}>
      <td className="p-4 border border-gray-400">
        <input
          type="checkbox"
          className="scale-150"
          checked={isDone}
          onChange={handleToggleDone}
        />
      </td>
      <td
        className={`p-4 border border-gray-400 ${
          isDone ? "font-bold" : "font-light"
        }`}
      >
        {todo.todoText}
      </td>
      <td
        className={`p-4 border border-gray-400 ${
          isDone ? "font-bold" : "font-light"
        }`}
      >
        {todo.priority}
      </td>
      <td
        className={`p-4 border border-gray-400 ${
          isDone ? "font-bold" : "font-light"
        }`}
      >
        {todo.dueDate}
      </td>
      <td className="p-4 border border-gray-400 px-1 ">
        <button
          className="w-16 rounded-md bg-slate-900 text-white hover:bg-slate-800 py-1 mx-1"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          type="submit"
          className="w-16 rounded-md bg-slate-700 text-white hover:bg-slate-600 py-1 mx-1"
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
