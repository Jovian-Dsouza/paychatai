export function SelectInput({ label, value, onChange, options, id }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-bold text-gray-100">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="createInput">
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
