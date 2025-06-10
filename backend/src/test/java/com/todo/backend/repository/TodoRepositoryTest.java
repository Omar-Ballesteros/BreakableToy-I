package com.todo.backend.repository;

import com.todo.backend.model.Todo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class TodoRepositoryTest {

    private TodoRepository todoRepository;

    @BeforeEach
    void setUp() {
        todoRepository = new TodoRepository();
    }

    @Test
    void testSaveAndFindAll() {
        Todo todo = new Todo("Test1", null, false, "High");
        todoRepository.save(todo);

        List<Todo> todos = todoRepository.findAll();
        assertEquals(1, todos.size());
        assertEquals("Test1", todos.getFirst().getTodoText());
    }

    @Test
    void testFindById() {
        Todo todo = new Todo("Test2", null, false, "Medium");
        todoRepository.save(todo);

        Optional<Todo> foundTodo = todoRepository.findById(todo.getId());
        assertTrue(foundTodo.isPresent());
        assertEquals("Test2", foundTodo.get().getTodoText());
    }

    @Test
    void testDelete() {
        Todo todo = new Todo("Test3", null, false, "low");
        todoRepository.save(todo);

        todoRepository.delete(todo.getId());
        Optional<Todo> deletedTodo = todoRepository.findById(todo.getId());
        assertFalse(deletedTodo.isPresent());
    }

    @Test
    void testExistsById_whenExists() {
        Todo todo = new Todo("Test4", null, false, "Medium");
        todoRepository.save(todo);

        boolean exists = todoRepository.existsById(todo.getId());
        assertTrue(exists);
    }

    @Test
    void testExistsById_whenNotExists() {
        boolean exists = todoRepository.existsById("nonexistent-id");
        assertFalse(exists);
    }

    @Test
    void testSave_updatesExistingTodo() {
        Todo todo = new Todo("Test5", null, false, "High");
        todoRepository.save(todo);

        // Modify and save again
        todo.setTodoText("Updated Task");
        todo.setPriority("Low");
        todoRepository.save(todo);

        Optional<Todo> updated = todoRepository.findById(todo.getId());
        assertTrue(updated.isPresent());
        assertEquals("Updated Task", updated.get().getTodoText());
        assertEquals("Low", updated.get().getPriority());
    }
}
