import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyCommonList from "../../../components/common/MyCommonList";
import { deletePage, getAllPages } from "../../../services/apiServices";

function PagesList() {
  return (
    <div>
      <AdminPageTitle title="Pages" link="/admin/pages/add" />
    </div>
  );
}

export default PagesList;
