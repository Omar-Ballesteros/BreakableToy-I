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

- ✅ _todo CRUD:_ Create, read, update, and delete todos.
- 🔍 _Search & Filter:_ Search by name, filter by priority and status.
- 📅 _Sorting:_ Sort todos by priority and due date.
- 📊 _todo Metrics:_ Track average completion time for todos.
- 🎨 _UI:_ Styled with TailwindCSS for a clean and responsive design.

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

| Method | Endpoint     | Description           |
| ------ | ------------ | --------------------- |
| GET    |              | Fetch all todos       |
| POST   |              | Create a new todo     |
| GET    | /{id}        | Search todos by Id    |
| PUT    | /{id}        | Update a todo         |
| DELETE | /{id}        | Delete a todo         |
| POST   | /{id}/done   | Mark a todo as done   |
| PUT    | /{id}/undone | Mark a todo as undone |

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
