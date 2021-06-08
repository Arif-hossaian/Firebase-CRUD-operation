/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

const NavBar = () => {
  const firebase = useFirebase();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Student Field
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
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item ">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/studentForm"
              >
                <Button variant="outlined" color="primary">
                  Add Students
                </Button>
              </Link>
            </li>
            <li className="nav-item ">
              <img
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                height="30px"
                width="30px"
                alt="admin"
                style={{ marginTop: "13px" }}
              />
            </li>
            <li className="nav-item dropdown" style={{ marginTop: "5px" }}>
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Arif hossain
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a
                    className="dropdown-item"
                    href="!#"
                    onClick={() => firebase.logout()}
                  >
                    Logout
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
