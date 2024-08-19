import { create, StateCreator } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";
import { v4 as uuidV4 } from "uuid";
import { persist } from "zustand/middleware";

interface TaskState {
  draggingTaskId?: string;
  // Esto de abajo se puede hacer de las dos maneras propuestas
  tasks: Record<string, Task>; // { [key: string]: Task }
  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;
  setDraggingTaskId: (taskId: string) => void;
  removeTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
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
  addTask: (title: string, status: TaskStatus) => {
    const newTask = { id: uuidV4(), title, status };
    //! Existen 2 otras maneras de hacer lo de abajo con Immer como "Produce" o como "Middleware"
    set((state) => ({
      tasks: {
        ...state.tasks,
        [newTask.id]: newTask,
      },
    }));
  },
  setDraggingTaskId: (taskId: string) => set({ draggingTaskId: taskId }),
  removeTaskId: () => set({ draggingTaskId: undefined }),
  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    const task = get().tasks[taskId];
    task.status = status;
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: task,
      },
    }));
  },
  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;
    get().changeTaskStatus(taskId, status);
    get().removeTaskId();
  },
});

export const useTaskStore = create<TaskState>()(
  persist(storeApi, { name: "tasks-storage" })
);
