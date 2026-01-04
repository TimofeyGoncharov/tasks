import { useEffect, useMemo } from "react";
import { Alert, Button, Space, Typography } from "antd";
import { useTasksStore } from "./store/tasks.store";
import { TaskForm } from "./ui/TaskForm";
import { FiltersBar } from "./ui/FiltersBar";
import { TaskList } from "./ui/TaskList";
import {
  applyTelegramThemeToCssVars,
  getWebApp,
  setupMainButton,
  shareTasksText,
} from "./telegram/tma";

const { Title } = Typography;

export default function App() {
  const {
    tasks,
    loading,
    error,
    filter,
    query,
    load,
    add,
    toggleDone,
    remove,
    clearDone,
    setFilter,
    setQuery,
  } = useTasksStore();

  useEffect(() => {
    const wa = getWebApp();
    applyTelegramThemeToCssVars();
    wa?.ready?.();
    wa?.expand?.();
    load();
  }, [load]);

  useEffect(() => {
    const cleanup = setupMainButton(() => clearDone());
    return cleanup;
  }, [clearDone]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks
      .filter((t) => {
        if (filter === "active") return !t.done;
        if (filter === "done") return t.done;
        return true;
      })
      .filter((t) => (q ? t.text.toLowerCase().includes(q) : true));
  }, [tasks, filter, query]);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <div className="tma-card" style={{ padding: 16 }}>
        <Space direction="vertical" style={{ width: "100%" }} size={16}>
          <Title level={3} style={{ margin: 0, color: "var(--tma-text)" }}>
            Tasks (tesing task)
          </Title>

          {error && <Alert type="error" message={error} showIcon />}

          <TaskForm onAdd={add} />

          <FiltersBar
            filter={filter}
            query={query}
            onFilter={setFilter}
            onQuery={setQuery}
          />

          <Space wrap>
            <Button onClick={() => shareTasksText()}>Поделиться</Button>
            <Button onClick={() => clearDone()} loading={loading}>
              Очистить выполненные
            </Button>
          </Space>

          <TaskList tasks={visible} onToggle={toggleDone} onRemove={remove} />
        </Space>
      </div>
    </div>
  );
}
