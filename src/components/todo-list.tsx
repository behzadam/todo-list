import { formatDateShort } from "@/lib/utils";
import { Todo } from "@/types/todo";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
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

function TodoListItem(props: { index: number } & TodoProps) {
  const { text, id, createdAt, index } = props;

  return (
    <Draggable index={index} key={id} draggableId={`${id}`}>
      {(draggableProvider) => (
        <li
          ref={draggableProvider.innerRef}
          {...draggableProvider.draggableProps}
          {...draggableProvider.dragHandleProps}
          className="flex justify-between items-center border rounded-md p-4"
        >
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
      )}
    </Draggable>
  );
}

function TodoList() {
  const { todos, onReorderTodos } = useTodos();

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    onReorderTodos(startIndex, endIndex);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos">
        {(droppableProvider) => (
          <ul
            ref={droppableProvider.innerRef}
            {...droppableProvider.droppableProps}
            className="flex flex-col space-y-2"
          >
            {todos.map((todo, index) => (
              <TodoListItem key={todo.id} index={index} {...todo} />
            ))}
            {droppableProvider.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TodoList;
