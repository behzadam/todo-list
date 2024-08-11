"use client";

import TodoForm from "./todo-form";
import TodoList from "./todo-list";
import TodoProvider from "./todo-provider";
import TodoToolbar from "./todo-toolbar";

export default function TodoConteiner() {
  return (
    <TodoProvider>
      <div className="flex flex-col gap-4 w-full max-w-lg px-2">
        <h1 className="font-medium text-center text-3xl mb-4">TODO APP</h1>
        <TodoForm />
        <TodoToolbar />
        <TodoList />
      </div>
    </TodoProvider>
  );
}
