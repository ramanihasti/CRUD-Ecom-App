import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MyAlert from "./MyAlert";
import {
  HiArchiveBoxXMark,
  HiArrowPath,
  HiExclamationCircle,
  HiMiniExclamationTriangle,
} from "react-icons/hi2";
import MessageBox from "./MessageBox";
import { Spinner } from "flowbite-react";
import MyCommonListItem from "./MyCommonListItem";

function MyCommonList({ getData, deleteData, getFieldValues }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    handleFetch();
  }, []);

  async function handleFetch() {
    getData()
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        toast(error.message, { type: "error" });
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleEdit(id) {
    navigate(id);
  }

  async function handleDelete(id) {
    try {
      const isSure = confirm("Are you sure! you want to delete this?");
      if (!isSure) return;
      const result = await deleteData(id);
      // console.log("Category ID:", id);
      if (!result.success) {
        toast(result.msg, { type: "error" });
        return;
      }
      toast("Data deleted successfully", { type: "success" });
      handleFetch();
    } catch (error) {
      toast("Failed to delete data.", { type: "error" });
    }
  }

  if (loading) {
    return (
      <MessageBox
        renderIcon={() => {
          return <Spinner />;
        }}
        message="Loading..."
      />
    );
  }

  if (error) {
    return (
      <MessageBox
        icon={HiExclamationCircle}
        message="Failed to fetch data."
        status="error"
      />
    );
  }

  function renderList() {
    if (data.length > 0) {
      return (
        <ul className="bg-[#e4daf6d1] rounded-md p-4 border border-violet-300">
          {data.map((entity, index) => {
            const { image, title, desc } = getFieldValues(entity);
            return (
              <MyCommonListItem
                key={index}
                id={entity._id}
                src={image}
                title={title}
                desc={desc}
                entity={entity}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                index={index}
                length={data.length}
              />
            );
          })}
        </ul>
      );
    } else {
      return <MessageBox icon={HiArchiveBoxXMark} message="No data to show." />;
    }
  }
  return <>{renderList()}</>;
}

export default MyCommonList;
