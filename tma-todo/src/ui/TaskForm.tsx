import { Button, Form, Input, Select } from "antd";
import type { TaskTag } from "../types/task";

const tagOptions: { value: TaskTag; label: string }[] = [
  { value: "blue", label: "Синий" },
  { value: "green", label: "Зеленый" },
  { value: "orange", label: "Оранжевый" },
  { value: "red", label: "Красный" },
  { value: "purple", label: "Фиолетовый" },
  { value: "gray", label: "Серый" },
];

export function TaskForm(props: {
  onAdd: (text: string, tag: TaskTag) => Promise<void>;
}) {
  const [form] = Form.useForm<{ text: string; tag: TaskTag }>();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ tag: "blue" as TaskTag }}
      onFinish={async (v) => {
        await props.onAdd(v.text, v.tag);
        form.resetFields(["text"]);
      }}
    >
      <Form.Item
        name="text"
        label="Новая задача"
        rules={[
          { required: true, message: "Введите текст задачи" },
          { min: 3, message: "Текст задачи должен быть минимум 3 символа" },
          {
            max: 120,
            message: "Текст задачи не должен превышать более 120 символов",
          },
        ]}
      >
        <Input placeholder="Например: какая-то супер важная задача" />
      </Form.Item>

      <Form.Item name="tag" label="Метка">
        <Select options={tagOptions} />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        style={{
          background: "var(--tma-btn)",
          borderColor: "var(--tma-btn)",
          color: "var(--tma-btn-text)",
        }}
      >
        Добавить
      </Button>
    </Form>
  );
}
