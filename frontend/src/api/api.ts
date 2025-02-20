import axios from "axios";
import { Todo } from "../types/todo";
import { CreateTodo } from "../types/CreateTodo";

const API_URL = "http://localhost:9090/api/todos"; //Endpoint

export const getTodos = async () => {
  const response = await axios.get<Todo[]>(API_URL);
  return response.data;
};

export const addTodo = async (todo: CreateTodo) => {
  const response = await axios.post<Todo>(API_URL, todo);
  return response.data;
};

export const updateTodo = async (id: string, todo: CreateTodo) => {
  const response = await axios.put<Todo>(`${API_URL}/${id}`, todo);
  return response.data;
};
