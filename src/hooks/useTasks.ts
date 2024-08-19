import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";

interface Options {
  status: TaskStatus;
}
export const useTasks = ({ status }: Options) => {
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);

  const addTask = useTaskStore((state) => state.addTask);
  const [onDraggOver, setOnDraggOver] = useState(false);

  const handleAddTask = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: "Nueva tarea",
      input: "text",
      inputLabel: "Nombre de la tarea",
      showCancelButton: true,
      inputValidator: (value: string) => {
        if (!value) {
          return "Debe de ingresar un nombre para la tarea";
        }
      },
    });
    if (!isConfirmed) return;
    addTask(value, status);
  };
  const handleDragOver = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setOnDraggOver(true);
  };
  const handleDragLeave = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setOnDraggOver(false);
  };
  const handleDrop = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setOnDraggOver(false);
    onTaskDrop(status);
  };
  return {
    isDragging,
    onDraggOver,
    handleAddTask,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
