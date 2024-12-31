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
      <AdminPageTitle title="Sub Categories" link="/admin/subCategories/add" />
      <div>
        <MyCommonList
          getAllData={getAllSubCategories}
          deleteData={deleteSubCategory}
        />
      </div>
    </div>
  );
}

export default SubCategoriesList;
