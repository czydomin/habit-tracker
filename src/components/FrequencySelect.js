export default function FrequencySelect({ selectedValue, onSelectValue }) {
  const options = ["week", "day", "month", "year"];

  return (
    <select
      className="p-2 w-full "
      value={selectedValue}
      onChange={(event) => {
        onSelectValue(event.target.value);
      }}
    >
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}
