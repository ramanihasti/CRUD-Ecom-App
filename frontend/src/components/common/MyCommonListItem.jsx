import { Button } from "flowbite-react";
import React from "react";
import { HiMiniPencilSquare, HiMiniTrash } from "react-icons/hi2";

function MyCommonListItem({
  id,
  src,
  title,
  subTitle,
  handleEdit,
  handleDelete,
  index,
  length,
}) {
  return (
    <>
      <li className="flex items-center gap-4 py-2">
        <img src={src} alt="" className="h-14 w-14 rounded-full object-cover" />
        <div className="grow-[1]">
          <h3 className="font-serif">{title}</h3>
          <p className="font-thin">{subTitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="xs"
            gradientDuoTone="primary"
            onClick={() => {
              handleEdit(id);
            }}
          >
            <HiMiniPencilSquare className="h-4 w-4" onClick={handleEdit} />
          </Button>
          <Button
            size="xs"
            color="failure"
            onClick={() => {
              handleDelete(id);
            }}
          >
            <HiMiniTrash className="h-4 w-4" />
          </Button>
        </div>
      </li>
      {index < length - 1 && (
        <hr className="mt-2 mb-2 border-b border-b-violet-300" />
      )}
    </>
  );
}

export default MyCommonListItem;
