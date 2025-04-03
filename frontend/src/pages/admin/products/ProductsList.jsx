import React from "react";
import MyCommonList from "../../../components/common/MyCommonList";
import { deleteProduct, getAllProducts } from "../../../services/apiServices";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";

function ProductsList() {
  return (
    <div>
      <AdminPageTitle
        title="Product List"
        btn={{ to: "/admin/products/add", text: "Add Product" }}
      />
      <div>
        <MyCommonList
          getData={getAllProducts}
          deleteData={deleteProduct}
          getFieldValues={(entity) => {
            return {
              image: entity.images[0],
              title: entity.name,
              desc: entity.price.toLocalString("en-in"),
            };
          }}
        />
      </div>
    </div>
  );
}

export default ProductsList;
