import { useEffect , forwardRef } from "react";

const Input = (props, ref) => {
  const {
    type,
    placeholder,
    prefix = "",
    sufix = "",
    onChange,
    value,
    className,
    error,
  } = props;

  useEffect(() => {
    if (ref) {
      if (error) {
        ref.current.style = "border: 1px solid red";
      } else {
        ref.current.style = "";
      }
    }
  }, [ref, error]);

  return (
    <div className="flex items-center relative w-full">
      <span className="absolute px-2  text-white  ">{prefix}</span>
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        type={type}
        className={className}
        placeholder={placeholder}
      />
      <span className="absolute right-0 px-3 text-white">{sufix}</span>
    </div>
  );
};

export default forwardRef(Input);
