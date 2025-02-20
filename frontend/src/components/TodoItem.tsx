import { Todo } from "../types/todo";
import { useModalContext } from "../context/ModalContext";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { setOpen, setId } = useModalContext();
  const handleEdit = () => {
    setOpen(true);
    setId(todo.id);
  };
  return (
    <tr className=" bg-white hover:bg-gray-100">
      <td className="p-4 border border-gray-400">
        {" "}
        <input type="checkbox" className="scale-150" />{" "}
      </td>
      <td className="p-4 border border-gray-400">{todo.todoText}</td>
      <td className="p-4 border border-gray-400">{todo.priority}</td>
      <td className="p-4 border border-gray-400">{todo.dueDate}</td>
      <td className="p-4 border border-gray-400 px-1">
        <button
          className="w-16 rounded-md bg-slate-900 text-white hover:bg-slate-800 py-1 mx-1"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          type="submit"
          className="w-16 rounded-md bg-slate-700 text-white hover:bg-slate-600 py-1 mx-1"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
