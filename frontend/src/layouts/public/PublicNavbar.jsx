import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { COMPANY_NAME } from "../../consts";
import { getAllPages } from "../../services/apiServices";
import { toast } from "react-toastify";
import { HiShoppingCart } from "react-icons/hi2";

function PublicNavbar() {
  const [pages, setPages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));

  function handleOpen() {
    setIsOpen(true);
  }

  function handlecClose() {
    setIsOpen(false);
  }

  async function fetchAllPages() {
    try {
      const result = await getAllPages();

      if (!result.success) {
        toast("Failed to fetch pages.", { type: "error" });
      }
      setPages(result.data);
    } catch (error) {
      toast("Failed to fetch pages.", { type: "error" });
    }
  }
  useEffect(() => {
    fetchAllPages();
  }, []);

  return (
    <Navbar fluid border>
      <Navbar.Brand as={"div"}>
        <img
          src="/logo.png"
          className="mr-3 h-6 sm:h-9"
          alt={`${COMPANY_NAME} Logo`}
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          {COMPANY_NAME}
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button size="sm" pill className="mr-2" onClick={handleOpen}>
          <span className="flex items-center justify-center">
            <HiShoppingCart className="h-5 w-5" />
          </span>
        </Button>
        {isLoggedIn ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.fname}</span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item as={Link} to="/admin">
              Dashboard
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/user">
              Account
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Log Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Button size="sm" psill as={Link} to="/login" className="mr-2">
            Login/Register
          </Button>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        {pages.map((page) => {
          return (
            <Navbar.Link key={page._id} href={`/${page.slug}`}>
              {page.name}
            </Navbar.Link>
          );
        })}
        <Navbar.Link as={Link} to="/contact">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default PublicNavbar;
