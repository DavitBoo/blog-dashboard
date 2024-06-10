import styled from "styled-components";
import CreateLabels from "./Components/CreateLabels";
import Footer from "./Components/Footer";
import GetPosts from "./Components/GetPosts";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import NewPost from "./Components/NewPost";
import EditPost from "./Components/EditPost";
import Register from "./Components/Register";
import SinglePost from "./Components/SinglePost";
import GlobalStyle from "./globalStyles";
import { BrowserRouter as Router, Routes, Route, Link, createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import _Comment from "./Components/_Comment";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // loader: rootLoader,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/posts",
        element: <GetPosts />,
      },
      {
        path: "/labels",
        element: <CreateLabels />,
      },
      {
        path: "/new-post",
        element: <NewPost />,
      },
      {
        path: "/edit-post",
        element: <EditPost />,
      },
      {
        path: "/posts/:id",
        element: <SinglePost />,
      },
      {
        path: "/posts/:id/comment",
        element: <_Comment />,
      },

    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
      <div className="App">
        <GlobalStyle />
        <RouterProvider router={router} />
      </div>
  );
}

export default App;
