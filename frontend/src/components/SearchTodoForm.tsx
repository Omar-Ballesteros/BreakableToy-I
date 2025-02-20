import { useState } from "react";
import { useSearchContext } from "../context/SearchContext";

export default function SearchTodoForm() {
  const {
    setSearch: setSearchGlobal,
    setPriorityFilter: setPriorityGlobal,
    setStateFilter: setStateGlobal,
  } = useSearchContext();

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchGlobal(search);
    setPriorityGlobal(priorityFilter);
    setStateGlobal(stateFilter);
    console.log("Si jala");
  };

  return (
    <form className="grid grid-cols-6 gap-4 my-4" onSubmit={handleSearch}>
      <div className="col-start-1 col-end-7 flex">
        <label htmlFor="todoName" className="m-4 max-w-8">
          Name
        </label>
        <input
          type="text"
          value={search}
          id="todoName"
          placeholder="Text"
          className="grow mx-4 rounded-md border border-gray-600 p-2"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="col-start-1 col-end-4 flex">
        <label htmlFor="priority" className="m-4 max-w-8">
          Priority
        </label>
        <select
          id="priority"
          value={priorityFilter}
          autoComplete="All, High, Medium, Low"
          className=" mx-4 rounded-md grow border border-gray-600"
          onChange={(e) => setPriorityFilter(e.target.value)}
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
          autoComplete="All, Done, Undone"
          className="mx-4 rounded-md grow border border-gray-600"
          onChange={(e) => setStateFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="undone">Undone</option>
        </select>
      </div>
      <div className="col-span-2 col-end-7 flex flex-row-reverse">
        <button
          type="submit"
          className="mx-4 px-6 align-middle rounded-md bg-slate-950 text-white hover:bg-slate-800 "
        >
          Search
        </button>
      </div>
    </form>
  );
}
