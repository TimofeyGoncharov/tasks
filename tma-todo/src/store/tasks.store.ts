import { create } from "zustand";
import type { Task, TasksFilter, TaskTag } from "../types/task";
import { createTask, deleteTask, getTasks, patchTask } from "../api/client";

type State = {
  tasks: Task[];
  loading: boolean;
  error: string | null;

  filter: TasksFilter;
  query: string;

  load: () => Promise<void>;
  add: (text: string, tag: TaskTag) => Promise<void>;
  toggleDone: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  clearDone: () => Promise<void>;

  setFilter: (f: TasksFilter) => void;
  setQuery: (q: string) => void;
};

export const useTasksStore = create<State>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,
  filter: "all",
  query: "",

  setFilter: (f) => set({ filter: f }),
  setQuery: (q) => set({ query: q }),

  load: async () => {
    set({ loading: true, error: null });
    try {
      const tasks = await getTasks();
      set({ tasks, loading: false });
    } catch (e: any) {
      set({ error: e?.message ?? "Ошибка загрузки", loading: false });
    }
  },

  add: async (text, tag) => {
    const task: Task = {
      id: crypto.randomUUID(),
      text: text.trim(),
      done: false,
      createdAt: new Date().toISOString(),
      tag,
    };
    set({ loading: true, error: null });
    try {
      const created = await createTask(task);
      set({ tasks: [created, ...get().tasks], loading: false });
    } catch (e: any) {
      set({ error: e?.message ?? "Ошибка добавления", loading: false });
    }
  },

  toggleDone: async (id) => {
    const t = get().tasks.find((x) => x.id === id);
    if (!t) return;
    set({ loading: true, error: null });
    try {
      const updated = await patchTask(id, { done: !t.done });
      set({
        tasks: get().tasks.map((x) => (x.id === id ? updated : x)),
        loading: false,
      });
    } catch (e: any) {
      set({ error: e?.message ?? "Ошибка обновления", loading: false });
    }
  },

  remove: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteTask(id);
      set({ tasks: get().tasks.filter((x) => x.id !== id), loading: false });
    } catch (e: any) {
      set({ error: e?.message ?? "Ошибка удаления", loading: false });
    }
  },

  clearDone: async () => {
    const doneIds = get()
      .tasks.filter((t) => t.done)
      .map((t) => t.id);
    if (!doneIds.length) return;

    set({ loading: true, error: null });
    try {
      for (const id of doneIds) {
        await deleteTask(id);
      }
      set({ tasks: get().tasks.filter((t) => !t.done), loading: false });
    } catch (e: any) {
      set({ error: e?.message ?? "Ошибка очистки", loading: false });
    }
  },
}));
