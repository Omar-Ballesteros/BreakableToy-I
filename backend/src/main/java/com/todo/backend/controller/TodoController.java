package com.todo.backend.controller;

import com.todo.backend.exception.ResourceNotFoundException;
import com.todo.backend.model.Todo;
import com.todo.backend.service.ITodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        todo.setDone(false);
        return todoService.saveTodo(todo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo>
    getTodoById(@PathVariable String id){
        Todo todo = todoService.searchTodoById(id);
        if(todo == null)
            throw new ResourceNotFoundException("Id not found:" + id);
        return ResponseEntity.ok(todo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo>
    updateTodo(@PathVariable String id, @RequestBody Todo updatedTodo){
        Todo todo = todoService.searchTodoById(id);
        if(todo == null)
            throw new ResourceNotFoundException("Id not found:" + id);
        todo.setTodoText(updatedTodo.getTodoText());
        todo.setDueDate(updatedTodo.getDueDate());
        todo.setPriority(updatedTodo.getPriority());
        todoService.saveTodo(todo);
        return ResponseEntity.ok(todo);
    }

    @PostMapping("/{id}/done")
    public ResponseEntity<Todo>
    markAsDone(@PathVariable String id) {
        Todo todo = todoService.searchTodoById(id);

        todo.setDone(true);
        todo.setDoneDate(LocalDate.now());
        todoService.saveTodo(todo);

        return ResponseEntity.ok(todo);
    }

    @PutMapping("/{id}/undone")
    public ResponseEntity<Todo>
    markAsUndone(@PathVariable String id) {
        Todo todo = todoService.searchTodoById(id);

        todo.setDone(false);
        todo.setDoneDate(null);
        todoService.saveTodo(todo);

        return ResponseEntity.ok(todo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>>
    deleteTodo(@PathVariable String id){
        Todo todo = todoService.searchTodoById(id);
        if(todo == null)
            throw new ResourceNotFoundException("The Id recieved does not exist");
        todoService.deleteTodo(todo);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
