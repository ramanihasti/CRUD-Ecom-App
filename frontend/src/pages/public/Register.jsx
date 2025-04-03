import React from "react";
import MyTextInput from "../../components/admin/common/form/MyTextInput";
import { Button } from "flowbite-react";
import { register } from "../../services/apiServices";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (e.target.password.value !== e.target.confirmPassword.value) {
      alert("Passwords do not match.");
      return;
    }

    const formData = {
      fname: e.target.fname.value,
      lname: e.target.lname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const result = await register(formData);

      if (!result.success) {
        alert(result.msg);
        return;
      }
      alert("Registered successfully.");
      navigate("/login");
    } catch (error) {
      console.log(first);
    }
  }
  return (
    <div className="p-8 font-serif">
      <div className="border border-gray-300 rounded-lg p-8 max-w-[400px] m-auto">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <MyTextInput name="fname" type="text" label="First Name" />
          <MyTextInput name="lname" type="text" label="Last Name" />
          <MyTextInput name="email" type="email" label="Email" />
          <MyTextInput name="password" type="password" label="Password" />
          <MyTextInput
            name="confirmPassword"
            type="password"
            label="Confirm Password"
          />
          <Button type="submit" className="mt-4">
            Submit
          </Button>
          <p className="text-center">OR</p>
          <Link className="text-center text-teal-900" to="/login">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
