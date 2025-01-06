import { Label, Textarea } from "flowbite-react";
import React from "react";

function MyTextarea({
  name,
  label,
  value,
  onchange,
  required = false,
  rows = 4,
}) {
  return (
    <div className="max-w-md">
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
        rows={rows}
      />
    </div>
  );
}

export default MyTextarea;
