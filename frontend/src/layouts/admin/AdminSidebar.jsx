import React from "react";
import { HiSparkles } from "react-icons/hi2";
import { HiSquares2X2 } from "react-icons/hi2";
import { HiSquare2Stack } from "react-icons/hi2";
import { HiGift } from "react-icons/hi2";
import { HiMiniTruck } from "react-icons/hi2";
import { HiMiniUser } from "react-icons/hi2";
import { HiMiniPower } from "react-icons/hi2";
import { HiDocumentPlus } from "react-icons/hi2";

import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/apiServices";

const links = [
  { id: 1, name: "Dashboard", to: "/admin", icon: HiSparkles },
  { id: 2, name: "Categories", to: "/admin/categories", icon: HiSquares2X2 },
  {
    id: 3,
    name: "SubCategories",
    to: "/admin/subCategories",
    icon: HiSquare2Stack,
  },
  { id: 4, name: "Products", to: "/admin/products", icon: HiGift },
  { id: 5, name: "Pages", to: "/admin/pages", icon: HiDocumentPlus },
  { id: 6, name: "Orders", to: "/admin/orders", icon: HiMiniTruck },
  { id: 7, name: "Users", to: "/admin/users", icon: HiMiniUser },
  { id: 8, name: "Log Out", to: "/", icon: HiMiniPower },
];

function SidebarListItem({ icon: Icon, link, name }) {
  return (
    <li>
      <Link
        to={link}
        className="text-lg text-gray-600 hover:text-purple-600 flex items-center gap-2"
      >
        <Icon className="w-5 h-5" />
        <span>{name}</span>
      </Link>
    </li>
  );
}

function AdminSidebar() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const result = await logout();

      if (!result.success) {
        alert(result.msg);
      }
      alert("Logged out successfully.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <ul className="border-r border-r-gray-300 flex flex-col gap-6 p-4 font-serif">
        {links.map((link) => {
          return (
            <SidebarListItem
              key={link.id}
              icon={link.icon}
              link={link.to}
              name={link.name}
            />
          );
        })}
        <li
          onClick={handleLogout}
          key={value.id}
          className="text-lg cursor-pointer text-[#21534e] hover:text-teal-600 flex items-center gap-2 "
        >
          <HiMiniPower className="w-5 h-5" />
          <span>Log Out</span>
          {/* <Link className="flex items-center gap-2" to={value.to}>
            <value.icon className="h-4 w-4" />
            <span className="text-md">{value.name}</span>
          </Link> */}
        </li>
      </ul>
    </>
  );
}

export default AdminSidebar;
