package com.todo.backend.repository;

import com.todo.backend.model.Todo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
@Getter
@Setter

public class TodoRepository {
    private final List<Todo> todos = new ArrayList<>();

    public List<Todo> findAll() {
        return todos;
    }

    public Optional<Todo> findById(String id) {
        return todos.stream()
                .filter(todo -> todo.getId().equals(id))
                .findFirst();
    }

    public Todo save(Todo todo) {

        for (int i = 0; i < todos.size(); i++) {
            if(todos.get(i).getId().equals(todo.getId())) {
                todos.set(i, todo);
                return todo;
            }
        }
        todos.add(todo);
        return todo;
    }

    public void delete(String id) {
        todos.removeIf(todo -> todo.getId().equals(id));
    }
}
