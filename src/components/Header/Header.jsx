import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Dropdown, Nav } from "react-bootstrap";
import style from "./Header.module.css";
import { useAuthCtx } from "@/context/AuthCtx";

const Header = (props) => {
  const router = useRouter();
  // const [themeMode, setThemeMode] = useState("light");
  const { isAuthenticated, _logout, userDetails } = useAuthCtx();

  // const darkMode = () => {
  //   setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  //   if (document.querySelector("[data-bs-theme='light']")) {
  //     document
  //       .querySelector("[data-bs-theme='light']")
  //       .setAttribute("data-bs-theme", "dark");
  //   } else if (document.querySelector("[data-bs-theme='dark']")) {
  //     document
  //       .querySelector("[data-bs-theme='dark']")
  //       .setAttribute("data-bs-theme", "light");
  //   }
  // };

  const pageChangeHandler = (page) => {
    router.push(page);
  };

  const { pathname } = router;
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm  w-100">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" href="/">
          <img src={"/img/habit-tracker-app.png"} style={{ height: "65px" }} />{" "}
          Habit Tracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <div className="d-flex">
            {/* <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        /> */}
            {/* <div className="dropdown d-flex align-items-center me-3">
              <Nav.Link
                className="nav-link icon theme-layout nav-link-bg layout-setting text-primary"
                onClick={() => darkMode()}
              >
                {themeMode === "light" ? (
                  <span className="dark-layout">
                    <i className="bi bi-moon"></i>
                  </span>
                ) : (
                  <span className="light-layout">
                    <i className="bi bi-brightness-high"></i>
                  </span>
                )}
              </Nav.Link>
            </div> */}
            {isAuthenticated ? (
              <Dropdown className="profile-1 d-flex align-items-center me-3">
                <Dropdown.Toggle
                  variant=""
                  className={`nav-link leading-none d-flex no-caret ${style["dropdown-toggle"]}`}
                >
                  <span
                    className="d-flex align-items-center rounded-circle justify-content-center fs-"
                    style={{
                      padding: "0.2rem 0.4rem",
                    }}
                  >
                    <i className="bi bi-person text-primary"></i>
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end dropdown-menu-arrow">
                  <div className="drop-heading">
                    <div className="text-center">
                      <h5 className="mb-0 fs-14 fw-semibold">
                        {userDetails?.fullName}
                      </h5>
                      <small className="text-muted mx-2">
                        {userDetails?.email}
                      </small>
                    </div>
                  </div>
                  {/* <div className="dropdown-divider m-0"></div> */}
                  {/* <p
                  className="dropdown-item mb-0"
                  style={{ cursor: "pointer" }}
                  onClick={() => {}}
                >
                  <i className="dropdown-icon bi bi-box-arrow-right"></i> Sign
                  out
                </p> */}
                </Dropdown.Menu>
              </Dropdown>
            ) : null}
            {/* <div className="dropdown d-flex align-items-center me-3">
              <Nav.Link className="nav-link icon theme-layout nav-link-bg layout-setting text-primary">
                <span className="dark-layout">
                  <i className="bi bi-box-arrow-right"></i>
                </span>
              </Nav.Link>
            </div> */}
            {isAuthenticated ? (
              <button className="btn btn-primary" onClick={_logout}>
                <i className="bi bi-box-arrow-right"></i> Logout
              </button>
            ) : null}
            {!isAuthenticated && pathname !== "/login" ? (
              <button
                className="btn btn-outline-primary me-3"
                onClick={pageChangeHandler.bind(null, "/login")}
              >
                Login
              </button>
            ) : null}
            {!isAuthenticated && pathname !== "/signup" ? (
              <button
                className="btn btn-primary"
                onClick={pageChangeHandler.bind(null, "/signup")}
              >
                Create an account
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
