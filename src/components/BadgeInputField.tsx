import React, { useState } from "react";
import { Badge } from "./ui/badge";

type DropdownInputProps = {
  label: string;
  register: any;
  name: string;
  placeholder?: string;
  error?: string;
};

const BadgeInputField = ({
  label,
  register,
  name,
  placeholder = "Введите...",
  error,
}: DropdownInputProps) => {
  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddOption = () => {
    if (inputValue.trim()) {
      setOptions([...options, inputValue]);
      setInputValue("");
    }
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs text-gray-500">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          placeholder={placeholder}
        />
        <button
          onClick={handleAddOption}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-500"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap">
        {options.map((option, index) => (
          <div className="w-1/6">
            <Badge key={index}>
              {option}
              <button
                onClick={() => handleRemoveOption(index)}
                className="text-white ml-2"
              >
                ✖
              </button>
            </Badge>
          </div>
        ))}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default BadgeInputField;
