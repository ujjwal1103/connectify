import { forwardRef, useRef, useState } from "react";
import { EyeFill, FillEyeSlashFill } from "../../icons";
import { useController, useForm } from "react-hook-form";
import { cn } from "../../utils/helper";

const ShowPassword = ({ showPassword, setShowPassword }) => {
  if (showPassword) {
    return <FillEyeSlashFill onClick={() => setShowPassword(false)} />;
  }

  return <EyeFill onClick={() => setShowPassword(true)} />;
};

const Input = (props, ref) => {
  const {
    type,
    placeholder,
    prefix = "",
    sufix = "",
    value,
    error,
    autoFocus = false,
    className,
    sufixClassname,
  } = props;

  const [showPassword, setShowPassword] = useState(false);



  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex items-center relative">
        <input
          ref={ref}
          autoFocus={autoFocus}
          value={value}
          {...props}
          type={showPassword ? "text" : type}
          className={cn(
            "w-full px-12 rounded-md border-2 border-gray-300",
            "peer focus-visible:border-blue-500 ",
            className,
            { "focus-visible:border-red-500": error }
          )}
          autoComplete={undefined}
          placeholder={placeholder}
        />
        <span
          className={cn(
            "absolute px-2 text-gray-300 peer-focus-visible:text-blue-500",
            { "peer-focus-visible:text-red-500": error }
          )}
        >
          {prefix}
        </span>
        <span
          className={cn(
            "absolute right-0 px-3 text-gray-300 peer-focus-visible:text-blue-500",
            sufixClassname
          )}
        >
          {type === "password" ? (
            <ShowPassword
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          ) : (
            sufix
          )}
        </span>
      </div>
      {error && <span className="text-red-500 text-xs">{error.message}</span>}
    </div>
  );
};

export default forwardRef(Input);

export function InputB({ control, name }) {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: {
      required: `${name} is required field `,
      minLength: {
        value: 3, // Minimum length of 3 characters
        message: "min 3 char required", // Error message
      },
      maxLength: {
        value: 5, // Minimum length of 3 characters
        message: "max 5 char required", // Error message
      },
      pattern: { value: /^[A-Za-z]+$/i, message: "Enter only alphabets" },
    },
  });

  return (
    <div className="w-full">
      <input
        onChange={field.onChange} // send value to hook form
        onBlur={field.onBlur} // notify when input is touched/blur
        value={field.value} // input value
        name={field.name} // send down the input name
        inputRef={field.ref}
        className="ring-2 ring-gray-800 px-8 w-full peer rounded-md focus-visible:ring-blue-500 placeholder:text-gray-800" // send input ref, so we can focus on input when error appear
      />

      {error && <span>{error?.message}</span>}
    </div>
  );
}
