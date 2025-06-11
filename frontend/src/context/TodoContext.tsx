import React, { createContext, useContext, useEffect, useState } from "react";
import { Todo } from "../types/todo";
import { getFilteredTodos } from "../api/api";
import { Page } from "../types/page";

type SortBy = "dueDate" | "priority" | "title" | "";
type SortOrder = "asc" | "desc";

export type FilterParams = {
  search: string;
  priority: string; // 'all', 'high', etc.
  done?: boolean;
  sortBy: SortBy;
  order: SortOrder;
  page: number;
  size: number;
};

type TodoContextType = {
  todos: Todo[];
  totalPages: number;
  filterParams: FilterParams;
  setFilterParams: React.Dispatch<React.SetStateAction<FilterParams>>;
  refetchTodos: () => void;
};

const TodoContext = createContext<TodoContextType | null>(null);

export function TodoContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const [filterParams, setFilterParams] = useState<FilterParams>({
    search: "",
    priority: "all",
    done: undefined,
    sortBy: "dueDate",
    order: "asc",
    page: 0,
    size: 10,
  });

  const refetchTodos = async () => {
    try {
      const response: Page<Todo> = await getFilteredTodos(filterParams);
      setTodos(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    refetchTodos();
  }, [filterParams]);

  return (
    <TodoContext.Provider
      value={{ todos, totalPages, filterParams, setFilterParams, refetchTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context)
    throw new Error("TodoContext debe usarse dentro de su Provider");
  return context;
};
