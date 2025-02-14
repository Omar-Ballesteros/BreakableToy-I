package com.todo.backend.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class TodoTest {

    @Test
    void testTodoCreation() {
        Todo task = new Todo("Go training", LocalDate.now().plusDays(1), false, "high");

        assertNotNull(task.getId());
        assertEquals("Go training", task.getTodoText());
        assertEquals("high", task.getPriority());
        assertFalse(task.getDone());
        assertNotNull(task.getCreationDate());
    }

}
