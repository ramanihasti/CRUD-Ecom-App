import { FileInput, Label } from "flowbite-react";
import React from "react";

function MyMultipleFileInput({ name, label, urls, onChange }) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {urls.map((url, index) => {
          return (
            <div key={index} className="mb-4 mt-8">
              <img
                src={url || "/placeholder.png"}
                alt=""
                className="w-full h-[256px] object-cover  border border-gray-300 rounded-xl"
              />
            </div>
          );
        })}
      </div>

      <div className="mb-2 block">
        <Label htmlFor={name} value={label} />
      </div>
      <FileInput
        id={name}
        name={name}
        multiple
        onChange={onChange}
        color="primary"
      />
    </div>
  );
}

export default MyMultipleFileInput;
