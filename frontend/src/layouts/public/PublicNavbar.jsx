import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { COMPANY_NAME } from "../../../consts";

function PublicNavbar() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          src="/logo.png"
          className="mr-3 h-6 sm:h-9"
          alt={`${COMPANY_NAME} Logo`}
        />
        {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span> */}
      </Navbar.Brand>
      <div className="flex md:order-2">
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
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item as={Link} to="/">
            Home
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}

export default PublicNavbar;
