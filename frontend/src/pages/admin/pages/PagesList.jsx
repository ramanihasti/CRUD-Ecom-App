import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyCommonList from "../../../components/common/MyCommonList";
import { deletePage, getAllPages } from "../../../services/apiServices";

function PagesList() {
  return (
    <div>
      <AdminPageTitle
        title="Pages"
        btn={{ to: "/admin/pages/add", text: "Add Page" }}
      />
      <MyCommonList
        getData={getAllPages}
        deleteData={deletePage}
        getFieldValues={(entity) => {
          return {
            image: entity.images[0],
            title: entity.name,
            desc: entity.slug,
          };
        }}
      />
    </div>
  );
}

export default PagesList;
