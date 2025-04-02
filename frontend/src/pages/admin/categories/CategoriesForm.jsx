import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiArrowPath, HiMiniExclamationTriangle } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useForm from "../../../hooks/useForm";
import MessageBox from "../../../components/common/MessageBox";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyFileUpload from "../../../components/admin/common/form/MyFileUpload";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import {
  addCategory,
  getSingleCategory,
  updateCategory,
} from "../../../services/apiServices";

const initialState = {
  name: "",
  slug: "",
  image: "",
};

function CategoriesForm() {
  const [imageURL, setImageURL] = useState("");
  const {
    isUpdate,
    formState,
    formStateLoading,
    formStateError,
    handleChange,
    handleSubmit,
  } = useForm(
    initialState,
    getCategoryById,
    addCategory,
    updateCategory,
    setOtherStates,
    getUpdatedFormState,
    getFormData,
    "/admin/categories"
  );
  function setOtherStates(data) {
    setImageURL(data.image);
  }

  function getFormData() {
    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("slug", formState.slug);
    formData.append("image", formState.image);
    return formData;
  }

  function getUpdatedFormState(e, formStateCopy) {
    if (e.target.name === "name") {
      formStateCopy[e.target.name] = e.target.value;
      formStateCopy["slug"] = e.target.value.toLowerCase().replaceAll(" ", "-");
    } else if (e.target.name === "image") {
      formStateCopy["image"] = e.target.files[0];
      const tempURL = URL.createObjectURL(e.target.files[0]);
      setImageURL(tempURL);
    }

    return formStateCopy;
  }

  // const { id } = useParams();
  // const isAdd = id === "add";
  // const [loadingFormState, setLoadingFormState] = useState(
  //   isAdd ? false : true
  // );
  // const [formState, setFormState] = useState(initialState);
  // const [errorFormState, setErrorFormState] = useState("");
  // const [imageURL, setImageURL] = useState("");
  // const navigate = useNavigate();

  // async function fetchCategory() {
  //   try {
  //     if (!isAdd) {
  //       const result = await getSingleCategory(id);
  //       if (!result.success) {
  //         toast("Failed to fetch category.", { type: "error" });
  //         setErrorFormState("Failed to fetch category.");
  //         return;
  //       }
  //       setFormState(result.data);
  //       setImageURL(result.data.image);
  //     }
  //   } catch (error) {
  //     toast("Failed to fetch category data.", { type: "error" });
  //     setErrorFormState("Failed to fetch category data.");
  //   } finally {
  //     setLoadingFormState(false);
  //   }
  // }

  // useEffect(() => {
  //   if (!isAdd) {
  //     fetchCategory();
  //   }
  // }, [id]);

  // function handleChange(e) {
  //   setFormState({
  //     ...formState,
  //     name: e.target.value,
  //     slug: e.target.value.toLowerCase().replaceAll(" ", "-"),
  //   });
  // }
  // function handleFileUpload(e) {
  //   const file = e.target.files[0];
  //   setFormState({ ...formState, image: file });

  //   //temparary URL create kar ne ke liye Appko Frontend me URL object milta hain unme createObjectURL function miilta hain.
  //   // unko ek stste me store karna kyuki image rerender ho sake.s
  //   const tempURL = URL.createObjectURL(file);
  //   setImageURL(tempURL);
  // }

  // async function handleSubmit(e) {
  //   try {
  //     e.preventDefault();
  //     console.log("formState", formState);

  //     const formData = new FormData();
  //     formData.append("name", formState.name);
  //     formData.append("slug", formState.slug);
  //     formData.append("image", formState.image);

  //     console.log(Array.from(formData.entries()));

  //     let result;
  //     if (isAdd) {
  //       result = await addCategory(formData);
  //     } else {
  //       result = await updateCategory(id, formData);
  //     }
  //     console.log("result", result);

  //     if (!result.success) {
  //       return toast(`Failed to ${isAdd ? "add" : "update"} category.`, {
  //         type: "error",
  //       });
  //     }
  //     toast(`Category ${isAdd ? "added" : "updated"} successfully.`, {
  //       type: "success",
  //     });
  //     navigate("/admin/categories");
  //   } catch (error) {
  //     return toast(`Failed to ${isAdd ? "add" : "update"} category.`, {
  //       type: "error",
  //     });
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
      <AdminPageTitle title={isUpdate ? "Update Category" : "Add Category"} />
      <div>
        <form
          className="grid grid-cols-[1fr_2fr] mt-4 gap-4"
          onSubmit={handleSubmit}
        >
          {/* <div>
          <div className="mb-2 block">
            <Label htmlFor="image" value="Upload file" />
          </div>
          <FileInput id="image" name="image" onChange={handleFileUpload} />
        </div> */}
          <MyFileUpload
            name="image"
            label="Upload Category File"
            url={imageURL}
            onChange={handleChange}
          />

          <div className="flex flex-col gap-4">
            <MyTextInput
              name="name"
              label="Category Name"
              value={formState.name}
              onChange={handleChange}
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoriesForm;
