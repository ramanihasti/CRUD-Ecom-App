import { Label, Select } from "flowbite-react";
import React from "react";

function MySelect({ name, value, label, onChange, options, required = false }) {
  if (
    !options.find((option) => {
      return option.value === "";
    })
  ) {
    options.unshift({ value: "", text: label });
  }
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} />
      </div>
      <Select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </Select>
    </div>
  );
}

export default MySelect;
