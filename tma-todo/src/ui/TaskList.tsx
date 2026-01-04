import { Button, List, Tag, Typography } from "antd";
import dayjs from "dayjs";
import type { Task } from "../types/task";

const { Text } = Typography;

export function TaskList(props: {
  tasks: Task[];
  onToggle: (id: string) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}) {
  return (
    <List
      dataSource={props.tasks}
      locale={{ emptyText: "Пусто. Как и многие обещания людей." }}
      renderItem={(t) => (
        <List.Item
          actions={[
            <Button key="toggle" onClick={() => props.onToggle(t.id)}>
              {t.done ? "Вернуть" : "Готово"}
            </Button>,
            <Button danger key="del" onClick={() => props.onRemove(t.id)}>
              Удалить
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Tag color={t.tag}>{t.tag}</Tag>
                <Text delete={t.done} style={{ color: "var(--tma-text)" }}>
                  {t.text}
                </Text>
              </div>
            }
            description={
              <span style={{ color: "var(--tma-hint)" }}>
                Создано: {dayjs(t.createdAt).format("DD.MM.YYYY HH:mm")}
              </span>
            }
          />
        </List.Item>
      )}
    />
  );
}
