import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiExclamation } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyFileUpload from "../../../components/admin/common/form/MyFileUpload";
import MySelect from "../../../components/admin/common/form/MySelect";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import MessageBox from "../../../components/common/MessageBox";
import {
  addSubCategory,
  getAllCategories,
  getSingleSubCategory,
  updateSubCategory,
} from "../../../services/apiServices";
import useForm from "../../../hooks/useForm";

const initialState = {
  name: "",
  slug: "",
  image: null,
  category: "",
};

function SubCategoriesForm() {
  const [imageURL, setImageURL] = useState("");
  const [categories, setCategories] = useState([]);

  const {
    isUpdate,
    formState,
    formStateLoading,
    formStateError,
    handleChange,
    handleSubmit,
  } = useForm(
    initialState,
    getSubCategoryById,
    addSubCategory,
    updateSubCategory,
    setOtherStates,
    getUpdatedFormState,
    getFormData,
    "/admin/subCategories"
  );

  function setOtherStates(data) {
    setImageURL(data.image);
  }

  function getUpdatedFormState(e, formStateCopy) {
    if (e.target.name === "name") {
      formStateCopy[e.target.name] = e.target.value;
      formStateCopy["slug"] = e.target.value.toLowerCase().replaceAll(" ", "-");
    } else if (e.target.name === "image") {
      formStateCopy["image"] = e.target.files[0];
      const tempURL = URL.createObjectURL(e.target.files[0]);
      setImageURL(tempURL);
    } else {
      formStateCopy[e.target.name] = e.target.value;
    }

    return formStateCopy;
  }

  function getFormData() {
    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("slug", formState.slug);
    formData.append("image", formState.image);
    formData.append("category", formState.category);
    return formData;
  }

  async function fetchAllCategories() {
    try {
      const result = await getAllCategories();
      const temp = result.data.map((category) => {
        return { value: category._id, text: category.name };
      });

      // Default first option.
      temp.unshift({ value: "", text: "Select A Category" });

      setCategories(temp);
    } catch (error) {
      toast("Failed to fetch categories.", { type: "error" });
    }
  }

  useEffect(() => {
    fetchAllCategories();
  }, []);

  // const { id } = useParams();
  // const isAdd = id === "add";
  // const [loadingFormState, setLoadingFormState] = useState(
  //   isAdd ? false : true
  // );
  // const [formState, setFormState] = useState(initialState);
  // const [errorFormState, setErrorFormState] = useState("");
  // const [imageURL, setImageURL] = useState("");
  // const [categoryOptions, setCategoryOptions] = useState([]);
  // const navigate = useNavigate();

  // async function fetchSubCategory() {
  //   try {
  //     const result = await getSingleSubCategory(id);

  //     if (!result.success) {
  //       toast("Failed to fetch sub-category", { type: "error" });
  //       setErrorFormState("Failed to fetch sub-category");
  //       return;
  //     }

  //     setFormState(result.data);
  //     setImageURL(result.data.image);
  //   } catch (error) {
  //     toast("Failed to fetch sub-category data.", { type: "error" });
  //     setErrorFormState("Failed to fetch sub-category.");
  //   } finally {
  //     setLoadingFormState(false);
  //   }
  // }

  // useEffect(() => {
  //   if (!isAdd) {
  //     fetchSubCategory();
  //   }
  // }, [id]);

  // function handleFileUpload(e) {
  //   const file = e.target.files[0];
  //   const tempURL = URL.createObjectURL(file);
  //   setImageURL(tempURL);
  //   setFormState({ ...formState, image: file });
  // }

  // function handleChange(e) {
  //   if (e.target.name === "name") {
  //     setFormState({
  //       ...formState,
  //       [e.target.name]: e.target.value,
  //       slug: e.target.value.toLowerCase().replaceAll(" ", "-"),
  //     });
  //   } else {
  //     setFormState({ ...formState, [e.target.name]: e.target.value });
  //   }
  // }

  // async function handleSubmit(e) {
  //   try {
  //     e.preventDefault(); // HTML ko form submit karne se rokenge.

  //     const formData = new FormData(); // FormData ko formState me append karenge loop ka use karke.
  //     for (const key in formState) {
  //       formData.append(key, formState[key]);
  //     }
  //     console.log("formState", formState);

  //     let result;
  //     if (isAdd) {
  //       result = await addSubCategory(formData);
  //     } else {
  //       result = await updateSubCategory(id, formData);
  //     }
  //     console.log("result", result);

  //     if (!result.success) {
  //       return toast(`Failed to ${isAdd ? "add" : "update"} sub-category.`, {
  //         type: "error",
  //       });
  //     }

  //     toast(`Sub-Category ${isAdd ? "added" : "updated"} successfully.`, {
  //       type: "success",
  //     });
  //     navigate("/admin/subCategories");
  //   } catch (error) {
  //     toast(
  //       `Failed to ${isAdd ? "add" : "update"} sub-category` + error.message,
  //       { type: "error" }
  //     );
  //   }
  // }

  if (formStateLoading) {
    return (
      <MessageBox
        renderIcon={() => {
          return <Spinner />;
        }}
        message="Loading..."
      />
    );
  }

  if (formStateError) {
    return (
      <MessageBox
        icon={HiExclamation}
        message={formStateError}
        status="error"
      />
    );
  }

  return (
    <div>
      <AdminPageTitle title={`${isUpdate ? "Update" : "Add"} SubCategory`} />
      <div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-[1fr_2fr] mt-4 gap-4"
        >
          <MyFileUpload
            name="image"
            label="Upload Sub-Category File"
            url={imageURL}
            onChange={handleChange}
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
              options={categories}
              value={formState.category}
              onChange={handleChange}
            />
            <Button
              gradientDuoTone="primary"
              type="submit"
              isProcessing={formStateLoading}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SubCategoriesForm;
