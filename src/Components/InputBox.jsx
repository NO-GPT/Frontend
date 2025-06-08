import React, { useCallback } from "react";

const TextInput = React.memo(({
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  clearError,
}) => {
  const handleChange = useCallback(e => {
    onChange(e.target.value);
    if (error) clearError(name);
  }, [onChange, error, clearError, name]);

  return (
    <input
      className={`sp-input ${error ? "sp-input-error" : ""}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
});

export default TextInput;
