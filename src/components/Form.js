import Input from "./Input";
import FrequencySelect from "./FrequencySelect";
export default function Form({
  value,
  onChange,
  FreqValue,
  FreqOnChange,
  selectedValue,
  onSelectValue,
  onClick,
}) {
  return (
    <div className="flex flex-col   md:flex-row  items-center gap-4 ">
      <Input
        value={value}
        onChange={onChange}
        type={"text"}
        placeholder={"write here..."}
        className={"p-2 "}
      />
      <span>Repeat every</span>
      <Input
        value={FreqValue}
        onChange={FreqOnChange}
        type={"number"}
        min={"1"}
        className={"p-2 "}
      />
      <FrequencySelect
        selectedValue={selectedValue}
        onSelectValue={onSelectValue}
      />

      <button
        className="bg-[#795e5b] text-[#dfc4c1] py-4 px-20 rounded w-full my-4"
        onClick={onClick}
      >
        Add
      </button>
    </div>
  );
}
