import { formatDateShort } from "@/lib/utils";
import { Todo } from "@/types/todo";
import { Trash2 } from "lucide-react";
import { useTodos } from "./todo-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            his will permanently delete your TODO
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function TodoListItem(props: TodoProps) {
  const { text, createdAt } = props;
  return (
    <li className="flex justify-between items-center border rounded-md p-4">
      <div>
        <p className="text-sm">{text}</p>
        <time className="text-xs text-muted-foreground">
          {formatDateShort(createdAt.toString())}
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
      {todos?.length > 0 ? (
        todos.map((todo) => <TodoListItem key={todo.id} {...todo} />)
      ) : (
        <p className="rounded-md p-2 text-center dark:text-slate-600">
          No todos
        </p>
      )}
    </ul>
  );
}

export default TodoList;
