package com.todo.backend.service;

import com.todo.backend.model.Todo;
import com.todo.backend.repository.TodoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoService todoService;

    private Todo exampleTodo;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        exampleTodo = new Todo();

        exampleTodo.setId("123");
        exampleTodo.setTodoText("Test service");
        exampleTodo.setDone(false);
        exampleTodo.setDueDate(LocalDate.now());
    }

    @Test
    void ReturnAllTodos() {
        when(todoRepository.findAll()).thenReturn(Collections.singletonList(exampleTodo));

        List<Todo> todos = todoService.listTodos();

        assertEquals(1, todos.size());
        assertEquals("Test service", todos.getFirst().getTodoText());
    }

    @Test
    void ReturnTodoById() {
        when(todoRepository.findById("123")).thenReturn(Optional.of(exampleTodo));

        Todo foundTodo = todoService.searchTodoById("123");

        assertNotNull(foundTodo);
        assertEquals("123", foundTodo.getId());
    }

    @Test
    void testSaveTodo() {
        when(todoRepository.save(any(Todo.class))).thenReturn(exampleTodo);

        Todo savedTodo = todoService.saveTodo(exampleTodo);

        assertNotNull(savedTodo);
        assertEquals("Test service", savedTodo.getTodoText());
        verify(todoRepository, times(1)).save(exampleTodo);
    }

    @Test
    void testToggleTodoDone() {
        when(todoRepository.findById("123")).thenReturn(Optional.of(exampleTodo));

        boolean result = todoService.toggleCompletion("123");

        assertTrue(result);
        assertTrue(exampleTodo.getDone());
        assertNotNull(exampleTodo.getDoneDate());

        verify(todoRepository, times(1)).save(exampleTodo);
    }

    @Test
    void testToggleTodoUndone() {
        exampleTodo.setDone(true);
        exampleTodo.setDoneDate(LocalDate.now());

        when(todoRepository.findById("123")).thenReturn(Optional.of(exampleTodo));

        boolean result = todoService.toggleCompletion("123");

        assertTrue(result);
        assertFalse(exampleTodo.getDone());
        assertNull(exampleTodo.getDoneDate());

        verify(todoRepository, times(1)).save(exampleTodo);
    }
}
