import React, { useState } from "react";

type DropdownInputProps = {
  label: string;
  register: any;
  name: string;
  placeholder?: string;
  error?: string;
};

const DropdownInputField = ({
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
      <div className="border border-gray-300 rounded-md mt-2">
        {options.length > 0 ? (
          options.map((option, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 border-b last:border-b-0"
            >
              <span>{option}</span>
              <button
                onClick={() => handleRemoveOption(index)}
                className="text-red-500"
              >
                ✖
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 p-2">No items</p>
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default DropdownInputField;
