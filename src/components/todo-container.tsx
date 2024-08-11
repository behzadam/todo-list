"use client";

import TodoForm from "./todo-form";
import TodoList from "./todo-list";
import TodoProvider from "./todo-provider";
import TodoToolbar from "./todo-toolbar";

export default function TodoConteiner() {
  return (
    <TodoProvider>
      <div className="flex flex-col gap-4 w-full max-w-lg">
        <TodoForm />
        <TodoToolbar />
        <TodoList />
      </div>
    </TodoProvider>
  );
}
