import { ColorPicker } from "primereact/colorpicker";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

type ListSelect = {
  color: string | null;
  label: string | null;
};

export default function SelectList({ onSelectChange, onAddNewLabel, lists }) {
  const [selectedItem, setSelectedItem] = useState<ListSelect>(() => {
    const item: ListSelect = { color: null, label: null };
    if (lists.length > 0) {
      item.color = lists[0].color;
      item.label = lists[0].name;
    }
    return item;
  });
  const [label, setLabel] = useState("");
  const [color, setColor] = useState("");

  const onSelected = (value: any) => {
    setSelectedItem(value);
    onSelectChange(value);
  };

  const selectedListOptionTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex items-center gap-2 border-0">
          <ColorPicker
            value={option.color}
            disabled={true}
            pt={{
              input: {
                className: "p-[0px] w-3 h-3",
              },
            }}
          />
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const listOptionsTemplate = (option) => {
    return (
      <div
        className={
          "flex items-center gap-3 h-8 w-full px-4 hover:bg-slate-200 hover:cursor-pointer"
        }
      >
        <ColorPicker
          disabled={true}
          value={option.color}
          pt={{
            input: {
              className: "p-[0px] w-3 h-3",
            },
          }}
        />
        <div>{option.name}</div>
      </div>
    );
  };

  const panelFooterTemplate = () => {
    return (
      <div className="flex items-center px-2 gap-1 w-36 h-full bg-white border-2 rounded-b-xl">
        <ColorPicker
          value={color}
          disabled={false}
          pt={{
            input: {
              className: "p-[0px] w-3 h-3",
            },
          }}
          onChange={(e) => {
            setColor(e.value);
          }}
        />
        <InputText
          className="h-8 w-full border-none p-1"
          type="text"
          placeholder="Add label"
          value={label}
          unstyled={true}
          onChange={(e) => setLabel(e.target.value)}
        />
        <i
          className="pi pi-plus-circle hover:cursor-pointer"
          onClick={(e) => {
            setSelectedItem({ color, label });
            setLabel("");
            onAddNewLabel({ color, label });
          }}
        />
      </div>
    );
  };

  return (
    <Dropdown
      value={selectedItem}
      onChange={(e) => {
        e.stopPropagation();
        onSelected(e.value);
      }}
      placeholder="Select label"
      options={lists}
      optionLabel="name"
      className="flex h-8 self-center items-center gap-2 bg-slate-200 px-4 rounded-xl hover:cursor-pointer"
      pt={{
        root: () => ({
          className: "w-32 justify-between",
        }),
        list: () => ({
          className: "py-2 bg-white rounded-t-xl mt-1 border-2 ",
        }),
        wrapper: () => ({
          className: "overflow-auto",
        }),
      }}
      unstyled={true}
      valueTemplate={selectedListOptionTemplate}
      itemTemplate={listOptionsTemplate}
      panelFooterTemplate={panelFooterTemplate}
    />
  );
}
