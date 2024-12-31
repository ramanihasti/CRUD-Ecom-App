import React, { useEffect, useState } from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MySelect from "../../../components/admin/common/form/MySelect";
import MyFileInput from "../../../components/admin/common/form/MyFileInput";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import { Button } from "flowbite-react";
import {
  addSubCategory,
  getAllCategories,
} from "../../../services/apiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  slug: "",
  image: null,
  category: "",
};

function SubCategoriesForm() {
  const [formState, setFormState] = useState(initialState);
  const [imageURL, setImageURL] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const navigate = useNavigate();

  async function fetchAllCategories() {
    try {
      const result = await getAllCategories();
      const temp = result.data.map((category) => {
        return { value: category._id, text: category.name };
      });
      setCategoryOptions(temp);
    } catch (error) {
      toast("Faied to get Categories.", { type: "error" });
    }
  }

  useEffect(() => {
    fetchAllCategories();
  }, []);

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
      console.log("formData", formData);

      const result = await addSubCategory(formData);
      if (!result.success) {
        return toast("Failed to add sub-category.", { type: "error" });
      }

      toast("Sub-category added successfully.", { type: "success" });
      console.log("result", result);
      navigate("/admin/subCategories");
    } catch (error) {
      toast("Failed to add sub-category" + error.message, { type: "error" });
    }
  }

  return (
    <div>
      <AdminPageTitle title="Add Update Sub-Category" />
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
