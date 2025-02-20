package com.todo.backend.service;

import com.todo.backend.model.Todo;
import com.todo.backend.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class TodoService implements ITodoService {

    @Autowired
    private TodoRepository todoRepository;

    @Override
    public List<Todo> listTodos() {
        return todoRepository.findAll();
    }

    @Override
    public Todo searchTodoById(String id) {
        return todoRepository.findById(id).orElse(null);
    }

    @Override
    public Todo saveTodo(Todo todo) {

        //Assign unique iD
        if (todo.getId() == null)
             todo.setId(UUID.randomUUID().toString());

        //Establish creation date
        if (todo.getCreationDate() == null) {
            todo.setCreationDate(LocalDateTime.now());
        }
        return todoRepository.save(todo);
    }

    @Override
    public void deleteTodo(Todo todo) {
        todoRepository.delete(todo.getId());
    }
}
