import React, { Fragment } from "react";
import Axios from 'axios';
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { BiError, BiMessageCheck, BiMinusCircle } from "react-icons/bi";

import Heading from "../Components/Heading";

import useInput from "../Helpers/use-input";
import { toast } from "react-toastify";

const isNotEmail = (
  value //eslint-disable-next-line
) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);

function ForgetPassword() {
  //LOGIN
  // Email Input Check
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isNotEmail);

  let forgetPasswordFormIsValid = false;

  if (enteredEmailIsValid) {
    forgetPasswordFormIsValid = true;
  }

  const forgetPasswordFormSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredEmailIsValid) {
      return;
    } else {
        Axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/verify/forgetpassword`, {
            email: enteredEmail,
          }).then((response) => {
            if (response.data.error) {
                return toast.error(
                  <Fragment>
                    <BiMinusCircle /> <span>{response.data.error}</span>
                  </Fragment>
                );
              } else if (response.data.warn) {
                return toast.warn(
                  <Fragment>
                    <BiError /> <span>{response.data.warn}</span>
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
    resetEmailInput("");
  };

  const emailClasses = emailInputHasError
    ? "form-control form-control-sm is-invalid p-2"
    : "form-control form-control-sm p-2";

  return (
    <div id="forgetpassword" className="forgetpassword vh-100">
      <Container className="mt-5 pt-5 mx-auto text-center">
        <Row>
          <Col>
            <Heading content="Recover Password" design="h3 mb-3" />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Don't worry,happens to the best of us.</p>
          </Col>
        </Row>
        <Form onSubmit={forgetPasswordFormSubmissionHandler}>
          <Row>
            <Col sm={4} className="mb-3 mx-auto">
              <input
                type="email"
                placeholder="Email Address"
                className={emailClasses}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
              />
              {emailInputHasError && (
                <Form.Control.Feedback type="invalid">
                  Please enter a valid Email Address.
                </Form.Control.Feedback>
              )}
            </Col>
          </Row>
          <Row>
            <Col sm={4} className=" mx-auto text-end">
              <Button
                className="mx-1"
                variant="outline-secondary"
                size="sm"
                href="/signup"
              >
                Cancel{" "}
              </Button>
              <Button
                type="submit"
                size="sm"
                variant="primary"
                disabled={!forgetPasswordFormIsValid}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default ForgetPassword;
