export function TextArea({ label, value, onChange, placeholder, id, showError=false }) {
  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-bold text-gray-100">
        {label}
      </label>
      <div className="relative">
        <textarea
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={4} // Set the number of visible rows
          className={`createInput ${
            value != null && !value.trim() && showError ? "border-red-500" : ""
          }`} // Add border color if empty
        />
        {value != null &&
          !value.trim() &&
          showError && ( // Show error message if the input is empty
            <span className="absolute top-full left-0 text-red-500 text-xs mt-1">
              {label} cannot be empty
            </span>
          )}
      </div>
    </div>
  );
}