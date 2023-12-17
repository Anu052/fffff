import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const isLoggedIn = localStorage.getItem("token");

  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/home" ? "active" : ""
                }`}
                aria-current="page"
                to="/Home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/About" ? "active" : ""
                }`}
                aria-current="page"
                to="/About"
              >
                About
              </Link>
            </li>
          </ul>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          ) : (
            <form className="d-flex">
              <Link
                className="btn btn-primary mx-1"
                id="login"
                to="/login"
                role="button"
              >
                Sign
              </Link>
              <Link
                className="btn btn-primary mx-1"
                id="signup"
                to="/signup"
                role="button"
              >
                signUp
              </Link>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
