package com.todo.backend.controller;

import com.todo.backend.model.Todo;
import com.todo.backend.service.ITodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//http://localhost:9090/api/
@RequestMapping("/api/todos")
@CrossOrigin(value = "http://localhost:8080")

public class TodoController {

    @Autowired
    private ITodoService todoService;

    // http://localhost:9090/api/todos
    @GetMapping
    public List<Todo> listTodos(){
        return todoService.listTodos();
    }

    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return todoService.saveTodo(todo);
    }

}
