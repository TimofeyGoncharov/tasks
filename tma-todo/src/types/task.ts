export type TaskTag = "red" | "orange" | "green" | "blue" | "purple" | "gray";

export type Task = {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;
  tag: TaskTag;
};

export type TasksFilter = "all" | "active" | "done";
