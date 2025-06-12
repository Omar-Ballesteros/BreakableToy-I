import { useState } from "react";
import { useTodoContext } from "../context/TodoContext";

export default function SearchTodoForm() {
  const { setFilterParams } = useTodoContext();

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFilterParams((prev) => ({
      ...prev,
      search,
      priority: priorityFilter,
      done:
        stateFilter === "all"
          ? undefined
          : stateFilter === "done"
          ? true
          : false,
      page: 0, // reiniciar a la página 1
    }));
  };

  return (
    <form className="grid grid-cols-6 gap-4 my-4" onSubmit={handleSearch}>
      <div className="col-start-1 col-end-7 flex">
        <label htmlFor="todoName" className="m-4 max-w-8">
          Name
        </label>
        <input
          type="text"
          id="todoName"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="grow mx-4 rounded-md border border-gray-600 p-2"
        />
      </div>

      <div className="col-start-1 col-end-4 flex">
        <label htmlFor="priority" className="m-4 max-w-8">
          Priority
        </label>
        <select
          id="priority"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="mx-4 rounded-md grow border border-gray-600"
        >
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="col-start-1 col-end-4 flex">
        <label htmlFor="state" className="m-4 max-w-8">
          State
        </label>
        <select
          id="state"
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          className="mx-4 rounded-md grow border border-gray-600"
        >
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="undone">Undone</option>
        </select>
      </div>
      <div className="col-span-2 col-end-7 flex flex-row-reverse">
        <button
          type="submit"
          className="mx-4 px-6 rounded-md bg-slate-950 text-white hover:bg-slate-800"
        >
          Search
        </button>
      </div>
    </form>
  );
}
