import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="container">
        <div className="logo">
          <h1>Davit Boo - blog back end </h1>
        </div>
        <div className="links">
          <Link className="link" to="/labels">
            <h6>Create labels</h6>
          </Link>
          <Link className="link" to="/new-post">
            <h6>New Post</h6>
          </Link>
          <Link className="link" to="/login">
            <h6>Login</h6>
          </Link>
         
        </div>
      </div>
    </nav>
  );
}
