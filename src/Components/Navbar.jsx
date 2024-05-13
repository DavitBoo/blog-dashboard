import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    setUser(null);
  };

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

          <>
            {user ? (
              <>
                <p href="/">
                  Has iniciado sesión como <strong>{user}</strong>
                </p>
                <Link className="link" to="/" onClick={handleLogout}>
                  <h6>Logout</h6>
                </Link>
              </>
            ) : (
              <Link className="link" to="/login">
                <h6>Login</h6>
              </Link>
            )}
          </>
        </div>
      </div>
    </nav>
  );
}
