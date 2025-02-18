import axios from "axios";
import { useState } from "react";
import { Todo } from "../types/todo";

const urlBase = "http://localhost:9090/api/todos";

export default function AddTodoModal({ onClose, onAddTodo }: { onClose: () => void, onAddTodo: (todo: Todo) => void }) {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const [todoText, setTodoText] = useState(""); //Default value empty
  const [dueDate, setDueDate] = useState(""); // Default value empty
  const [priority, setPriority] = useState(""); //Default value empty

  const createTodo = async () => {
    try {
      const body = { todoText, dueDate, priority };
      const response = await axios.post(urlBase, body);

      onAddTodo(response.data);
      onClose();
    } catch (error) {
      console.error("Error al agregar to-do:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
      <form className="bg-white rounded-lg flex flex-col shadow-lg p-6 w-2/3" onSubmit={createTodo}>
        <h2 className="text-2xl font-bold mb-6">New To-do</h2>

        <label htmlFor="todoText" className="text-lg text-left p-2">Name*</label>
        <input
          type="text"
          id="todoText"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          required
          placeholder="Enter to-do name"
          className="w-full rounded-md border border-gray-600 p-2 mb-4"
        />

        <label htmlFor="priority" className="text-lg text-left p-2">Priority*</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
          className="h-10 rounded-md border border-gray-600 p-2 mb-4"
        >
          <option value="">Select Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <label htmlFor="dueDate" className="text-lg text-left p-2">Due Date</label>
        <input
          type="date"
          id="dueDate"
          min={today}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full rounded-md border border-gray-600 p-2 mb-4"
        />

        <div>
          <button
            type="button"
            className="m-4 px-6 py-2 border align-middle rounded-md text-gray-800 hover:bg-slate-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`m-4 px-6 border py-2 align-middle rounded-md text-white hover:bg-slate-950 ${
              todoText.trim() && priority.trim() ? "bg-slate-800" : "bg-gray-500"
            }`}
            disabled={!todoText.trim() || !priority.trim()} // Disable if empty fields
          >
            Add To-do
          </button>
        </div>
      </form>
    </div>
  );
}