package com.todo.backend.service;

import com.todo.backend.dto.TodoFilterRequest;
import com.todo.backend.exception.ResourceNotFoundException;
import com.todo.backend.model.Todo;
import com.todo.backend.repository.TodoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository;

    private TodoService todoService;

    private Todo exampleTodo;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        todoService = new TodoService(todoRepository);

        exampleTodo = new Todo("Test service", LocalDate.now(), false, "high");

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
        verify(todoRepository).findAll();
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
                .sortBy("creationDate")
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
    void ReturnTodoById() {
        exampleTodo.setId("123");
        when(todoRepository.findById("123")).thenReturn(Optional.of(exampleTodo));

        Todo foundTodo = todoService.searchTodoById("123");

        assertNotNull(foundTodo);
        assertEquals("123", foundTodo.getId());
    }

    @Test
    void testSaveTodo() {
        Todo todo = new Todo("Train hard", LocalDate.now(), false, "medium");
        when(todoRepository.save(any(Todo.class))).thenReturn(todo);

        Todo savedTodo = todoService.saveTodo(todo);

        assertNotNull(savedTodo);
        assertEquals("Train hard", savedTodo.getTodoText());
        verify(todoRepository, times(1)).save(todo);
    }

    @Test
    void testSearchTodoByIdNotFound() {
        when(todoRepository.findById("noexists")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> todoService.searchTodoById("noexists"));
    }

    @Test
    void testDeleteTodoById() {
        Todo todo = new Todo("Pay bills", LocalDate.now(), false, "medium");
        todo.setId("abc123");

        when(todoRepository.existsById("abc123")).thenReturn(true);

        todoService.deleteTodo(todo);

        verify(todoRepository, times(1)).delete("abc123");
    }

    @Test
    void testDeleteTodoByIdNotFound() {
        Todo fakeTodo = new Todo("Fake", LocalDate.now(), false, "high");
        fakeTodo.setId("idX");

        when(todoRepository.existsById("idX")).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> todoService.deleteTodo(fakeTodo));
    }

    @Test
    void testSaveTodoWithEmptyTextShouldThrow() {
        Todo todo = new Todo("   ", LocalDate.now(), false, "low");

        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            todoService.saveTodo(todo);
        });

        assertEquals("Todo text must not be null or empty", thrown.getMessage());
    }

    @Test
    void testSaveTodoWithNullTextShouldThrow() {
        Todo todo = new Todo(null, LocalDate.now(), false, "medium");

        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            todoService.saveTodo(todo);
        });

        assertEquals("Todo text must not be null or empty", thrown.getMessage());
    }

    @Test
    void testSaveTodoAssignsIdIfMissing() {
        Todo todo = new Todo("Clean room", LocalDate.now(), false, "low");
        todo.setId(null); // empty ID

        when(todoRepository.save(any(Todo.class))).thenAnswer(invocation -> {
            Todo saved = invocation.getArgument(0);
            assertNotNull(saved.getId());
            return saved;
        });

        todoService.saveTodo(todo);
    }

    @Test
    void testSaveTodoAssignsCreationDateIfMissing() {
        Todo todo = new Todo("Do pushups", LocalDate.now(), false, "medium");
        todo.setCreationDate(null);

        when(todoRepository.save(any(Todo.class))).thenAnswer(invocation -> {
            Todo saved = invocation.getArgument(0);
            assertNotNull(saved.getCreationDate());
            return saved;
        });

        todoService.saveTodo(todo);
    }

}
