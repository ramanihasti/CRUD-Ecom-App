import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MyAlert from "./MyAlert";
import {
  HiArchiveBoxXMark,
  HiArrowPath,
  HiMiniExclamationTriangle,
} from "react-icons/hi2";
import MyCommonListItem from "./MyCommonListItem";

function MyCommonList({ getAllData, deleteData, getAllFields }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const result = await getAllData();
      setData(result.data);
    } catch (error) {
      toast("Failed to fetch data.", { type: "error" });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
        return toast("Failed to delete", { type: "error" });
      }
      toast("Deleted Sussccessfully", { type: "success" });
      fetchData();
    } catch (error) {
      toast("Failed to delete.", { type: "error" });
    }
  }

  if (loading) return <MyAlert icon={HiArrowPath} msg="Loading..." />;

  if (error) {
    return (
      <MyAlert
        color="failure"
        icon={HiMiniExclamationTriangle}
        msg={"Failed to fetch data."}
      />
    );
  }

  function renderList() {
    if (data.length > 0) {
      return (
        <ul className="bg-[#e4daf6d1] rounded-md p-4 border border-violet-300">
          {data.map((item, index) => {
            const { image, title, subTitle } = getAllFields(item);

            return (
              <MyCommonListItem
                key={index}
                id={item._id}
                src={image}
                title={title}
                subTitle={subTitle}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                index={index}
                length={data.length}
              />
            );
          })}
        </ul>
      );
    } else {
      return <MyAlert icon={HiArchiveBoxXMark} msg="No categories to show." />;
    }
  }
  return <>{renderList()}</>;
}

export default MyCommonList;
