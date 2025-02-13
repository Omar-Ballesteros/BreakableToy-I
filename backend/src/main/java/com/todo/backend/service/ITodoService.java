package com.todo.backend.service;

import com.todo.backend.model.Todo;

import java.util.List;

public interface ITodoService {
    public List<Todo> listTodos();

    public Todo searchTodoById(String id);

    public Todo saveTodo(Todo todo);

    public void deleteTodo(Todo todo);

    public boolean toggleCompletion(String id);
}
