import { Button } from "flowbite-react";
import React from "react";
import { HiMiniPlus } from "react-icons/hi2";
import { Link } from "react-router-dom";

function AdminPageTitle({ title, link }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-[#324d6e] text-xl font-semibold">
          {title}
        </h2>
        {link && (
          <Button
            pill
            size="sm"
            gradientDuoTone="greenToBlue"
            as={Link}
            to={link}
          >
            <HiMiniPlus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        )}
      </div>
      <hr />
    </div>
  );
}

export default AdminPageTitle;
