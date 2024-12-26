import { Label, TextInput } from "flowbite-react";
import React from "react";

function MyTextInput({
  name,
  label,
  value,
  type = "text",
  onChange,
  required = false,
  disabled = false,
}) {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} />
      </div>
      <TextInput
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={label}
        required={required}
        disabled={disabled}
        color="primary"
      />
    </div>
  );
}
export default MyTextInput;
