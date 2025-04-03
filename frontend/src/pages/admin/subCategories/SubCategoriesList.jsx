import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyCommonList from "../../../components/common/MyCommonList";
import {
  deleteSubCategory,
  getAllSubCategories,
} from "../../../services/apiServices";

function SubCategoriesList() {
  return (
    <div>
      <AdminPageTitle
        title="Sub Categories"
        btn={{ to: "/admin/subCategories/add", text: "Add SubCategory" }}
      />
      <div>
        <MyCommonList
          getData={getAllSubCategories}
          deleteData={deleteSubCategory}
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

export default SubCategoriesList;
