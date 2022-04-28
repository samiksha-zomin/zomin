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
import ChangeProfile from "./User/Profile/ChangeProfile";
import About from "./User/Profile/About";
import Education from "./User/Profile/Education";
import WorkExperience from "./User/Profile/WorkExperience";
import Skills from "./User/Profile/Skills";
import Achievement from "./User/Profile/Achievement";
import Portfolio from "./User/Profile/Portfolio";
import Language from "./User/Profile/Language";
import RealLifeExperience from "./User/Profile/RealLifeExperience";
import Reference from "./User/Profile/Reference";

import CoverImg from "../../Assests/Images/background/cover.png";

function UserProfile({ setshowSubContentClick }) {

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
          if(attemptStatus.attempt !== 1) {
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
          
          <ChangeProfile />
        </Col>
        <Col sm={2} md={12} lg={12} className="border p-2">
          <Heading
            content={<Name id={authState.id} />}
            design="h5 text-truncate text-capitalize"
          />
          <p className="m-0 text-start fs-7">
            {" "}
            <img src={EmailIcon} alt="" className="icon" /> <Email id={authState.id} />
          </p>
          <p className="m-0 text-start fs-7">
            <img src={ContactIcon} alt="" className="icon" /> <Contact id={authState.id} />
          </p>
          
        </Col>
      </Row>

      <Row className="mx-auto my-2">
        <Col xs={12} sm={6} className="text-center text-md-start text-lg-start">
          <a href={`/resume/${authState.id}`} className="text-dark text-decoration-none">
            <BiRightArrowCircle /> View E-Resume
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
            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
              Are you looking for a job?
            </label>
          </div>
        </Col>
      </Row>

      <About id={authState.id}/>
      <Education id={authState.id}/>
      <WorkExperience id={authState.id}/>
      <Skills id={authState.id}/>
      <Achievement id={authState.id}/>
      <Portfolio id={authState.id}/>
      <Language id={authState.id}/>
      <RealLifeExperience id={authState.id}/>
      <Reference id={authState.id}/>
    </div>
    </AuthContext.Provider>
  );
}

export default UserProfile;
