import React, { useEffect, useState } from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MySelect from "../../../components/admin/common/form/MySelect";
import MyFileInput from "../../../components/admin/common/form/MyFileInput";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import { Button } from "flowbite-react";
import {
  addSubCategory,
  getAllCategories,
  getSingleSubCategory,
  updateSubCategory,
} from "../../../services/apiServices";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import MyAlert from "../../../components/common/MyAlert";
import { HiArrowPath, HiMiniExclamationTriangle } from "react-icons/hi2";

const initialState = {
  name: "",
  slug: "",
  image: null,
  category: "",
};

function SubCategoriesForm() {
  const { id } = useParams();
  const isAdd = id === "add";
  const [loadingFormState, setLoadingFormState] = useState(
    isAdd ? false : true
  );
  const [formState, setFormState] = useState(initialState);
  const [errorFormState, setErrorFormState] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const navigate = useNavigate();

  async function fetchAllCategories() {
    try {
      const result = await getAllCategories();

      if (!result.success) {
        return toast("Failed to get categories", { type: "error" });
      }

      const temp = result.data.map((category) => {
        return { value: category._id, text: category.name };
      });

      setCategoryOptions(temp);
    } catch (error) {
      toast("Failed to get Categories.", { type: "error" });
    }
  }

  async function fetchSubCategory() {
    try {
      const result = await getSingleSubCategory(id);

      if (!result.success) {
        toast("Failed to fetch sub-category", { type: "error" });
        setErrorFormState("Failed to fetch sub-category");
        return;
      }

      setFormState(result.data);
      setImageURL(result.data.image);
    } catch (error) {
      toast("Failed to fetch sub-category data.", { type: "error" });
      setErrorFormState("Failed to fetch sub-category.");
    } finally {
      setLoadingFormState(false);
    }
  }
  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    if (!isAdd) {
      fetchSubCategory();
    }
  }, [id]);

  function handleFileUpload(e) {
    const file = e.target.files[0];
    const tempURL = URL.createObjectURL(file);
    setImageURL(tempURL);
    setFormState({ ...formState, image: file });
  }

  function handleChange(e) {
    if (e.target.name === "name") {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
        slug: e.target.value.toLowerCase().replaceAll(" ", "-"),
      });
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const formData = new FormData(); // FormData ko formState me append karenge loop ka use karke.
      for (const key in formState) {
        formData.append(key, formState[key]);
      }
      console.log("formState", formState);

      let result;
      if (isAdd) {
        result = await addSubCategory(formData);
      } else {
        result = await updateSubCategory(id, formData);
      }
      console.log("result", result);

      if (!result.success) {
        return toast(`Failed to ${isAdd ? "add" : "update"} sub-category.`, {
          type: "error",
        });
      }

      toast(`Sub-Category ${isAdd ? "added" : "updateed"} successfully.`, {
        type: "success",
      });
      navigate("/admin/subCategories");
    } catch (error) {
      toast(
        `Failed to ${isAdd ? "add" : "update"} sub-category` + error.message,
        { type: "error" }
      );
    }
  }

  if (loadingFormState) {
    return <MyAlert icon={HiArrowPath} msg="Loading..." />;
  }

  if (errorFormState) {
    return (
      <MyAlert
        color="failure"
        icon={HiMiniExclamationTriangle}
        msg={errorFormState}
      />
    );
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-[1fr_2fr] mt-4 gap-4"
      >
        <MyFileInput
          name="image"
          label="Upload Sub-Category File"
          url={imageURL}
          onChange={handleFileUpload}
        />

        <div className="flex flex-col gap-4">
          <MyTextInput
            name="name"
            label="Sub-Category Name"
            value={formState.name}
            onChange={handleChange}
            required={true}
          />

          <MyTextInput
            name="slug"
            label="Sub-Category Slug"
            value={formState.slug}
            disabled={true}
          />
          <MySelect
            name="category"
            label="Select A Category"
            value={formState.category}
            onChange={handleChange}
            options={categoryOptions}
          />
          <Button gradientDuoTone="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
export default SubCategoriesForm;
