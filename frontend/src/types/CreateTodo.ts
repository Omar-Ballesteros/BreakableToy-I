export interface CreateTodo {
  todoText: string;
  dueDate?: string;
  priority: "low" | "medium" | "high";
}
