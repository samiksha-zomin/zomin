import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Helmet } from 'react-helmet';
import Axios from "axios";
import routes from "./Config/routes";
import NotFound from "./Pages/NotFound";
import Logo from "./Components/Logo";
import LogoEmployer from "./Components/LogoEmployer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

import "./App.css";

import { AuthContext } from "./Helpers/AuthContext";
import Profile from "./Components/Profile";

import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [authState, setAuthState] = useState({
    id: "",
    admin: "",
    company: "",
    attempt: "",
    status: false,
  });

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/auth/authenticate`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({
          id: response.data.id,
          admin: response.data.admin,
          company: response.data.company,
          attempt: response.data.attempt,
          status: true,
        });
      }
    });
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      id: "",
      admin: "",
      company: "",
      attempt: "",
      status: false,
    });
  };

  return (
    <div>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar
            collapseOnSelect
            bg="white"
            variant="light"
            expand="lg"
            sticky="top"
            className="border-bottom navbar-light"
          >
            <Container>
              <Navbar.Brand href="/">
                {!authState.status ? (
                  <Logo />
                ) : authState.company !== 1 ? (
                  <Logo />
                ) : (
                  <LogoEmployer />
                )}
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto text-center d-flex align-items-center">
                  {authState.status && (
                    <>
                      <Nav.Link href="/">Home</Nav.Link>
                    </>
                  )}
                  <Nav.Link href="/partner">Partners</Nav.Link>
                  <Nav.Link href="/opportunity">Opportunity</Nav.Link>
                  <Nav.Link href="/spiceIn">Spice IN</Nav.Link>
                  {!authState.status && (
                    <Nav.Link href="/aboutus">About Us</Nav.Link>
                  )}
                </Nav>
                {!authState.status ? (
                  <Nav>
                    <Button
                      variant="outline-primary"
                      className="m-1"
                      href="/SignUp"
                    >
                      Log In / Sign Up
                    </Button>
                    <Button
                      variant="outline-success"
                      className="m-1"
                      href="/employer"
                    >
                      For Employer
                    </Button>
                  </Nav>
                ) : (
                  <Nav className="text-center">
                    <div className="dropdown text-center text-lg-end">
                      <a
                        href="#headerDropdown"
                        className="d-block link-dark text-decoration-none dropdown-toggle"
                        id="dropdownUser1"
                        data-bs-toggle="dropdown"
                        data-bs-display="static"
                        aria-expanded="false"
                      >
                        <Profile
                          id={authState.id}
                          design="rounded-circle"
                          width="32"
                          height="32"
                        />
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-lg-end text-center text-lg-start"
                        aria-labelledby="dropdownUser1"
                      >
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/profile">
                            Profile
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/application">
                            Job Application
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/interview">
                            Interview
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/settings">
                            Settings
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/aboutus">
                            About Us
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li onClick={logout}>
                          <button className="dropdown-item">Sign Out</button>
                        </li>
                      </ul>
                    </div>
                  </Nav>
                )}
              </Navbar.Collapse>
            </Container>
          </Navbar>
          {authState.admin === 1 ? (
            <Navbar bg="light" variant="light">
              <Container>
                <Navbar.Brand href="/zomDashboard">
                  Admin Dashboard
                </Navbar.Brand>
                <Nav className="me-auto">
                  <NavDropdown title="User" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/zomAdminUser">
                      Total User
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/zomAdminStudent">
                      Verified User
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/zomAdminEmployer">
                      Employer
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Partner" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/zomAdminPartner">
                      Partners
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/zomAdminPartnerApplication">
                      Application
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/zomAdminPartnerSavedApplication">
                      Saved Application
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Opportunity" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/zomAdminJobVacancy">
                      Job Vacancy
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/zomAdminJobApplication">
                      Job Application
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link href="/zomAdminSpiceIN">Spice IN</Nav.Link>
                  <Nav.Link href="#pricing">Create Account</Nav.Link>
                  <Nav.Link href="#pricing">Tracking</Nav.Link>
                  <Nav.Link href="#pricing">FAQs</Nav.Link>
                  <Nav.Link href="#pricing">Contact</Nav.Link>
                  <Nav.Link href="#pricing">Others</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
          ) : null}
        </Router>

        <Router>
          <Routes>
            {routes.map(({ path, name, element }, key) => {
              return (
                <Route
                  key={element}
                  exact
                  path={path}
                  name={name}
                  element={element}
                />
              );
            })}

            <Route path="*" element={<NotFound />} />
          </Routes>

          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
