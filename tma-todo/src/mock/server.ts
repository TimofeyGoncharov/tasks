import { createServer, Model, Response } from "miragejs";
import type { Task } from "../types/task";

function seedTasks(): Task[] {
  const now = new Date().toISOString();
  return [
    {
      id: "1",
      text: "Сделать интеграцию",
      done: false,
      createdAt: now,
      tag: "blue",
    },
    {
      id: "2",
      text: "Контейнеризация",
      done: true,
      createdAt: now,
      tag: "green",
    },
  ];
}

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,
    models: {
      task: Model.extend<Partial<Task>>({}),
    },

    seeds(server) {
      for (const t of seedTasks()) server.create("task", t);
    },

    routes() {
      this.namespace = "api";
      this.timing = 400;

      this.get("/tasks", (schema: any) => {
        return schema.all("task");
      });

      this.post("/tasks", (schema: any, request) => {
        const body = JSON.parse(request.requestBody ?? "{}");
        if (!body?.text || typeof body.text !== "string") {
          return new Response(400, {}, { error: "text is required" });
        }
        return schema.create("task", body);
      });

      this.patch("/tasks/:id", (schema: any, request) => {
        const { id } = request.params;
        const body = JSON.parse(request.requestBody ?? "{}");
        const task = schema.find("task", id);
        if (!task) return new Response(404, {}, { error: "not found" });
        return task.update(body);
      });

      this.delete("/tasks/:id", (schema: any, request) => {
        const { id } = request.params;
        const task = schema.find("task", id);
        if (!task) return new Response(404, {}, { error: "not found" });
        task.destroy();

        return new Response(204, {}, {});
      });
    },
  });
}
