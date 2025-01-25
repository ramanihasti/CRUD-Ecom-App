import React, { useState } from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyMultipleFileInput from "../../../components/admin/common/form/MyMultipleFileInput";
import MySelect from "../../../components/admin/common/form/MySelect";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";

const initialState = {
  name: "",
  slug: "",
  images: "",
  subCategories: [],
};

function PagesForm() {
  const [formState, setFormState] = useState(initialState);
  const [imageUrls, setImageUrls] = useState([""]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  function handleChange() {}
  function handleSubmit() {}

  return (
    <div>
      <AdminPageTitle title="Add Update Page" />
      <div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <MyMultipleFileInput
            name="images"
            label="Pages Images"
            onChange={handleChange}
            urls={imageUrls}
          />
          <div className="grid grid-cols-2 gap-4">
            {/* name Select */}
            <MySelect
              name="name"
              label="Select A Page"
              value={formState.name}
              onChange={handleChange}
              options={categoriesOptions}
            />

            {/* slug Input */}
            <MyTextInput
              name="slug"
              label="Slug"
              value={formState.slug}
              disabled={true}
              required={true}
            />
          </div>
          {/* subCategories Multi Select */}
        </form>
      </div>
    </div>
  );
}

export default PagesForm;
