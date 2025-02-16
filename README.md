# BreakableToy-I

# Todo App Backend

This is a To-do list API built with Java and Spring Boot, using the Controller-Service-Repository pattern.

## Installation

**Clone the repository:**
```bash
git clone https://github.com/Omar-Ballesteros/BreakableToy-I.git
cd backend
mvnw spring-boot:run
```

The backend will start on http://localhost:9090 .

## API endpoints

### 1. GET `/api/todos`

**Response:**

```json
{
    "id": "3d57502b-703e-4a78-a31a-ed22788b488e",
    "todoText": "Run all tests",
    "dueDate": "2025-03-01",
    "done": false,
    "doneDate": null,
    "priority": "High",
    "creationDate": "2025-02-10"
}
```


Get all tasks.

### 2. POST `/api/todos`

Create a new task.

**Request body:**
```json
{
    "todoText": "Your New Task",
    "dueDate": "2025-03-01",
    "priority": "Low"
}
```

**Response:**

```json
{
    "id": "d57502b-703e-4a78-a31a-ed22788b488e",
    "todoText": "Your New Task",
    "dueDate": "2025-03-01",
    "done": false,
    "doneDate": null,
    "priority": "Low",
    "creationDate": "2025-02-10"
}
```


## Testing

To run the unit tests for the backend, use:

```bash
cd backend
mvn test
```