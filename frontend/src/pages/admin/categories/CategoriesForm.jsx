import React, { useState } from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { addCategory } from "../../../services/apiServices";
import MyFileInput from "../../../components/admin/common/MyFileInput";
import MyTextInput from "../../../components/admin/common/MyTextInput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CategoriesForm() {
  const [imageURL, setImageURL] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    slug: "",
    image: null,
  });
  const navigate = useNavigate();

  function handleInputChange(e) {
    setFormState({
      ...formState,
      name: e.target.value,
      slug: e.target.value.toLowerCase().replaceAll(" ", "-"),
    });
  }
  function handleFileUpload(e) {
    const file = e.target.files[0];
    setFormState({ ...formState, image: file });

    //temparary URL create kar ne ke liye Appko Frontend me URL object milta hain unme createObjectURL function miilta hain.
    // unko ek stste me store karna kyuki image rerender ho sake.s
    const tempURL = URL.createObjectURL(file);
    setImageURL(tempURL);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("formState", formState);

    const formData = new FormData();

    formData.append("name", formState.name);
    formData.append("slug", formState.slug);
    formData.append("image", formState.image);

    const result = await addCategory(formData);
    console.log("result", result);

    if (!result.success) {
      return toast("Faild to add category. " + result.msg, {
        type: "error",
      });
    }
    toast("Category added Successfully!", { type: "success" });
    navigate("/admin/categories");
  }

  return (
    <div>
      <AdminPageTitle title="Add Update Category" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* <div>
          <div className="mb-2 block">
            <Label htmlFor="image" value="Upload file" />
          </div>
          <FileInput id="image" name="image" onChange={handleFileUpload} />
        </div> */}
        <MyFileInput
          name="image"
          label="Upload Category File"
          onChange={handleFileUpload}
          url={imageURL}
        />

        <MyTextInput
          name="name"
          label="Category Name"
          value={formState.name}
          onChange={handleInputChange}
          required={true}
        />

        <MyTextInput
          name="slug"
          label="Category Slug"
          value={formState.slug}
          disabled={true}
        />
        <Button gradientDuoTone="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CategoriesForm;
