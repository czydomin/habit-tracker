export default function Input({
  value,
  onChange,
  placeholder,
  type,
  min,
  className,
}) {
  return (
    <input
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      type={type}
      placeholder={placeholder}
      className={className}
      min={min}
    />
  );
}
