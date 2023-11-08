import { forwardRef } from "react";

const MultiLineInput = ({ setText, value, className }, ref) => {
  const handleChange = (e) => {
    const lines = e.target.value.split("\n").slice(0, 5);
    setText(lines.join("\n"));
  };

  return (
    <div className="flex-1">
      <textarea
        cols="3"
        value={value}
        onChange={handleChange}
        placeholder="write a caption... "
        className={
          className 
         
        }
      />
    </div>
  );
};

export default forwardRef(MultiLineInput);
