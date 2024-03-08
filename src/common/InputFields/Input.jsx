import { forwardRef, useRef, useState } from "react";
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

  const iconRef = useRef(null);

  return (
    <div className="flex items-center relative w-full">
      <span className="absolute px-2 dark:text-white ">{prefix}</span>
      <input
        ref={ref}
        value={value}
        {...props}
        type={showPassword ? "text" : type}
        className={className}
        onFocus={() => {
          iconRef?.current?.firstChild?.classList.add("dark:fill-[#620C45]");
        }}
        onBlur={() => {
          iconRef?.current?.firstChild?.classList.remove("dark:fill-[#620C45]");
        }}
        placeholder={placeholder}
      />
      <span className="absolute right-0 px-3 text-white " ref={iconRef}>
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
