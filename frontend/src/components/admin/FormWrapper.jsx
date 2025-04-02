import React from "react";
import { useParams } from "react-router-dom";
import AdminPageTitle from "./AdminPageTitle";

function FormWrapper({ title, children }) {
  const { id } = useParams();
  const isAdd = id == "add";
  return (
    <div>
      <AdminPageTitle title={`${isAdd ? "Add" : "Update"} ${title}`} />
      {children}
    </div>
  );
}

export default FormWrapper;
