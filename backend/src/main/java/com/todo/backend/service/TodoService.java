package com.todo.backend.service;

import com.todo.backend.dto.TimeMetricsResponse;
import com.todo.backend.dto.TodoFilterRequest;
import com.todo.backend.exception.ResourceNotFoundException;
import com.todo.backend.model.Todo;
import com.todo.backend.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
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

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @Override
    public Page<Todo> getFilteredTodos(TodoFilterRequest filter) {
        List<Todo> todos = todoRepository.findAll();

        //Filtering
        List<Todo> filtered = todos.stream()
                .filter(todo -> filter.getSearch() == null || todo.getTodoText().toLowerCase().contains(filter.getSearch().toLowerCase()))
                .filter(todo -> filter.getPriority() == null
                        || "all".equalsIgnoreCase(filter.getPriority())
                        || filter.getPriority().equalsIgnoreCase(todo.getPriority()))
                .filter(todo -> filter.getDone() == null || filter.getDone().equals(todo.getDone()))
                .collect(Collectors.toList());

        // Sort
        Comparator<Todo> comparator = getTodoComparator(filter);

        filtered.sort(comparator);

        // Pagination
        int start = filter.getPage() * filter.getSize();
        int end = Math.min(start + filter.getSize(), filtered.size());
        List<Todo> pageContent = (start < end) ? filtered.subList(start, end) : List.of();

        return new PageImpl<>(pageContent, PageRequest.of(filter.getPage(), filter.getSize()), filtered.size());
    }

    private Comparator<Todo> getTodoComparator(TodoFilterRequest filter) {
        String sortBy = filter.getSortBy() == null ? "dueDate" : filter.getSortBy();
        String order = filter.getOrder() == null ? "asc" : filter.getOrder();

        Comparator<Todo> comparator = switch (sortBy) {
            case "title" -> Comparator.comparing(Todo::getTodoText, String.CASE_INSENSITIVE_ORDER);
            case "priority" -> Comparator.comparingInt(todo -> mapPriority(todo.getPriority()));
            case "done" -> Comparator.comparing(todo -> todo.getDone().toString());
            default -> Comparator.comparing(Todo::getDueDate, Comparator.nullsLast(LocalDate::compareTo));
        };

        if ("desc".equalsIgnoreCase(order)) {
            comparator = comparator.reversed();
        }

        return comparator;
    }

    //Helper
    private int mapPriority(String priority) {
        return switch (priority.toLowerCase()) {
            case "high" -> 1;
            case "medium" -> 2;
            case "low" -> 3;
            default -> throw new IllegalStateException("Unexpected value: " + priority.toLowerCase());
        };
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

    public TimeMetricsResponse calculateAverageTime() {
        List<Todo> completedTodos = todoRepository.findAll()
                .stream()
                .filter(todo -> todo.getDone() && todo.getDoneDate() != null)
                .toList();

        if (completedTodos.isEmpty()) {
            return new TimeMetricsResponse("00:00", "00:00", "00:00", "00:00");
        }

        double totalTime = 0;
        double lowTime = 0, lowCount = 0;
        double mediumTime = 0, mediumCount = 0;
        double highTime = 0, highCount = 0;

        for (Todo todo : completedTodos) {
            long minutes = ChronoUnit.MINUTES.between(todo.getCreationDate(), todo.getDoneDate());
            totalTime += minutes;

            switch (todo.getPriority().toLowerCase()) {
                case "low" -> {
                    lowTime += minutes;
                    lowCount++;
                }
                case "medium" -> {
                    mediumTime += minutes;
                    mediumCount++;
                }
                case "high" -> {
                    highTime += minutes;
                    highCount++;
                }
            }
        }

        return new TimeMetricsResponse(
                formatMinutes(totalTime / completedTodos.size()),
                lowCount > 0 ? formatMinutes(lowTime / lowCount) : "00:00",
                mediumCount > 0 ? formatMinutes(mediumTime / mediumCount) : "00:00",
                highCount > 0 ? formatMinutes(highTime / highCount) : "00:00"
                );
    }

    private String formatMinutes(double minutes) {
        int hours = (int) minutes / 60;
        int mins = (int) minutes % 60;
        return String.format("%02d:%02d min", hours, mins);
    }
}
