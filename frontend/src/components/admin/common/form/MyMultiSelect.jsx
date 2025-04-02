import { Label, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";

function getFilteredOptions(initialOptions, selected) {
  const filteredOptions = initialOptions.filter((option) => {
    if (selected.includes(option.value)) {
      return false;
    }
    return true;
  });
  return filteredOptions;
}

function getSelectedOptions(initialOptions, selected) {
  const selectedOptions = initialOptions.filter((option) => {
    if (selected.includes(option.value)) {
      return true;
    }
    return false;
  });

  return selectedOptions;
}

function MyMultiSelect({
  name,
  label,
  selected,
  setSelected,
  initialOptions,
  required = false,
}) {
  const filteredOptions = getFilteredOptions(initialOptions, selected);
  const initialSelectedOptions = getSelectedOptions(initialOptions, selected);

  const [options, setOptions] = useState(filteredOptions);
  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions
  );

  useEffect(() => {
    setOptions(getFilteredOptions(initialOptions, selected));
    setSelectedOptions(getSelectedOptions(initialOptions, selected));
  }, [initialOptions]);

  function handleChange(e) {
    if (!e.target.value) return;

    setSelected([...selected, e.target.value]);
    setSelectedOptions([
      ...selectedOptions,
      options.find((option) => {
        return option.value === e.target.value;
      }),
    ]);

    const updatedOptions = options.filter((option, index) => {
      if (option.value === e.target.value) {
        return false;
      }
      return true;
    });

    setOptions(updatedOptions);
  }

  function handleRemove(index) {
    const updatedSelected = [...selected];
    const updatedSelectedOptions = [...selectedOptions];
    const deleted = updatedSelected.splice(index, 1);
    updatedSelectedOptions.splice(index, 1);

    setSelected(updatedSelected);
    setSelectedOptions(updatedSelectedOptions);

    const deletedOption = initialOptions.find((option, index) => {
      return option.value === deleted[0];
    });
    const updatedOptions = [...options, deletedOption];
    setOptions(updatedOptions);
  }

  return (
    <div className="">
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} />
      </div>
      <Select
        id={name}
        name={name}
        color="primary"
        onChange={handleChange}
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
      <div className="flex flex-wrap mt-2 items-center">
        {selectedOptions.map((option, index) => {
          return (
            <div
              key={index}
              className="mr-2 inline-flex items-center gap-2 bg-purple-200 border border-purple-400 rounded-lg px-3 py-1"
            >
              <FaTimesCircle
                onClick={() => {
                  handleRemove(index);
                }}
                className="text-purple-700 cursor-pointer"
              />
              <p>{option.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyMultiSelect;
