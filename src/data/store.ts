export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const tasks: Task[] = [
  { id: 1, title: "Write docs", completed: false },
  { id: 2, title: "Ship release", completed: true }
];

let nextId = tasks.length + 1;

export function listTasks(): Task[] {
  return tasks;
}

export function getTask(id: number): Task | undefined {
  return tasks.find((task) => task.id === id);
}

export function createTask(data: Pick<Task, "title" | "completed">): Task {
  const newTask: Task = {
    id: nextId++,
    title: data.title,
    completed: Boolean(data.completed)
  };
  tasks.push(newTask);
  return newTask;
}
