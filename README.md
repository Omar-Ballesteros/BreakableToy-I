# BreakableToy-I Todo App

## Description

This is a To-do list App for todos management, that allows the user to:

- Add, edit, and delete todos.
- Search and sort todos.
- Mark todos as complete or incomplete.

The project follows a _full-stack architecture_ with:

- _Backend:_ Built with Java and Spring Boot, following the _Controller-Service-Repository_ pattern.
- _Frontend:_ Developed using _React, TypeScript, and TailwindCSS_, structured with components, React Context for state management, and an api file to handle backend requests.
- _Other technologies:_ Axios for HTTP requests and Lombok for reducing boilerplate code in the backend.

## Features

- ✅ _Todo CRUD_: Create, read, update, and delete todos.
- 🔍 _Search & Filter_: Search by name, filter by priority (low, medium, high) and status (done/undone).
- 📅 _Sorting_: Sort todos by due date or priority (ascending or descending).
- 🧭 _Pagination_: Navigate through todos with client-side pagination.
- ✔️ _Toggle Completion_: Mark todos as done or undone.
- 📊 _Metrics_: Track average completion time for todos.
- 🎨 _Responsive UI_: Built with Material UI for a clean and modern layout.
- 🧪 _Data Seeder_: Auto-generates sample todos for testing.

## Installation & Setup

**Clone the repository:**

```bash
git clone https://github.com/Omar-Ballesteros/BreakableToy-I.git
```

### Backend

```bash
cd backend
mvn spring-boot:run
```

The backend will start on http://localhost:9090 .

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on http://localhost:8080 .

## API Endpoints

## API Endpoints

| Method | Endpoint                        | Description                                                             |
| ------ | ------------------------------- | ----------------------------------------------------------------------- |
| GET    | /api/todos/filter               | Filter and list todos by search, priority, state, order, and pagination |
| POST   | /api/todos                      | Create a new todo                                                       |
| GET    | /api/todos/{id}                 | Retrieve a todo by its Id                                               |
| PUT    | /api/todos/{id}                 | Update a todo                                                           |
| DELETE | /api/todos/{id}                 | Delete a todo                                                           |
| POST   | /api/todos/{id}/done            | Mark a todo as done                                                     |
| PUT    | /api/todos/{id}/undone          | Mark a todo as not done                                                 |
| GET    | /api/todos/metrics/average-time | Get the average resolution time for todos                               |

## Project Structure

### Backend (Spring Boot)

```
backend/
│── src/main/java/com/todo/backend/
│   ├── controller/      # Handles HTTP requests
│   ├── service/         # Business logic
│   ├── repository/      # Data access layer
│   ├── model/           # Entity classes
│   ├── exception/       # Custom exception handling
│   ├── config/          # Configuration files
```

### Frontend (React + TypeScript)

```
frontend/
│── src/
│   ├── components/      # UI components
│   ├── context/         # React Context for global state
│   ├── types/           # TypeScript interfaces
│   ├── api/             # Axios requests to backend
│   ├── App.tsx          # Main application component
```

## Running Tests

### Backend (Spring Boot)

To execute the backend tests:

```bash
cd backend
mvn test
```

This command will:

- Compile your application.
- Run all JUnit and Spring Test suites.
- Display a report with the results in your terminal
