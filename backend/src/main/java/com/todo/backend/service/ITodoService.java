package com.todo.backend.service;

import com.todo.backend.dto.TimeMetricsResponse;
import com.todo.backend.dto.TodoFilterRequest;
import com.todo.backend.model.Todo;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ITodoService {

    Todo searchTodoById(String id);

    Todo saveTodo(Todo todo);

    void deleteTodo(Todo todo);

    Page<Todo> getFilteredTodos(TodoFilterRequest filter);

    TimeMetricsResponse calculateAverageTime();
}