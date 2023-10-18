import TaskItem from "./TaskItem";

export default function TasksList({ todos }) {
  return (
    <>
      {todos.length > 0 ? (
        <div className="mt-4 flex flex-col gap-3 w-[90%] overflow-y-scroll no-scrollbar">
          {todos
            .map((todo) => {
              return <TaskItem key={todo.id} {...todo} />;
            })
            .reverse()}
        </div>
      ) : (
        <span className="flex items-center justify-center bg-white p-4 rounded-2xl mt-4 w-full h-64 gap-2">
          <i className="pi pi-list"></i>
          Create tasks to show here.
        </span>
      )}
    </>
  );
}
