import React, { useEffect, useState } from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyFileInput from "../../../components/admin/common/form/MyFileInput";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import MySelect from "../../../components/admin/common/form/MySelect";
import { Button } from "flowbite-react";
import {
  getAllCategories,
  getAllSubCategories,
} from "../../../services/apiServices";
import { toast } from "react-toastify";
import MyTextarea from "../../../components/admin/common/form/MyTextarea";
import MyMultipleFileInput from "../../../components/admin/common/form/MyMultipleFileInput";

const initialState = {
  name: "",
  slug: "",
  desc: "",
  images: null,
  category: "",
  subCategory: "",
  price: "",
  quantity: "",
  discountPercentage: "",
  taxPercentage: "",
  shippingFee: "",
  colors: [],
  sizes: [],
};

function ProductsForm() {
  const [loadingFormState, setLoadingFormState] = useState(true);
  const [formState, setFormState] = useState(initialState);
  const [errorFormState, setErrorFormState] = useState("");

  const [imageURLs, setImageURLs] = useState([""]);

  const [LoadingCategories, setLoadingCategories] = useState(true);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [errorCategories, setErrorCategories] = useState([]);

  const [LoadingSubCategories, setLoadingSubCategories] = useState(true);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);
  const [errorSubCategories, setErrorSubCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  async function fetchCategories() {
    try {
      const result = await getAllCategories();

      if (!result.success) {
        toast("Failed to fetch categories.", { type: "error" });
        setErrorCategories("Failed to fetch categories.");
        return;
      }

      const transformedCateggories = result.data.map((category) => {
        return { value: category._id, text: category.name };
      });
      setCategoriesOptions(transformedCateggories);
    } catch (error) {
      toast("Failed to fetch categories.", { type: "error" });
      setErrorCategories("Failed to fetch categories.");
    } finally {
      setLoadingCategories(false);
    }
  }

  async function fetchSubCategories() {
    try {
      const result = await getAllSubCategories();

      if (!result.success) {
        toast("Failed to fetch sub-Categories.", { type: "error" });
        setErrorSubCategories("Failed to fetch sub-Categories.");
        return;
      }

      const transformedSubCateggories = result.data.map((subCategory) => {
        return { value: subCategory._id, text: subCategory.name };
      });
      setSubCategoriesOptions(transformedSubCateggories);
    } catch (error) {
      toast("Failed to fetch sub-Categories.", { type: "error" });
      setErrorSubCategories("Failed to fetch sub-Categories.");
    } finally {
      setLoadingSubCategories(false);
    }
  }

  function handleChange(e) {
    if (e.target.name === "name") {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
        slug: e.target.value.toLowerCase().replaceAll(" ", "-"),
      });
    } else {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
      });
    }
  }

  function handleFileUpload(e) {
    const files = e.target.files;
    setFormState({ ...formState, images: files });

    const temp = [];
    for (const file of files) {
      temp.push(URL.createObjectURL(file));
    }
    setImageURLs(temp);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("formState", formState);
  }

  return (
    <div>
      <AdminPageTitle title="Add Update Product" />
      <form onSubmit={handleSubmit} className="grid grid-cols-1 mt-4 gap-4">
        {/* images upload */}
        <MyMultipleFileInput
          name="images"
          label="Product Images"
          onchange={handleFileUpload}
          urls={imageURLs}
        />
        <div className="grid grid-cols-2 gap-4">
          {/* name Input */}
          <MyTextInput
            name="name"
            label="Name"
            value={formState.name}
            onChange={handleChange}
            required={true}
          />

          {/* slug Input */}
          <MyTextInput
            name="slug"
            label="Sub-Category Slug"
            value={formState.slug}
            disabled={true}
          />
        </div>

        {/* desc Textarea */}
        <MyTextarea
          name="desc"
          label="Description"
          value={formState.desc}
          onchange={handleChange}
        />
        <div className="grid grid-cols-2 gap-4">
          {/* category Select */}
          <MySelect
            name="category"
            label="Select A Category"
            value={formState.category}
            onChange={handleChange}
            options={categoriesOptions}
          />
          {/* subCategory Select */}
          <MySelect
            name="subCategory"
            label="Select A Sub-Category"
            value={formState.subCategory}
            onChange={handleChange}
            options={subCategoriesOptions}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* price Input */}
          <MyTextInput
            name="price"
            label="Price"
            type="number"
            value={formState.price}
            onChange={handleChange}
            required={true}
          />

          {/* quantity Input */}
          <MyTextInput
            name="quantity"
            label="Quantity"
            type="number"
            value={formState.quantity}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* discountPercentage Input */}
          <MyTextInput
            name="discountPercentage"
            label="Discount (%)"
            type="number"
            value={formState.discountPercentage}
            onChange={handleChange}
            required={true}
          />
          {/* taxPercentage Input */}
          <MyTextInput
            name="taxPercentage"
            label="Tax (%)"
            type="number"
            value={formState.taxPercentage}
            onChange={handleChange}
            required={true}
          />

          {/* shippingFee Input */}
          <MyTextInput
            name="shippingFee"
            label="Shipping Fee"
            type="number"
            value={formState.shippingFee}
            onChange={handleChange}
            required={true}
          />
        </div>
        {/* colors Multi Select */}
        {/* sizes Multi Select */}
        <Button gradientDuoTone="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ProductsForm;
