const classes =
  "w-500 h-500 bg-gray-800 text-wrap p-2 overflow-y-scroll focus:outline-none";
const RichTextEditor = ({ value, onChange, className = classes }) => {
  return (
    <>
      <div
        className={className}
        contentEditable={true}
        content={value}
        onInput={(e) => {
          onChange(e.target.innerHTML);
        }}
      ></div>
    </>
  );
};

export default RichTextEditor;
