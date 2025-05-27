import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/signup";
import Login from "./components/Login/login";
import "./App.css";

function App() {
  const user = localStorage.getItem("user");

  const router = createBrowserRouter([
    {
      path: "/home",
      element: user ? <Home /> : <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
