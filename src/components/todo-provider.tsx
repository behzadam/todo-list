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
  onClearCompletedTodos: () => void;
  onFilterTodos: (filter: "all" | "done") => void;
  onSortTodos: (sort: "asc" | "desc") => void;
};

const TodoContext = createContext<Context>({} as Context);

const loadTodos = (): Todo[] => {
  const todos = localStorage.getItem("todo");
  return todos ? JSON.parse(todos) : [];
};

function TodoProvider({ children }: PropsWithChildren) {
  const [todos, setTodos] = useState<Todo[]>([] as Todo[]);

  useEffect(() => {
    const storedTodos = loadTodos();
    setTodos(storedTodos);
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

    const onClearCompletedTodos = () => {
      const updatedTodos = todos.filter((item) => item.completed !== true);
      updateLocalStorage(updatedTodos);
    };

    const onFilterTodos = (filter: "all" | "done") => {
      if (filter === "done") {
        const updatedTodos = todos.filter((item) => item.completed === true);
        setTodos(updatedTodos);
      } else {
        const storedTodos = loadTodos();
        setTodos(storedTodos);
      }
    };

    const onSortTodos = (sort: "asc" | "desc") => {
      const sortedTodos = [...todos].sort((a, b) => {
        let dateA = new Date(a.createdAt).getTime();
        let dateB = new Date(b.createdAt).getTime();
        return sort === "asc" ? dateA - dateB : dateB - dateA;
      });
      updateLocalStorage(sortedTodos);
    };

    return {
      todos,
      onAddTodo,
      onDeleteTodo,
      onToggleTodo,
      onClearCompletedTodos,
      onFilterTodos,
      onSortTodos,
    };
  }, [todos]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

const useTodos = () => useContext(TodoContext);

export default TodoProvider;
export { useTodos };
