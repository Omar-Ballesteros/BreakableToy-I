package com.todo.backend.service;

import com.todo.backend.dto.TodoFilterRequest;
import com.todo.backend.exception.ResourceNotFoundException;
import com.todo.backend.model.Todo;
import com.todo.backend.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TodoService implements ITodoService {

    private final TodoRepository todoRepository;


    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    private static final String TODO_NOT_FOUND_MSG = "Todo not found with id: ";

    @Override
    public Page<Todo> getFilteredTodos(TodoFilterRequest filter) {
        List<Todo> todos = todoRepository.findAll();

        //Filtering
        List<Todo> filtered = todos.stream()
                .filter(todo -> filter.getSearch() == null || todo.getTodoText().toLowerCase().contains(filter.getSearch().toLowerCase()))
                .filter(todo -> filter.getPriority() == null || filter.getPriority().equalsIgnoreCase(todo.getPriority()))
                .filter(todo -> filter.getDone() == null || filter.getDone().equals(todo.getDone()))
                .collect(Collectors.toList());

        // Sort
        Comparator<Todo> comparator = Comparator.comparing(todo -> {
            return switch (filter.getSortBy()) {
                case "title" -> todo.getTodoText();
                case "priority" -> todo.getPriority();
                case "done" -> todo.getDone().toString();
                default -> todo.getCreationDate().toString();
            };
        });

        if ("desc".equalsIgnoreCase(filter.getOrder())) {
            comparator = comparator.reversed();
        }

        filtered.sort(comparator);

        // Pagination
        int start = filter.getPage() * filter.getSize();
        int end = Math.min(start + filter.getSize(), filtered.size());
        List<Todo> pageContent = (start < end) ? filtered.subList(start, end) : List.of();

        return new PageImpl<>(pageContent, PageRequest.of(filter.getPage(), filter.getSize()), filtered.size());
    }

    @Override
    public Todo searchTodoById(String id) {
        return todoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(TODO_NOT_FOUND_MSG + id));
    }

    @Override
    public Todo saveTodo(Todo todo) {
        // Basic validation
        if (todo.getTodoText() == null || todo.getTodoText().trim().isEmpty()) {
            throw new IllegalArgumentException("Todo text must not be null or empty");
        }
        // Assign unique ID if missing
        if (todo.getId() == null)
             todo.setId(UUID.randomUUID().toString());

        // Set creation date if missing
        if (todo.getCreationDate() == null) {
            todo.setCreationDate(LocalDateTime.now());
        }
        return todoRepository.save(todo);
    }

    @Override
    public void deleteTodo(Todo todo) {
        if (!todoRepository.existsById(todo.getId())) {
            throw new ResourceNotFoundException(TODO_NOT_FOUND_MSG + todo.getId());
        }
        todoRepository.delete(todo.getId());
    }
}
