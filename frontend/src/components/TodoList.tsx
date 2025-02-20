import TodoItem from "./TodoItem";
import { useTodoContext } from "../context/TodoContext";
import { useState } from "react";
import { useSearchContext } from "../context/SearchContext";

const ITEMS_PER_PAGE = 10;

export default function TodoList() {
  const {
    search,
    priorityFilter,
    stateFilter,
    sortBy,
    sortOrder,
    setSortOrder,
    setSortBy,
  } = useSearchContext();
  const { todos } = useTodoContext();

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.todoText
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    const matchesPriority =
      priorityFilter === "all" || todo.priority === priorityFilter;

    const matchesState =
      stateFilter === "all" ||
      (stateFilter === "done" ? todo.done : !todo.done);

    return matchesSearch && matchesPriority && matchesState;
  });

  // Lógica de ordenación
  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sortBy === "") return 0; // Si no hay criterio de ordenación, no hacer nada

    const valueA =
      sortBy === "dueDate" && a.dueDate ? new Date(a.dueDate) : a.priority;
    const valueB =
      sortBy === "dueDate" && b.dueDate ? new Date(b.dueDate) : b.priority;

    if (sortOrder === "asc") {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
  });

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(sortedTodos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedTodos = sortedTodos.slice(startIndex, endIndex);

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
              <button
                className="m-4"
                onClick={() => {
                  setSortBy("priority");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
              >
                {sortBy === "priority"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : "↑↓"}
              </button>
            </th>
            <th className="p-4 border border-gray-400" scope="col">
              Due Date
              <button
                className="m-4"
                onClick={() => {
                  setSortBy("dueDate");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
              >
                {sortBy === "dueDate"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : "↑↓"}
              </button>
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
