import { generateUUID } from "@/lib/utils";
import { Todo } from "@/types/todo";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Context = {
  todos: Todo[];
  onAddTodo: (todo: string) => void;
  onDeleteTodo: (taskId: string) => void;
  onToggleTodo: (taskId: string) => void;
};

const TodoContext = createContext<Context>({} as Context);

function TodoProvider({ children }: PropsWithChildren) {
  const [todos, setTodos] = useState<Todo[]>([] as Todo[]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todo");
    if (storedTodos) {
      const stored = JSON.parse(storedTodos);
      setTodos(stored);
    }
  }, []);

  const updateLocalStorage = (todos: Todo[]) => {
    localStorage.setItem("todo", JSON.stringify(todos));
    setTodos(todos);
  };

  const value = useMemo(() => {
    const onAddTodo = (text: string) => {
      if (text.trim() === "") return;
      const newTodo: Todo = {
        id: generateUUID(),
        text: text,
        completed: false,
        creaedAt: Date.now().toString(),
      };
      updateLocalStorage([...todos, newTodo]);
    };

    const onDeleteTodo = (taskId: string) => {
      const updatedTodos = todos.filter((item) => item.id !== taskId);
      updateLocalStorage(updatedTodos);
    };

    const onToggleTodo = (taskId: string) => {
      const updatedTodos = todos.map((item) => {
        if (item.id === taskId) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });
      setTodos(updatedTodos);
    };

    return {
      todos,
      onAddTodo,
      onDeleteTodo,
      onToggleTodo,
    };
  }, [todos]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

const useTodos = () => useContext(TodoContext);

export default TodoProvider;
export { useTodos };
