import { formatDateShort } from "@/lib/utils";
import { Todo } from "@/types/todo";
import { useTodos } from "./todo-provider";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

type TodoProps = Todo;

function TodoListItemToggle(props: TodoProps) {
  const { id, completed } = props;
  const { onToggleTodo } = useTodos();
  
  const handleToggle = () => {
    onToggleTodo(id);
  };

  return (
    <Checkbox id={id} checked={completed} onCheckedChange={handleToggle} />
  );
}

function TodoListItemDelete(props: TodoProps) {
  const { id } = props;
  const { onDeleteTodo } = useTodos();

  const handleDelete = () => {
    console.log("handleDelete");
    onDeleteTodo(id);
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleDelete}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" x2="10" y1="11" y2="17" />
        <line x1="14" x2="14" y1="11" y2="17" />
      </svg>
    </Button>
  );
}

function TodoListItem(props: TodoProps) {
  const { text, createdAt } = props;
  return (
    <li className="flex justify-between items-center border rounded-md p-4">
      <div>
        <p className="text-sm">{text}</p>
        <time className="text-xs text-muted-foreground">
          {formatDateShort(createdAt)}
        </time>
      </div>
      <div className="flex items-center space-x-4">
        <TodoListItemToggle {...props} />
        <TodoListItemDelete {...props} />
      </div>
    </li>
  );
}

function TodoList() {
  const { todos } = useTodos();
  return (
    <ul className="flex flex-col w-full gap-2">
      {todos?.map((todo) => (
        <TodoListItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
}

export default TodoList;
