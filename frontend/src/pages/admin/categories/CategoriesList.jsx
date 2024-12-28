import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import {
  deleteCategory,
  getAllCategories,
} from "../../../services/apiServices";
import MyCommonList from "../../../components/common/MyCommonList";

function CategoriesList() {
  return (
    <div>
      <AdminPageTitle title="Categories" link="/admin/categories/add" />
      <div>
        <MyCommonList
          getAllData={getAllCategories}
          deleteData={deleteCategory}
        />
      </div>
    </div>
  );
}

export default CategoriesList;
