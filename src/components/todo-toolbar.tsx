import { ArrowUpDown, LayoutList, ListChecks, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
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

function TodoToolbarClear() {
  const [anyItemSelected, setAnyItemSelected] = useState(false);
  const { onClearCompletedTodos, todos } = useTodos();
  const handleClear = () => {
    onClearCompletedTodos();
  };

  useEffect(() => {
    const anyCompletedItemSelected = todos.some((todo) => todo.completed);
    setAnyItemSelected(anyCompletedItemSelected);
  }, [todos]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          title="Clear completed TODOs"
          disabled={!anyItemSelected}
        >
          <Trash2 size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete all your completed TODOs
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClear}>Clear</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function TodoToolbarFilter() {
  const [filter, setFilter] = useState<"all" | "done">("all");
  const { onFilterTodos, todos } = useTodos();

  const handleFilter = () => {
    if (filter === "all") {
      setFilter("done");
      onFilterTodos("done");
    }
    if (filter === "done") {
      setFilter("all");
      onFilterTodos("all");
    }
  };

  return (
    <div className="flex flex-row items-center gap-1">
      <span className="dark:text-slate-500">Filter:</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleFilter}
        disabled={todos.length === 0}
      >
        {filter === "all" ? (
          <LayoutList size={16} />
        ) : (
          <ListChecks size={16} className="opacity-50" />
        )}
      </Button>
    </div>
  );
}

function TodoToolbarSort() {
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const { onSortTodos, todos } = useTodos();
  const handleSort = () => {
    if (sort === "asc") {
      setSort("desc");
      onSortTodos("desc");
    }
    if (sort === "desc") {
      setSort("asc");
      onSortTodos("asc");
    }
  };
  return (
    <div className="flex flex-row items-center gap-1">
      <span className="dark:text-slate-500">Sort:</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSort}
        disabled={todos.length === 0}
      >
        <ArrowUpDown size={16} />
      </Button>
    </div>
  );
}

function TodoToolbar() {
  return (
    <div className="flex flex-row items-center gap-2 justify-between text-xs">
      <div className="flex space-x-2">
        <TodoToolbarFilter />
        <TodoToolbarSort />
      </div>
      <TodoToolbarClear />
    </div>
  );
}

export default TodoToolbar;
