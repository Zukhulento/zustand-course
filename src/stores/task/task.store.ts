import { create, StateCreator } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";

interface TaskState {
  draggingTaskId?: string;
  // Esto de abajo se puede hacer de las dos maneras propuestas
  tasks: Record<string, Task>; // { [key: string]: Task }
  getTaskByStatus: (status: TaskStatus) => Task[];
  setDraggingTaskId: (taskId: string) => void;
  removeTaskId: () => void;
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
  tasks: {
    "ABC-1": { id: "ABC-1", title: "Tarea 1", status: "open" },
    "ABC-2": { id: "ABC-2", title: "Tarea 2", status: "in-progress" },
    "ABC-3": { id: "ABC-3", title: "Tarea 3", status: "open" },
    "ABC-4": { id: "ABC-4", title: "Tarea 4", status: "open" },
  },
  getTaskByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;
    return Object.values(tasks).filter((task) => task.status == status);
    // const filteredTasks = []
    // for (const property in tareas) {
    //   const currentValue = tareas[property]
    //   if(currentValue.status == status) filteredTasks.push(currentValue)
    // }
    // return filteredTasks
  },
  setDraggingTaskId: (taskId: string) => set({ draggingTaskId: taskId }),
  removeTaskId: () => set({ draggingTaskId: undefined }),
});

export const useTaskStore = create<TaskState>()(storeApi);
