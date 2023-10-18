import {
  KeyboardEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import SelectList from "./SelectList";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ToastService } from "../lib/Toast";
import { Button } from "primereact/button";

export default function TaskInput({ onUpdateTodos }) {
  // const [date, setDate] = useState(Date.now());
  const [task, setTask] = useState("");
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState({});
  const userEmail = localStorage.getItem("email");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toast: MutableRefObject<null> = useRef(null);

  const toastService = new ToastService(toast);

  const onChangeNewTask = async (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      onAddewTask();
    }
  };
  const onAddewTask = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos/create", {
        body: JSON.stringify({
          email: userEmail,
          title: task,
          list: {
            id: selectedList.id,
          },
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("access-token") as string,
        },
      });

      const content = await response.json();

      if (response.status == 200) {
        setTask("");
        onUpdateTodos();
        toastService.showSuccess("Created", task + " created successfully!");
      } else {
        setError(content.message);
        toastService.showError("Failed", "Failed to  created task " + task);
      }
    } catch (error: any) {
      const errorMsg = error?.message;
      setError(errorMsg);
      toastService.showError("Failed", errorMsg);
    }
  };

  const onAddNewLabel = async ({ label, color }) => {
    console.log(label, color);
    try {
      const response = await fetch("http://localhost:3000/lists/create", {
        body: JSON.stringify({
          name: label,
          color: color,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("access-token") as string,
        },
      });

      const itemLists = await response.json();

      if (response.status == 200) {
        setLists(itemLists);
        setSelectedList(itemLists[0]);
        toastService.showSuccess("Created", label + " created successfully!");
      } else {
        setError(itemLists.message);
        toastService.showError("Failed", "Failed to  created label " + label);
      }
    } catch (error) {
      const errorMsg = error?.message;
      setError(errorMsg);
      toastService.showError("Failed", errorMsg);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/lists", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const itemLists = await response.json();

        if (response.status == 200) {
          setLists(itemLists);
          setSelectedList(itemLists[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex gap-4">
      <Toast
        ref={toast}
        position="top-center"
        pt={{
          root: () => ({
            className: "h-10",
          }),
        }}
      />
      <div className="flex bg-white rounded-xl px-4 w-[90%] justify-between">
        <InputText
          type="text"
          name="task"
          id="task"
          unstyled={true}
          placeholder="Write a new task..."
          className="w-96 py-4 outline-none"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={onChangeNewTask}
        />
        {/* <input
        type="date"
        name="calendar"
        id="calendar"
        className="pr-4 outline-none"
        onChange={(e) => setDate(e.target.valueAsNumber)}
      /> */}
        {!loading ? (
          <SelectList
            onSelectChange={(e) => setSelectedList(e)}
            onAddNewLabel={(e) => onAddNewLabel(e)}
            lists={lists}
          />
        ) : (
          <>Loading..</>
        )}
      </div>

      <Button
        icon="pi pi-check"
        rounded
        aria-label="Filter"
        onClick={onAddewTask}
      />
    </div>
  );
}
