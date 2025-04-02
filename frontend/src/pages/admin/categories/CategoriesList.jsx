import React from "react";
import {
  deleteCategory,
  getAllCategories,
} from "../../../services/apiServices";
import MyCommonList from "../../../components/common/MyCommonList";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";

function CategoriesList() {
  return (
    <div>
      <AdminPageTitle
        title="Categories"
        btn={{ to: "/admin/categories/add", text: "Add Category" }}
      />
      <div>
        <MyCommonList
          getData={getAllCategories}
          deleteData={deleteCategory}
          getFieldValues={(entity) => {
            return {
              image: entity.image,
              title: entity.name,
              desc: entity.slug,
            };
          }}
        />
      </div>
    </div>
  );
}

export default CategoriesList;
