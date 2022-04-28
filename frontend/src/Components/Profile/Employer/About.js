import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";

import { Col, Row, Form } from "react-bootstrap";
import Heading from "../../Heading";
import { BiPencil, BiMinusCircle, BiUser } from "react-icons/bi";
import LocationIcon from "../../../Assests/Images/icon/location.svg";
import ContactIcon from "../../../Assests/Images/icon/contact.svg";
import { toast } from "react-toastify";

function About() {
  const [aboutUser, setAboutUser] = useState([]);

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardEmployerProfile/about/`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      if (response.data.error) {
        return toast.error(
          <Fragment>
            <BiMinusCircle /> <span>{response.data.error}</span>
          </Fragment>
        );
      } else {
        console.log(response.data);
        setAboutUser(response.data);
      }
    });
  });

  return (
    <>
      <Row className="mx-auto border rounded p-2 my-2">
        <Col sm={12}>
          <Row>
            <Col xs={10} sm={10} className="text-start">
              <Heading content="About Employer" design="h5" />
            </Col>
            <Col xs={2} sm={2} className="text-end align-self-center">
              <p role="button" className="my-auto">
                <BiPencil
                  className="icon"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#about"
                />
              </p>
            </Col>
          </Row>
        </Col>

        {aboutUser.map((aboutDetails, key) => {
          const representativeName = aboutDetails.name;
          const contact = aboutDetails.contnum;
          const role = aboutDetails.role;
          const address = aboutDetails.user_address;

          return (
            <>
              {representativeName !== null && (
                <p className="m-0 text-start fs-7 text-capitalize">
                  <BiUser className="icon" />
                  {representativeName} ({role})
                </p>
              )}

              {contact !== null && (
                <p className="m-0 text-start fs-7 text-capitalize">
                <img alt="" src={ContactIcon} className="icon" />
                  {contact}
                </p>
              )}

              {address !== null && (
                <p className="m-0 text-start fs-7 text-capitalize">
                <img alt="" src={LocationIcon} className="icon" />
                  {address}
                </p>
              )}
            </>
          );
        })}
        <Col sm={12}></Col>
      </Row>
    </>
  );
}

export default About;
