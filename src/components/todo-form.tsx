import { useState } from "react";
import { useTodos } from "./todo-provider";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function TodoForm() {
  const [text, setText] = useState("");
  const { onAddTodo } = useTodos();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onAddTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row gap-2">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit">Add Todo</Button>
      </div>
    </form>
  );
}
