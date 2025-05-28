import { useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { API, setAuthData } from "../utilis/config";

const Login = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState({ name: "", key: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/signup", {
        name: data.name,
        key: data.key,
        secret: "my-secret1",
      });

      const result = response.data;

      if (result && result.isOk) {
        setAuthData(data.key, "my-secret1");
        localStorage.setItem("user", JSON.stringify(result.data));
        navigate("/home");
        window.location.reload();
      } else {
        setError("xato");
      }
    } catch {
      setError("error");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[434px] h-[520px] rounded-md p-8 flex flex-col items-center mt-5"
      >
        <h1 className="text-3xl mb-5">Sign In</h1>

        <div className="flex flex-col items-center justify-center space-y-6 mb-4 w-full">
          <div className="flex flex-col w-full max-w-[328px]">
            <label htmlFor="name" className="mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={data.name}
              onChange={handleChange}
              className={`w-full p-2 rounded-sm ${
                error ? "border border-red-500" : "border border-gray-300"
              }`}
              required
            />
          </div>

          <div className="flex flex-col w-full max-w-[328px]">
            <label htmlFor="key" className="mb-1">
              Password
            </label>
            <input
              id="key"
              name="key"
              type="password"
              value={data.key}
              onChange={handleChange}
              className={`w-full p-2 rounded-sm ${
                error ? "border border-red-500" : "border border-gray-300"
              }`}
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="contained"
          className="max-w-[328px] w-full"
        >
          Sign In
        </Button>

        <p className="mt-4 text-center w-full max-w-[328px]">
          don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 no-underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
