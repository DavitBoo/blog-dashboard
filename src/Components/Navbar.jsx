import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { FaTableList, FaHashtag, FaSquarePlus, FaUserLarge,FaUserLargeSlash } from "react-icons/fa6";

import logo from "../assets/img/logo.png";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="sidebar">
      <div className="container">
        <div className="logo">
          
          <div className="d-flex align-items-center flex-wrap">
            <img src={logo} alt="Logo" style={{ width: "100px", height: "auto" }} />
            <h1>davitBoo Blog</h1>
          </div>
        </div>
        <div className="links d-flex-col">
          <Link className="link" to="/posts">
            <h6 className="d-flex align-items-center gap-1"><FaTableList /> All Posts</h6>
          </Link>

          <Link className="link" to="/labels">
            <h6 className="d-flex align-items-center gap-1"><FaHashtag /> Create labels</h6>
          </Link>
          <Link className="link" to="/new-post">
            <h6 className="d-flex align-items-center gap-1"><FaSquarePlus /> New Post</h6>
          </Link>

          <>
            {user ? (
              <>
                <p href="/">
                  Has iniciado sesión como <strong>{user}</strong>
                </p>
                <Link className="link" to="/" onClick={logout}>
                  <h6 className="d-flex align-items-center gap-1"><FaUserLargeSlash /> Logout</h6>
                </Link>
              </>
            ) : (
              <Link className="link" to="/login">
                <h6 className="d-flex align-items-center gap-1"><FaUserLarge /> Login</h6>
              </Link>
            )}
          </>
        </div>
      </div>
    </nav>
  );
}
