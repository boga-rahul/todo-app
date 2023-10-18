import { useEffect, useState } from "react";
import TaskInput from "../components/TaskInput";
import TasksList from "../components/TasksList";
import { useNavigate } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";

export default function HomePage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [hide, setHide] = useState(true);

  const loadTodosFromServer = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3000/todos");
    const result = await response.json();
    setTodos(result.todos);
    setLoading(false);
  };

  useEffect(() => {
    const email = localStorage.getItem("email") || null;
    if (email == null) {
      navigate("/login");
    }

    if (!loading && todos.length === 0) {
      loadTodosFromServer();
    }
  }, [navigate, todos, loading]);

  return (
    <div className="flex w-full h-full">
      <div
        className={`bg-blue-500 flex flex-col pt-4 items-center gap-4 ${
          !hide ? "w-32" : "w-16"
        }`}
      >
        <Button
          icon="pi pi-bars"
          rounded
          className="w-8 h-8"
          onClick={() => {
            setHide(!hide);
          }}
        ></Button>
      </div>
      <div className="flex w-full top-56 justify-center items-center">
        <div className="w-[40%]">
          <TaskInput onUpdateTodos={() => loadTodosFromServer()} />
          <TasksList todos={todos} />
        </div>
      </div>
    </div>
  );
}
