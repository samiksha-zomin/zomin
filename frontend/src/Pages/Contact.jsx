import React, { Fragment } from "react";
import Axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { toast } from "react-toastify";


import useInput from "../Helpers/use-input";
import { BiMessageCheck, BiMinusCircle } from "react-icons/bi";

import Heading from "../Components/Heading";

const isNotEmpty = (value) => value.trim() !== "";
const isNotEmail = (
  value //eslint-disable-next-line
) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);

const isNotPhone = (value) => value.match(/^\d{10,12}$/);

function Contact() {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isNotEmail);

  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    hasError: phoneInputHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhoneInput,
  } = useInput(isNotPhone);

  const {
    value: enteredAbout,
    isValid: enteredAboutIsValid,
    hasError: aboutInputHasError,
    valueChangeHandler: aboutChangeHandler,
    inputBlurHandler: aboutBlurHandler,
    reset: resetAboutInput,
  } = useInput(isNotEmpty);

  let contactFormIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid && enteredPhoneIsValid && enteredAboutIsValid) {
    contactFormIsValid = true;
  }

  const contactFormSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid && !enteredEmailIsValid && !enteredPhoneIsValid && !enteredAboutIsValid) {
      return;
    } else {

        Axios.post(
            `${process.env.REACT_APP_SERVER_DOMAIN}/contact`,
            {
              name: enteredName,
              email: enteredEmail,
              phone: enteredPhone,
              about: enteredAbout
            }
          ).then((response) => {
            if (response.data.error) {
              return toast.error(
                <Fragment>
                  <BiMinusCircle /> <span>{response.data.error}</span>
                </Fragment>
              );
            } else {
              return toast.success(
                <Fragment>
                  <BiMessageCheck /> <span>{response.data.success}</span>
                </Fragment>
              );
            }
          });

    }
    resetNameInput();
    resetEmailInput();
    resetPhoneInput();
    resetAboutInput();
  };

  const nameClasses = nameInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const emailClasses = emailInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

    const phoneClasses = phoneInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

    const aboutClasses = aboutInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";


  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <title> Contact | Zom - IN </title>
        </Helmet>
      </HelmetProvider>
      <div id="contact" className="contact my-2">
        <Container>
          <Row>
            <Col lg={10} md={9} sm={12} className="mx-auto">
            <Heading
                content="Contact Us"
                design="h3 fw-bold text-center my-3"
              />
              <Heading
                content="Need Our Assistance?"
                design="h5 text-center my-3"
              />
              <Col sm={11} className="border rounded p-lg-4 p-md-3 p-3 mx-auto">
                <Form onSubmit={contactFormSubmissionHandler}>
                  <Col sm={12} className="form-group mb-3">
                    <label htmlFor="studyField" className="required">
                      Personal Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter the person-in-charge name"
                      className={nameClasses}
                      onChange={nameChangeHandler}
                      onBlur={nameBlurHandler}
                      value={enteredName}
                    />

                    {nameInputHasError && (
                      <Form.Control.Feedback type="invalid">
                        Please fill in person-in-charge name.
                      </Form.Control.Feedback>
                    )}
                  </Col>

                  <Col sm={12} className="form-group mb-3">
                    <label htmlFor="studyField" className="required">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      className={emailClasses}
                      onChange={emailChangeHandler}
                      onBlur={emailBlurHandler}
                      value={enteredEmail}
                    />

                    {emailInputHasError && (
                      <Form.Control.Feedback type="invalid">
                        Please fill in your valid email.
                      </Form.Control.Feedback>
                    )}
                  </Col>

                  <Col sm={12} className="form-group mb-3">
                    <label htmlFor="studyField" className="required">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      placeholder="01XXXXXXXX"
                      className={phoneClasses}
                      onChange={phoneChangeHandler}
                      onBlur={phoneBlurHandler}
                      value={enteredPhone}
                    />

                    {phoneInputHasError && (
                      <Form.Control.Feedback type="invalid">
                        Please fill in a valid contact number.
                      </Form.Control.Feedback>
                    )}
                  </Col>

                  <Col sm={12} className="form-group mb-3">
                    <label htmlFor="inputabout" className="required">
                      What Can We Help You With?
                    </label>
                    <Form.Control
                      as="textarea"
                      placeholder="Tell us what you want to know more."
                      rows="8"
                        className={aboutClasses}
                        onChange={aboutChangeHandler}
                        onBlur={aboutBlurHandler}
                        value={enteredAbout}
                    />
                    {aboutInputHasError && (
                      <Form.Control.Feedback type="invalid">
                        Tell us what you want to know more.
                      </Form.Control.Feedback>
                    )}
                  </Col>
                  <Col className="text-center mb-3">
                      <label>
                        By clicking submit, you agree to Zom-In's{" "}
                        <a
                          className="text-decoration-none"
                          href="/PrivacyPolicy"
                        >
                          Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a className="text-decoration-none" href="/TermOfUse">
                          Term of Use
                        </a>
                      </label>
                    </Col>
                  <Col sm={12} className="text-end mb-3">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={!contactFormIsValid}
                    >
                      {" "}
                      Submit
                    </Button>
                  </Col>
                </Form>
              </Col>
            </Col>
            <Col lg={2} md={3} sm={12} className="mx-auto">
              <Heading content="sidebar" design="h5 border" />
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
}

export default Contact;
