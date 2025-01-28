import React, { useEffect, useState } from "react";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import MyTextarea from "../../../components/admin/common/form/MyTextarea";
import MySelect from "../../../components/admin/common/form/MySelect";
import { Button } from "flowbite-react";
import {
  addProduct,
  getAllCategories,
  getAllSubCategories,
  getSingleProduct,
  updateProduct,
} from "../../../services/apiServices";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import MyAlert from "../../../components/common/MyAlert";
import { HiArrowPath, HiMiniExclamationTriangle } from "react-icons/hi2";
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
  color: [],
  sizes: [],
};

function ProductsForm() {
  const { id } = useParams();
  const isAdd = id === "add";
  const [loadingFormState, setLoadingFormState] = useState(
    isAdd ? false : true
  );
  const [formState, setFormState] = useState(initialState);
  const [errorFormState, setErrorFormState] = useState("");

  const [imageUrls, setImageUrls] = useState([""]);

  const [LoadingCategories, setLoadingCategories] = useState(true);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [errorCategories, setErrorCategories] = useState([]);

  const [LoadingSubCategories, setLoadingSubCategories] = useState(true);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);
  const [errorSubCategories, setErrorSubCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  useEffect(() => {
    if (!isAdd) {
      fetchProduct();
    }
  }, [id]);

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

  async function fetchProduct() {
    try {
      const result = await getSingleProduct(id);

      if (!result.success) {
        toast("Failed to fetch Product.", { type: "error" });
        setErrorFormState("Failed to fetch Product.");
        return;
      }

      setFormState(result.data);
      setImageUrls(result.data.images);
    } catch (error) {
      toast("Failed to fetch product.", { type: "error" });
      setErrorFormState("Failed to fetch product.");
    } finally {
      setLoadingFormState(false);
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
    setImageUrls(temp);
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const formData = new FormData();
      for (const key in formState) {
        if (key === "images") {
          for (const image of formState[key]) {
            formData.append("images", image);
          }
        } else {
          formData.append(key, formState[key]);
        }
      }
      console.log("updated formState", formState);
      // console.log(Array.from(formData.entries()));

      let result;
      if (isAdd) {
        result = await addProduct(formData);
      } else {
        result = await updateProduct(id, formData);
      }

      if (!result.success) {
        return toast(`Failed to ${isAdd ? "add" : "update"} product.`, {
          type: "error",
        });
      }

      console.log("successfully updated product.", result);
      toast(`Successfully ${isAdd ? "added" : "updated"} product.`, {
        type: "success",
      });
      navigate("/admin/products");
    } catch (error) {
      console.log("Failed to update. ", error);
      toast(`Failed to ${isAdd ? "add" : "update"} product.`, {
        type: "error",
      });
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
      <form onSubmit={handleSubmit} className="grid grid-cols-1 mt-4 gap-4">
        {/* images upload */}
        <MyMultipleFileInput
          name="images"
          label="Product Images"
          onChange={handleFileUpload}
          urls={imageUrls}
        />

        {/* name Input */}
        <div className="grid grid-cols-2 gap-4">
          <MyTextInput
            name="name"
            label="Product Name"
            value={formState.name}
            onChange={handleChange}
            required={true}
          />
          {/* slug Input */}
          <MyTextInput
            name="slug"
            label="Product Slug"
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
