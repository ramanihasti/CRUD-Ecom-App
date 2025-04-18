import { Label, TextInput } from "flowbite-react";
import React from "react";

function MyTextInput({
  name,
  label,
  value,
  onChange,
  type = "text",
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
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        color="primary"
      />
    </div>
  );
}
export default MyTextInput;
