package com.todo.backend.controller;

import com.todo.backend.exception.ResourceNotFoundException;
import com.todo.backend.model.Todo;
import com.todo.backend.service.ITodoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TodoControllerTest {

    @Mock
    private ITodoService todoService;

    @InjectMocks
    private TodoController todoController;

    private Todo sampleTodo;

    @BeforeEach
    void setup() {
        sampleTodo = new Todo();
        sampleTodo.setId("1");
        sampleTodo.setTodoText("Study testing");
        sampleTodo.setPriority("high");
        sampleTodo.setDueDate(LocalDate.now().plusDays(1));
        sampleTodo.setDone(false);
    }

    @Test
    void testGetTodoById_success() {
        when(todoService.searchTodoById("1")).thenReturn(sampleTodo);

        ResponseEntity<Todo> response = todoController.getTodoById("1");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(sampleTodo, response.getBody());
    }

    @Test
    void testGetTodoById_notFound() {
        when(todoService.searchTodoById("999")).thenReturn(null);

        assertThrows(ResourceNotFoundException.class, () -> todoController.getTodoById("999"));
    }

    @Test
    void testCreateTodo_setsDoneFalse() {
        Todo todoToCreate = new Todo();
        todoToCreate.setTodoText("New task");

        when(todoService.saveTodo(any(Todo.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Todo created = todoController.createTodo(todoToCreate);

        assertFalse(created.getDone());
        verify(todoService).saveTodo(any(Todo.class));
    }

    @Test
    void testMarkAsDone_setsDoneTrueAndSaves() {
        when(todoService.searchTodoById("1")).thenReturn(sampleTodo);
        when(todoService.saveTodo(any(Todo.class))).thenReturn(sampleTodo);

        ResponseEntity<Todo> response = todoController.markAsDone("1");

        assertTrue(Objects.requireNonNull(response.getBody()).getDone());
        assertNotNull(response.getBody().getDoneDate());
        verify(todoService).saveTodo(sampleTodo);
    }

    @Test
    void testMarkAsUndone_setsDoneFalseAndClearsDate() {
        sampleTodo.setDone(true);
        sampleTodo.setDoneDate(LocalDateTime.now());

        when(todoService.searchTodoById("1")).thenReturn(sampleTodo);
        when(todoService.saveTodo(any(Todo.class))).thenReturn(sampleTodo);

        ResponseEntity<Todo> response = todoController.markAsUndone("1");

        assertFalse(Objects.requireNonNull(response.getBody()).getDone());
        assertNull(response.getBody().getDoneDate());
        verify(todoService).saveTodo(sampleTodo);
    }

    @Test
    void testUpdateTodo_success() {
        Todo updated = new Todo();
        updated.setTodoText("Updated");
        updated.setDueDate(LocalDate.now().plusDays(5));
        updated.setPriority("low");

        when(todoService.searchTodoById("1")).thenReturn(sampleTodo);
        when(todoService.saveTodo(any())).thenReturn(sampleTodo);

        ResponseEntity<Todo> response = todoController.updateTodo("1", updated);

        assertEquals("Updated", Objects.requireNonNull(response.getBody()).getTodoText());
        assertEquals("low", response.getBody().getPriority());
        verify(todoService).saveTodo(any());
    }

    @Test
    void testUpdateTodo_notFound() {
        when(todoService.searchTodoById("999")).thenReturn(null);

        Todo updated = new Todo();
        assertThrows(ResourceNotFoundException.class, () -> todoController.updateTodo("999", updated));
    }

    @Test
    void testDeleteTodo_success() {
        when(todoService.searchTodoById("1")).thenReturn(sampleTodo);

        ResponseEntity<?> response = todoController.deleteTodo("1");

        assertTrue((Boolean) ((Map<?, ?>) Objects.requireNonNull(response.getBody())).get("deleted"));
        verify(todoService).deleteTodo(sampleTodo);
    }

    @Test
    void testDeleteTodo_notFound() {
        when(todoService.searchTodoById("999")).thenReturn(null);

        assertThrows(ResourceNotFoundException.class, () -> todoController.deleteTodo("999"));
    }

    @Test
    void testGetFilteredTodos_returnsFilteredPage() {
        Page<Todo> mockPage = mock(Page.class);
        when(todoService.getFilteredTodos(any())).thenReturn(mockPage);

        Page<Todo> result = todoController.getFilteredTodos("test", "high", false, "dueDate", "asc", 0, 10);

        assertEquals(mockPage, result);
        verify(todoService).getFilteredTodos(any());
    }
}