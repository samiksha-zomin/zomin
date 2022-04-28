import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { AuthContext } from "../../Helpers/AuthContext";
import { BiChevronLeft, BiRightArrowCircle } from "react-icons/bi";

import { Col, Row } from "react-bootstrap";
import EmailIcon from "../../Assests/Images/icon/email.svg";
import ContactIcon from "../../Assests/Images/icon/contact.svg";

import Heading from "../Heading";
import Name from "../Name";
import Email from "../Email";
import Contact from "../Contact";
import Profile from "../Profile";
import About from "../Dashboard/Employer/Profile/About";

import CoverImg from "../../Assests/Images/background/cover.png";
import UserImg from "../../Assests/Images/avatar/bp.png";

function EmployerProfile({ setshowSubContentClick }) {
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
      <div>
        <h1
          onClick={() => setshowSubContentClick(0)}
          className="me-2 d-block d-sm-none"
        >
          <BiChevronLeft className="d-inline" />
          <Heading content="My Profile" design="h1 d-inline-block" />
        </h1>
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
            <Profile
              id={authState.id}
              design="border rounded-circle bg-white position-absolute top-0 end-0 translate-middle-y me-2"
              width="100"
              height="100"
            />
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
            <p className="m-0 text-start fs-7">
              <img src={ContactIcon} alt="" className="icon" />{" "}
              <Contact id={authState.id} />
            </p>
          </Col>
        </Row>
        <About />
      </div>
    </AuthContext.Provider>
  );
}

export default EmployerProfile;
