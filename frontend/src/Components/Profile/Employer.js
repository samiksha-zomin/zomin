import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { AuthContext } from "../../Helpers/AuthContext";
import { BiRightArrowCircle } from "react-icons/bi";

import { Col, Row } from "react-bootstrap";
import EmailIcon from "../../Assests/Images/icon/email.svg";
import Ads from "../Ads";

import ChangeProfile from "./Employer/ChangeProfile";
import Heading from "../Heading";
import Name from "../Name";
import Email from "../Email";
import About from "./Employer/About";

import CoverImg from "../../Assests/Images/background/cover.png";

function Employer() {
  const navigate = useNavigate();

  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/signup");
    } else {
      Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/basicinfo/status/`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((response) => {
        const attemptStatus = response.data[0];
        if (attemptStatus.attempt !== 1) {
          navigate("/basicinfo");
        }
      });
    }
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Row className="mx-2 px-1 px-lg-5">
        <Col lg={10} md={10} sm={12} className="px-1 px-lg-5 py-3 my-1">
          <Row className="mx-auto">
            <Col sm={12} className="p-0">
              <img
                src={CoverImg}
                alt=""
                className="img-fluid border border-1 w-100 coverImage"
              />
            </Col>
          </Row>
          <Row className="mx-auto">
            <Col sm={12} className="p-0 position-relative">
              <ChangeProfile /> 
            </Col>
            <Col sm={2} md={12} lg={12} className="border p-2">
              <Heading
                content={<Name id={authState.id} />}
                design="h5 text-truncate text-capitalize"
              />
              <p className="m-0 text-start fs-7">
                {" "}
                <img src={EmailIcon} alt="" className="icon" />{" "}
                <Email id={authState.id} />
              </p>
            </Col>
          </Row>

          <Row className="mx-auto my-2">
            <Col
              xs={12}
              sm={6}
              className="text-center text-md-start text-lg-start"
            >
              <a
                href={`/resume/${authState.id}`}
                className="text-dark text-decoration-none"
              >
                <BiRightArrowCircle /> View Partner Landing Page
              </a>
            </Col>
            <Col xs={12} sm={6} className="text-center text-md-end text-lg-end">
              <div className="form-check form-switch d-inline-block">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                  checked
                  readOnly
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckChecked"
                >
                  Are you hiring?
                </label>
              </div>
            </Col>
          </Row>

          <About id={authState.id} />
        </Col>
        <Col lg={2} md={2} sm={12} className="px-1 py-3 my-1 mx-auto">
          <Ads />
        </Col>
      </Row>
    </AuthContext.Provider>
  );
}

export default Employer;
