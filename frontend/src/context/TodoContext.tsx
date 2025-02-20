import React, { createContext, useContext, useEffect, useState } from "react";
import { Todo } from "../types/todo";
import { getTodos } from "../api/api";

type TodoContextType = {
  todos: Todo[];
  refetchTodos: () => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export function TodoContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const refetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    refetchTodos();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, refetchTodos }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("The Todo context needs to be consumed inside a provider");
  }
  return context;
};
