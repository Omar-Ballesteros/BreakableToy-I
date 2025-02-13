package com.todo.backend.service;

import com.todo.backend.model.Todo;
import com.todo.backend.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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
        return todoRepository.save(todo);
    }

    @Override
    public void deleteTodo(Todo todo) {
        todoRepository.delete(todo.getId());

    }

    @Override
    public boolean toggleCompletion(String id) {
        Optional<Todo> todoOptional = todoRepository.findById(id);

        if (todoOptional.isPresent()) {
            Todo todo = todoOptional.get();

            if (todo.getDone()) {
                todo.setDone(false);
                todo.setDoneDate(null);
            } else {
                todo.setDone(true);
                todo.setDoneDate(LocalDate.now());
            }
            todo.setDone(true);
            todo.setDoneDate(LocalDate.now());

            todoRepository.save(todo);
            return true;
        }
        return false;
    }
}
