export const Input = (props) => {
  const { placeholder, onChange } = props;

  return (
    <input
      className="w-full outline-none px-2.5 py-1 rounded-[10px] text-base placeholder:text-border-color"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
