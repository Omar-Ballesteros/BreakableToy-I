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
    <div className="p-4">
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-center">Done</th>

            <th
              className="px-4 py-2 text-center cursor-pointer hover:text-blue-600"
              onClick={() => toggleSort("title")}
            >
              Title {renderSortIndicator("title")}
            </th>

            <th
              className="px-4 py-2 text-center cursor-pointer hover:text-blue-600"
              onClick={() => toggleSort("priority")}
            >
              Priority {renderSortIndicator("priority")}
            </th>

            <th
              className="px-4 py-2 text-center cursor-pointer hover:text-blue-600"
              onClick={() => toggleSort("dueDate")}
            >
              Due Date {renderSortIndicator("dueDate")}
            </th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </tbody>
      </table>

      <div className="flex justify-center space-x-2 mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={(filterParams.page || 0) === 0}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          «
        </button>
        <span className="px-3 py-1">
          Page {(filterParams.page || 0) + 1} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={(filterParams.page || 0) >= totalPages - 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          »
        </button>
      </div>
    </div>
  );
}
