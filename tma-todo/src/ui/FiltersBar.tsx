import { Input, Segmented, Space } from "antd";
import type { TasksFilter } from "../types/task";

export function FiltersBar(props: {
  filter: TasksFilter;
  query: string;
  onFilter: (f: TasksFilter) => void;
  onQuery: (q: string) => void;
}) {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Segmented
        block
        value={props.filter}
        options={[
          { label: "Все", value: "all" },
          { label: "Активные", value: "active" },
          { label: "Выполненные", value: "done" },
        ]}
        onChange={(v) => props.onFilter(v as TasksFilter)}
      />
      <Input
        allowClear
        placeholder="Поиск по задачам"
        value={props.query}
        onChange={(e) => props.onQuery(e.target.value)}
      />
    </Space>
  );
}
