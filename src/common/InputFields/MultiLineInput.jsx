import { forwardRef } from "react";

const MultiLineInput = ({ setText, value }, ref) => {
  const handleChange = (e) => {
    const lines = e.target.value.split("\n").slice(0, 5);
    setText(lines.join("\n"));
  };

  return (
    <div className="flex-1">
      <textarea
        cols="1"
        value={value}
        onChange={handleChange}
        placeholder="write a caption... "
        className="!ring-0 resize-none outline-none border-none w-full dark:bg-transparent"
      />
    </div>
  );
};

export default forwardRef(MultiLineInput);
