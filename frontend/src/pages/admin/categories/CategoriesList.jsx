import React, { useEffect, useState } from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import { getAllCategories } from "../../../services/apiServices";

function CategoriesList() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    getAllCategories().then((result) => {
      setCategories(result.data);
    });
  }, []);

  if (!categories) return null;
  return (
    <div>
      <AdminPageTitle title="Categories" link="/admin/categories/add" />
      <div>
        <ul>
          {categories.map((category) => {
            return (
              <li className="flex items-center gap-4">
                <img
                  src={category.image}
                  alt=""
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div className="grow-[1]">
                  <h3 className="font-serif">{category.name}</h3>
                  <p className="font-thin">{category.slug}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default CategoriesList;
