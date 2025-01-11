import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyCommonList from "../../../components/common/MyCommonList";
import { deleteProduct, getAllProducts } from "../../../services/apiServices";

function ProductsList() {
  return (
    <div>
      <AdminPageTitle title="Product List" link="/admin/products/add" />
      <MyCommonList
        getAllData={getAllProducts}
        deleteData={deleteProduct}
        getAllFields={(product) => {
          return {
            image: product.images[0],
            title: product.name,
            subTitle: product.price,
          };
        }}
      />
    </div>
  );
}

export default ProductsList;
