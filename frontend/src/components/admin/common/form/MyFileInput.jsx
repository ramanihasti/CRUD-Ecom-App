import { FileInput, Label } from "flowbite-react";
import React from "react";

function MyFileInput({ name, label, onChange, url }) {
  return (
    <div>
      <div className="mb-4 mt-8">
        <img
          src={url || "/placeholder.png"}
          alt=""
          className="w-full h-[256px] object-cover  border border-gray-300 rounded-xl"
        />
      </div>
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} />
      </div>
      <FileInput id={name} name={name} onChange={onChange} color="primary" />
    </div>
  );
}

export default MyFileInput;
