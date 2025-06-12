package com.todo.backend.service;

import com.todo.backend.dto.TimeMetricsResponse;
import com.todo.backend.dto.TodoFilterRequest;
import com.todo.backend.exception.ResourceNotFoundException;
import com.todo.backend.model.Todo;
import com.todo.backend.repository.TodoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TodoServiceTest {

    private TodoRepository todoRepository;
    private TodoService todoService;
    private Todo exampleTodo;

    @BeforeEach
    void setUp() {
        todoRepository = mock(TodoRepository.class);
        todoService = new TodoService(todoRepository);

        exampleTodo = new Todo("Test service", LocalDate.now(), false, "high");
        exampleTodo.setId("123");
        exampleTodo.setCreationDate(LocalDateTime.now().minusHours(2));
        exampleTodo.setDoneDate(LocalDateTime.now());
        exampleTodo.setDone(true);
    }

    @Test
    void testGetFilteredTodos() {
        TodoFilterRequest filter = TodoFilterRequest.builder()
                .search("")
                .priority("high")
                .done(null)
                .sortBy("dueDate")
                .order("asc")
                .page(0)
                .size(10)
                .build();

        when(todoRepository.findAll()).thenReturn(List.of(exampleTodo));

        Page<Todo> result = todoService.getFilteredTodos(filter);

        assertEquals(1, result.getTotalElements());
        assertEquals("Test service", result.getContent().getFirst().getTodoText());
    }

    @Test
    void testPagination() {
        Todo t1 = new Todo("Task 1", LocalDate.now(), false, "low");
        Todo t2 = new Todo("Task 2", LocalDate.now(), false, "medium");
        Todo t3 = new Todo("Task 3", LocalDate.now(), false, "high");

        when(todoRepository.findAll()).thenReturn(List.of(t1, t2, t3));

        TodoFilterRequest filter = TodoFilterRequest.builder()
                .page(0)
                .size(2)
                .sortBy("dueDate")
                .order("asc")
                .build();

        Page<Todo> result = todoService.getFilteredTodos(filter);

        assertEquals(2, result.getContent().size());
        assertEquals(3, result.getTotalElements());
    }

    @Test
    void testGetFilteredTodosWithDoneAndPriority() {
        Todo a1 = new Todo("Task 1", LocalDate.now(), true, "high");
        Todo a2 = new Todo("Task 2", LocalDate.now(), false, "low");

        when(todoRepository.findAll()).thenReturn(List.of(a1, a2));

        TodoFilterRequest filter = TodoFilterRequest.builder()
                .done(true)
                .priority("high")
                .page(0)
                .size(10)
                .build();

        Page<Todo> result = todoService.getFilteredTodos(filter);

        assertEquals(1, result.getTotalElements());
        assertEquals("Task 1", result.getContent().getFirst().getTodoText());
    }

    @Test
    void testGetFilteredTodosWithSearchText() {
        Todo t1 = new Todo("Wash the car", LocalDate.now(), false, "medium");
        Todo t2 = new Todo("Study", LocalDate.now(), false, "high");

        when(todoRepository.findAll()).thenReturn(List.of(t1, t2));

        TodoFilterRequest filter = TodoFilterRequest.builder()
                .search("car")
                .page(0)
                .size(10)
                .build();

        Page<Todo> result = todoService.getFilteredTodos(filter);

        assertEquals(1, result.getTotalElements());
        assertEquals("Wash the car", result.getContent().getFirst().getTodoText());
    }

    @Test
    void testGetFilteredTodosWithNoMatch() {
        Todo t1 = new Todo("Walk", LocalDate.now(), false, "low");
        when(todoRepository.findAll()).thenReturn(List.of(t1));

        TodoFilterRequest filter = TodoFilterRequest.builder()
                .search("run")
                .page(0)
                .size(10)
                .build();

        Page<Todo> result = todoService.getFilteredTodos(filter);

        assertEquals(0, result.getTotalElements());
    }

    @Test
    void testReturnTodoById() {
        when(todoRepository.findById("123")).thenReturn(Optional.of(exampleTodo));

        Todo foundTodo = todoService.searchTodoById("123");

        assertNotNull(foundTodo);
        assertEquals("123", foundTodo.getId());
    }

    @Test
    void testSearchTodoByIdNotFound() {
        when(todoRepository.findById("noexists")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> todoService.searchTodoById("noexists"));
    }

    @Test
    void testSaveTodoWithoutIdAndCreationDate() {
        Todo newTodo = new Todo("Train hard", LocalDate.now(), false, "medium");

        when(todoRepository.save(any(Todo.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Todo saved = todoService.saveTodo(newTodo);

        assertNotNull(saved.getId());
        assertNotNull(saved.getCreationDate());
        assertEquals("Train hard", saved.getTodoText());
    }

    @Test
    void testSaveTodoWithInvalidTextThrowsException() {
        Todo newTodo = new Todo("   ", LocalDate.now(), false, "low");

        assertThrows(IllegalArgumentException.class, () -> todoService.saveTodo(newTodo));
    }

    @Test
    void testDeleteTodoWhenExists() {
        when(todoRepository.existsById("123")).thenReturn(true);
        doNothing().when(todoRepository).delete("123");

        assertDoesNotThrow(() -> todoService.deleteTodo(exampleTodo));
        verify(todoRepository).delete("123");
    }

    @Test
    void testDeleteTodoWhenNotExistsThrowsException() {
        when(todoRepository.existsById("123")).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> todoService.deleteTodo(exampleTodo));
    }

    @Test
    void testCalculateAverageTime() {
        Todo t1 = new Todo("Task A", LocalDate.now(), true, "high");
        t1.setCreationDate(LocalDateTime.now().minusHours(1));
        t1.setDoneDate(LocalDateTime.now());
        t1.setDone(true);

        Todo t2 = new Todo("Task B", LocalDate.now(), true, "low");
        t2.setCreationDate(LocalDateTime.now().minusMinutes(30));
        t2.setDoneDate(LocalDateTime.now());
        t2.setDone(true);

        when(todoRepository.findAll()).thenReturn(List.of(t1, t2));

        TimeMetricsResponse response = todoService.calculateAverageTime();

        assertNotNull(response);
        assertTrue(response.getOverall().contains("min"));
        assertTrue(response.getLow().contains("min"));
        assertTrue(response.getHigh().contains("min"));
        assertEquals("00:00", response.getMedium()); // porque no hay tareas medium
    }

    @Test
    void testCalculateAverageTimeEmptyList() {
        when(todoRepository.findAll()).thenReturn(List.of());

        TimeMetricsResponse response = todoService.calculateAverageTime();

        assertEquals("00:00", response.getOverall());
        assertEquals("00:00", response.getLow());
        assertEquals("00:00", response.getMedium());
        assertEquals("00:00", response.getHigh());
    }
}