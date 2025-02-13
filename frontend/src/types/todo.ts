export interface Todo {
    id: string;
    todoText: string;
    dueDate?: string;
    done: boolean;
    doneDate?: string;
    priority: "low" | "medium" | "high";
    creationDate: string;
}