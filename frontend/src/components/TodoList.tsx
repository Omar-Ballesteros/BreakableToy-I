import TodoItem from "./TodoItem";
import { useTodoContext } from "../context/TodoContext";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;

export default function TodoList() {
  const { todos } = useTodoContext();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedTodos = todos.slice(startIndex, endIndex);

  const getPaginationNumbers = () => {
    const pages = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto bg-slate-50 rounded-md p-5">
      <table className="table-auto align-middle border border-gray-400 p-4 w-4/5">
        <thead className="bg-gray-300">
          <tr className="p-4 border border-gray-400">
            <th className="p-4 border border-gray-400" scope="col">
              Done
            </th>
            <th className="p-4 border border-gray-400" scope="col">
              Name
            </th>
            <th className="p-4 border border-gray-400" scope="col">
              Priority
            </th>
            <th className="p-4 border border-gray-400" scope="col">
              Due Date
            </th>
            <th className="p-4 border border-gray-400" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center space-x-2">
        <button
          className="px-3 py-1 bg-gray-700 text-white rounded-md disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          «
        </button>

        {getPaginationNumbers().map((page, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded-md ${
              page === currentPage
                ? "bg-gray-500 text-white font-bold"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
            onClick={() => typeof page === "number" && setCurrentPage(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        <button
          className="px-3 py-1 bg-gray-700 text-white rounded-md disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}
