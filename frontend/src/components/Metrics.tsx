import { useTodoContext } from "../context/TodoContext";
import { Todo } from "../types/todo";

export function calculateAverageCompletionTime(todos: Todo[]) {
  const completedTodos = todos.filter((todo) => todo.done && todo.doneDate);

  if (completedTodos.length === 0) {
    return { overall: "00:00", low: "00:00", medium: "00:00", high: "00:00" };
  }

  const getMinutesDifference = (start: string, end: string) =>
    (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60);

  let totalTime = 0;
  let lowTime = 0,
    lowCount = 0;
  let mediumTime = 0,
    mediumCount = 0;
  let highTime = 0,
    highCount = 0;

  completedTodos.forEach((todo) => {
    const timeTaken = getMinutesDifference(todo.creationDate, todo.doneDate!);
    totalTime += timeTaken;

    switch (todo.priority) {
      case "low":
        lowTime += timeTaken;
        lowCount++;
        break;
      case "medium":
        mediumTime += timeTaken;
        mediumCount++;
        break;
      case "high":
        highTime += timeTaken;
        highCount++;
        break;
    }
  });

  const convertMinutesToHoursAndMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60); // Hours
    const remainingMinutes = Math.floor(minutes % 60); // Minutes
    return `${String(hours).padStart(2, "0")}:${String(
      remainingMinutes
    ).padStart(2, "0")} min`;
  };

  return {
    overall: convertMinutesToHoursAndMinutes(totalTime / completedTodos.length),
    low:
      lowCount > 0
        ? convertMinutesToHoursAndMinutes(lowTime / lowCount)
        : "00:00",
    medium:
      mediumCount > 0
        ? convertMinutesToHoursAndMinutes(mediumTime / mediumCount)
        : "00:00",
    high:
      highCount > 0
        ? convertMinutesToHoursAndMinutes(highTime / highCount)
        : "00:00",
  };
}

function TaskMetrics() {
  const { todos } = useTodoContext();
  const averageTime = calculateAverageCompletionTime(todos);

  return (
    <section className="border rounded-lg p-4 flex items-center justify-between max-w-4/5 mx-auto">
      <div className="text-left m-2">
        <h2 className="font-semibold">Average time to finish tasks:</h2>
        <p className="text-xl font-bold">{averageTime.overall}</p>
      </div>
      <div className="text-left m-2">
        <h2 className="font-semibold">
          Average time to finish tasks by priority:
        </h2>
        <ul>
          <li>
            <strong>Low:</strong> {averageTime.low}
          </li>
          <li>
            <strong>Medium:</strong> {averageTime.medium}
          </li>
          <li>
            <strong>High:</strong> {averageTime.high}
          </li>
        </ul>
      </div>
    </section>
  );
}

export default TaskMetrics;
