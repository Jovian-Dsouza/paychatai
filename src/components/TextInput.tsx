export function TextInput({ label, value, onChange, placeholder, id }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-bold text-gray-100">
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value ? value: ""}
        onChange={onChange}
        placeholder={placeholder}
        className="createInput"
      />
    </div>
  );
}
