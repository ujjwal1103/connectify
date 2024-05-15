import { forwardRef } from "react";

const MultiLineInput = ({ onChange, value, className, name }, ref) => {
  const handleChange = (e) => {
    const lines = e.target.value.split("\n").slice(0, 5);
    e.target.value = lines.join("\n");
    onChange(lines.join("\n"));
  };

  return (
    <textarea
      cols="5"
      value={value}
      onChange={handleChange}
      placeholder="write a caption... "
      className={className}
      name={name}
    />
  );
};

export default forwardRef(MultiLineInput);
