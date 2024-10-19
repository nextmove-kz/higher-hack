import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  size?: "small" | "medium" | "large";
  error?: FieldError;
  hidden?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  placeholder,
  hidden,
  inputProps,
  size = "medium",
}: InputFieldProps) => {
  const sizeClasses = {
    small: "w-1/6",
    medium: "w-1/2",
    large: "w-full",
  };

  return (
    <div
      className={`${
        hidden ? "hidden" : `flex flex-col gap-2 ${sizeClasses[size]}`
      }`}
    >
      <div className="flex gap-1">
        <label
          className={
            error?.message ? "text-xs text-red-400" : "text-xs text-gray-500"
          }
        >
          {label}
        </label>
        {/* {error?.message && (
          <p className="text-xs text-red-400">{error.message.toString()}</p>
        )} */}
      </div>
      <input
        type={type}
        {...register(name)}
        className="ring-[1px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...inputProps}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
