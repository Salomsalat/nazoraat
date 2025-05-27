import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { API, setAuthData } from "../utilis/config";

const SignUp = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState({
    email: "",
    name: "",
    key: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (Data.key !== Data.confirmPassword) {
      setError("parol bir xil emas");
      return;
    }

    try {
      const response = await API.post("/signup", {
        email: Data.email,
        name: Data.name,
        key: Data.key,
        secret: "my-secret1",
      });

      const result = response.data;

      if (result && result.isOk) {
        setAuthData(Data.key, "my-secret1");
        localStorage.setItem("user", JSON.stringify(result.data));
        navigate("/home");
      } else {
        setError("xato");
      }
    } catch {
      setError("xato terdingiz yoki ozi xato");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[434px] rounded-md p-8 flex flex-col items-center mt-5"
      >
        <h1 className="text-3xl mb-6">Sign Up</h1>

        <div className="w-full flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={Data.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-sm"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={Data.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-sm"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="key">Password</label>
            <input
              id="key"
              name="key"
              type="password"
              value={Data.key}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-sm"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={Data.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-sm mb-5"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="contained"
          className="max-w-[370px] w-full"
        >
          Sign Up
        </Button>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center max-w-[370px]">
            {error}
          </p>
        )}

        <p className="mt-5 text-center text-gray-700">
          Already signed up? Go to{" "}
          <Link to="/login" className="text-blue-600">
            log in
          </Link>
          .
        </p>
      </form>
    </div>
  );
};

export default SignUp;
