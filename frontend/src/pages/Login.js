import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/users/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      Cookies.set("signedInUser",result);
      nav("/");
      window.location.reload();

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-5/6 ml-auto p-12">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        
        <div className="flex flex-col">
          <label htmlFor="username" className="text-xl font-medium mb-2">
            Enter your username or email:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-xl font-medium mb-2">
            Enter your password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-center">
          <input
            type="submit"
            value="Log in!"
            className="p-2 bg-blue-500 text-white font-semibold rounded-md cursor-pointer hover:bg-blue-600"
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
