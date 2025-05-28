import React from "react";
import error from "../../assets/404.png";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-white relative overflow-hidden">
      <div className="absolute inset-0  z-0" />

      <div className="z-10 flex flex-col items-center text-center">
        <img
          src={error}
          alt="404 Error"
          className="w-[400px] max-w-full mb-8"
        />
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/home")}
            className="bg-purple-700  text-white px-6 py-2 rounded-md "
          >
            Go Home Page
          </button>
          <button
            onClick={() => window.location.reload()}
            className="border border-purple-700 text-purple-700  px-6 py-2 rounded-md "
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
