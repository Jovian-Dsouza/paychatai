export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  id,
  showError = false,
  type = "text",
}) {
  const handleChange = (e) => {
    let value = e.target.value;
    if (type == "int") {
      value = parseInt(value);
    } else if (type == "float") {
      value = parseFloat(value);
    }
    onChange(value);
  };

  if (value == null) {
    value = "";
  }

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-bold text-gray-100">
        {label}
      </label>
      <div className="relative">
        <input
          type={type === "int" || type === "float" ? "number" : type}
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`createInput ${
            value != null && value === "" && showError ? "border-red-500" : ""
          }`} // Add border color if empty
        />
        {value != null &&
          value === "" &&
          showError && ( // Show error message if the input is empty
            <span className="absolute top-full left-0 text-red-500 text-xs">
              {label} cannot be empty
            </span>
          )}
      </div>
    </div>
  );
}
