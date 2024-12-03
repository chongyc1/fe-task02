import { FilterType } from "../../../hooks/useGetContactsList";

// Separate FilterControls Component
const ContactFilterSection = ({
  filter,
  searchMode,
  setFilterData,
  clearFilter,
  inputValue,
  setInputValue,
}: {
  filter: { status: string; gender: string };
  searchMode: boolean;
  setFilterData: (field: FilterType, value: string) => void;
  clearFilter: () => void;
  inputValue: string | undefined;
  setInputValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => (
  <div className="py-5 px-5 border-b">
    <div className="flex flex-col gap-y-3">
      <h3 className="font-semibold text-lg">Contact</h3>
      <input
        className="w-full bg-transparent border px-2 py-2"
        placeholder="Search Characters"
        value={inputValue ?? ""}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="flex gap-x-2">
        <SelectOption
          label="Status"
          value={filter.status}
          onChange={(e) => setFilterData("status", e.target.value)}
          options={["Alive", "Dead", "unknown"]}

        />
        <SelectOption
          label="Gender"
          value={filter.gender}
          onChange={(e) => setFilterData('gender', e.target.value)}
          options={["Female", "Male", "Genderless", "unknown"]}
        />
        {searchMode && (
          <button
            className="px-3 py-1 rounded-md bg-gray-300 active:bg-gray-700 active:text-white hover:bg-gray-400"
            onClick={clearFilter}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  </div>
);

const SelectOption = ({
  label,
  value,
  onChange,
  options }:
  {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[]
  }) => (
  <select
    value={value}
    onChange={onChange}
    className="px-1 py-1 bg-gray-300 hover:bg-gray-400 rounded-md"
  >
    <option value="">Select {label}</option>
    {options.map((option) => (
      <option key={`data-${option}`} value={option}>{option}</option>
    ))}
  </select>
);

export default ContactFilterSection;
