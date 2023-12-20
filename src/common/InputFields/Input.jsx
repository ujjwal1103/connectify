import { forwardRef, useState } from "react";
import { EyeFill, FillEyeSlashFill } from "../../icons";

const ShowPassword = ({ showPassword, setShowPassword }) => {
  if (showPassword) {
    return (
      <FillEyeSlashFill
        onClick={() => setShowPassword(false)}
        className=" fill-violet-50"
      />
    );
  }

  return (
    <EyeFill
      onClick={() => setShowPassword(true)}
      className=" fill-violet-50 "
    />
  );
};

const Input = (props, ref) => {
  const {
    type,
    placeholder,
    prefix = "",
    sufix = "",
    value,
    className,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center relative w-full">
      <span className="absolute px-2  dark:text-white  ">{prefix}</span>
      <input
        ref={ref}
        value={value}
        {...props}
        type={showPassword ? "text" : type}
        className={className}
        placeholder={placeholder}
      />
      <span className="absolute right-0 px-3 text-white">
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
  );
};

export default forwardRef(Input);
