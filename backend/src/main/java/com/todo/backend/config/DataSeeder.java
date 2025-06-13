package com.todo.backend.config;

import com.todo.backend.model.Todo;
import com.todo.backend.service.TodoService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final TodoService todoService;

    public DataSeeder(TodoService todoService) {
        this.todoService = todoService;
    }

    @Override
    public void run(String... args) {
        // No se cargan tareas si ya hay alguna existente
        if (!todoService.getAllTodos().isEmpty()) return;

        List<Todo> todos = List.of(
                new Todo("Buy groceries", LocalDate.now().plusWeeks(2), false, "high"),
                new Todo("Walk the dog", LocalDate.now().plusDays(4), false, "medium"),
                new Todo("Finish presentation", LocalDate.now().plusWeeks(6), false, "high"),
                new Todo("Pay bills", LocalDate.now().minusDays(1), true, "high"),
                new Todo("Call mom", LocalDate.now().plusDays(10), false, "low"),
                new Todo("Read a book", LocalDate.now().minusDays(3), true, "low"),
                new Todo("Organize desk", LocalDate.now().plusDays(8), false, "medium"),
                new Todo("Clean kitchen", LocalDate.now().minusDays(2), true, "medium"),
                new Todo("Submit tax forms", LocalDate.now().plusWeeks(2), false, "high"),
                new Todo("Reply to emails", LocalDate.now().plusDays(2), false, "medium"),
                new Todo("Workout", LocalDate.now(), false, "high"),
                new Todo("Schedule dentist appointment", LocalDate.now().plusDays(20), false, "low"),
                new Todo("Write blog post", LocalDate.now().plusDays(14), false, "medium"),
                new Todo("Fix bike", LocalDate.now().minusDays(5), true, "low"),
                new Todo("Backup laptop", LocalDate.now().plusDays(4), false, "medium"),
                new Todo("Prepare lunch", LocalDate.now().minusDays(2), true, "high"),
                new Todo("Update resume", LocalDate.now().plusWeeks(4), false, "medium"),
                new Todo("Meditate", LocalDate.now().plusDays(24), false, "low"),
                new Todo("Review budget", LocalDate.now().plusDays(6), false, "medium"),
                new Todo("Take car for service", LocalDate.now().plusDays(18), false, "high"),
                new Todo("Clean garage", LocalDate.now().plusWeeks(6), false, "low"),
                new Todo("Study for exam", LocalDate.now().plusDays(5), false, "high"),
                new Todo("Plan vacation", LocalDate.now().minusDays(2), true, "low")
        );

        todos.forEach(todoService::saveTodo);

        System.out.println("✅ Seeded 23 todos using TodoService.");
    }
}