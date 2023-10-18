import { ColorPicker } from "primereact/colorpicker";
import { ToastService } from "../lib/Toast";
import { Toast } from "primereact/toast";
import { MutableRefObject, useRef } from "react";

export default function TaskItem({
  title,
  id,
  completed,
  list,
}: {
  title: string;
  id: string;
  completed: boolean;
  list: any;
}) {
  const toast: MutableRefObject<null> = useRef(null);
  const toastService = new ToastService(toast);

  const updateCompleted = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos/update", {
        method: "POST",
        body: JSON.stringify({
          id: id,
          completed: !completed,
        }),
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("access-token") as string,
        },
      });

      const updatedItem = await response.json();

      if (response.status == 200) {
        console.log(updatedItem);
        toastService.showSuccess("Created", label + " created successfully!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex bg-white rounded-xl px-4 h-15 w-full">
      <Toast
        ref={toast}
        position="top-center"
        pt={{
          root: () => ({
            className: "h-10",
          }),
        }}
      />
      <input
        type="checkbox"
        name="check"
        id="check"
        className="h-4 w-4 self-center hover:cursor-pointer"
        checked={completed}
        onChange={updateCompleted}
      />
      <p
        className={`flex flex-auto w-96 p-4 min-h-10 h-15 max-h-50 outline-none  ${
          completed ? "line-through" : ""
        }`}
      >
        {title}
      </p>
      <div className="flex items-center gap-2">
        <span className="justify-end self-center">{list.name}</span>
        <ColorPicker
          disabled={true}
          value={list.color}
          pt={{
            input: {
              className: "p-[0px] w-3 h-3",
            },
          }}
        />
      </div>
    </div>
  );
}
