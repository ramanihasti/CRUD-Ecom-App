import { Button } from "flowbite-react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import CategoriesList from "./pages/admin/categories/CategoriesList";
import CategoriesForm from "./pages/admin/categories/CategoriesForm";
import SubCategoriesList from "./pages/admin/subCategories/SubCategoriesList";
import SubCategoriesForm from "./pages/admin/subCategories/SubcategoriesForm";
import ProductsForm from "./pages/admin/products/ProductsForm";
import ProductsList from "./pages/admin/products/ProductsList";
import PagesList from "./pages/admin/pages/PagesList";
import PagesForm from "./pages/admin/pages/PagesForm";
import OrdersList from "./pages/admin/orders/OrdersList";
import OrdersForm from "./pages/admin/orders/OrdersForm";
import UsersList from "./pages/admin/users/UsersList";
import UsersForm from "./pages/admin/users/UsersForm";
import Home from "./pages/public/Home";
import PublicLayout from "./layouts/public/PublicLayout";
import FormWrapper from "./components/admin/common/FormWrapper";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
          </Route>
          {/* <Route path="/user" element={<UserLayout />}>
            <Route />
          </Route> */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="categories" element={<CategoriesList />} />
            <Route
              path="categories/:id"
              element={
                <FormWrapper title={"Category"}>
                  <CategoriesForm />
                </FormWrapper>
              }
            />
            <Route path="subCategories" element={<SubCategoriesList />} />
            <Route
              path="subCategories/:id"
              element={
                <FormWrapper title={"Sub Category"}>
                  <SubCategoriesForm />
                </FormWrapper>
              }
            />
            <Route path="products" element={<ProductsList />} />
            <Route path="products/:id" element={<ProductsForm />} />
            <Route path="pages" element={<PagesList />} />
            <Route path="pages/:id" element={<PagesForm />} />
            <Route path="orders" element={<OrdersList />} />
            <Route path="orders/:id" element={<OrdersForm />} />
            <Route path="users" element={<UsersList />} />
            <Route path="users/:id" element={<UsersForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* //react-route-dom //tailwind css //flowbite-react //vite // react-icon*/}
    </>
  );
}

export default App;
