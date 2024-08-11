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
  onAddTodo: (todo: Todo) => void;
  onDeleteTodo: (todoId: string) => void;
  onToggleTodo: (todoId: string) => void;
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
    const onAddTodo = (newTodo: Todo) => {
      updateLocalStorage([...todos, newTodo]);
    };

    const onDeleteTodo = (todoId: string) => {
      const updatedTodos = todos.filter((item) => item.id !== todoId);
      updateLocalStorage(updatedTodos);
    };

    const onToggleTodo = (todoId: string) => {
      const updatedTodos = todos.map((item) => {
        if (item.id === todoId) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });
      updateLocalStorage(updatedTodos);
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
