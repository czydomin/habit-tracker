import { useState } from "react";
import FrequencySelect from "./FrequencySelect";
import Input from "./Input";
import {
  Cross2Icon,
  CheckIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";

export default function Item({
  title,
  onDelete,
  isDone,
  onCheck,
  onConfirm,
  howMany,

  repeat,
}) {
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const [updatedNumber, setUpdatedNumber] = useState(howMany);
  const [updatedFreq, setUpdatedFreq] = useState(repeat);

  return (
    <li className=" flex justify-between border border-1 h-20 items-center  w-2/3 px-2 bg-[#dfc4c1] text-[#795e5b] ">
      {isEditingMode === true ? (
        <div className="flex gap-4 ">
          <Input
            value={inputValue}
            onChange={(updatedValue) => {
              setInputValue(updatedValue);
            }}
            placeholder={""}
            type={"text"}
            className={"p-2"}
          />
          <Input
            value={updatedNumber}
            onChange={(newUpdatedNumber) => {
              setUpdatedNumber(newUpdatedNumber);
            }}
            type={"number"}
            min={"1"}
            className={"w-8"}
          />

          <FrequencySelect
            selectedValue={updatedFreq}
            onSelectValue={(value) => {
              setUpdatedFreq(value);
            }}
          />
          <div className="flex gap-2 ">
            <button
              onClick={() => {
                setIsEditingMode(false);
              }}
            >
              <Cross2Icon className="h-5 w-5 text-red-600" />
            </button>
            <button
              onClick={() => {
                if (updatedNumber <= 0) {
                  alert("You cannot set negative number");
                  return;
                }
                setIsEditingMode(false);
                onConfirm(inputValue, updatedNumber, updatedFreq);
              }}
            >
              <CheckIcon className="h-5 w-5 text-green-500" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex ">
          {title} {howMany} per {repeat}
        </div>
      )}
      <div className="bg-[#e9d7d6] flex gap-4 p-2">
        <input
          checked={isDone}
          onChange={() => {
            onCheck();
          }}
          type="checkbox"
        ></input>
        <button
          onClick={() => {
            setIsEditingMode(true);
          }}
        >
          <Pencil2Icon className="w-5 h-5 text-blue-500" />
        </button>
        <button
          onClick={() => {
            onDelete();
          }}
        >
          <TrashIcon className="w-5 h-5 text-pink-700" />
        </button>
      </div>
    </li>
  );
}
