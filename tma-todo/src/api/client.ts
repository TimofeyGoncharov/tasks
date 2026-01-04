import type { Task } from "../types/task";

const API_BASE = "/api";

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP error ${res.status}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

export async function getTasks(): Promise<Task[]> {
  const data = await request<{ tasks: Task[] }>("/tasks");
  return data.tasks ?? [];
}

export async function createTask(task: Task): Promise<Task> {
  const data = await request<{ task: Task }>("/tasks", {
    method: "POST",
    body: JSON.stringify(task),
  });
  return data.task ?? (data as any);
}

export async function patchTask(
  id: string,
  patch: Partial<Task>
): Promise<Task> {
  const data = await request<{ task: Task }>(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
  return data.task ?? (data as any);
}

export async function deleteTask(id: string): Promise<void> {
  await request<void>(`/tasks/${id}`, {
    method: "DELETE",
  });
}
