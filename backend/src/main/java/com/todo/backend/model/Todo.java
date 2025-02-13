package com.todo.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class Todo {
    private String id;
    private String todoText;
    private LocalDate dueDate;
    private Boolean done;
    private LocalDate doneDate;
    private String priority;
    private LocalDate creationDate;

    public Todo(String todoText, LocalDate dueDate, String priority) {
        this.id = UUID.randomUUID().toString();
        this.todoText = todoText;
        this.dueDate = dueDate;
        this.done = false;
        this.doneDate = null;
        this.priority = priority;
        this.creationDate = LocalDate.now();
    }
}
