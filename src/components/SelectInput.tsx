export function SelectInput({ label, value, onChange, options, id }) {
  return (
    <div className="mb-4 w-1/2">
      <label htmlFor={id} className="block text-sm font-bold text-gray-100">
        {label}
      </label>
      <select id={id} value={value} onChange={onChange} className="createInput">
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
