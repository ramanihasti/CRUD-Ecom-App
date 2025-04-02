import { Label, Textarea } from "flowbite-react";
import React from "react";

function MyTextarea({
  name,
  label,
  value,
  onchange,
  rows = 4,
  required = false,
  disabled = false,
}) {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} />
      </div>
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={onchange}
        placeholder={label}
        required={required}
        disabled={disabled}
        rows={rows}
      />
    </div>
  );
}

export default MyTextarea;
