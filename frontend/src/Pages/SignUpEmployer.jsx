import React, { Fragment, useState, useEffect, useContext } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../Helpers/AuthContext";
import useInput from "../Helpers/use-input";

import Heading from "../Components/Heading";

import { Row, Col, Form, Button } from "react-bootstrap";
import { BiError, BiMessageCheck, BiMinusCircle, BiUser } from "react-icons/bi";
import { toast } from "react-toastify";

const isNotEmpty = (value) => value.trim() !== "";
const isNotEmail = (
  value //eslint-disable-next-line
) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);

const isNotPassword = (value) =>
  value.match(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/
  );

const isNotPhone = (value) => value.match(/^\d{10,12}$/);

function SignUpEmployer() {
  let navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  //Toggle Sign up and Log In form
  const [userIsRegistered, setLogin] = useState(false);
  const [industryList, setIndustryList] = useState("");

  function toggleLogin() {
    setLogin(!userIsRegistered);
  }
  //Industyry Level
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/meta/industry`).then(
      (response) => {
        setIndustryList(response.data);
      }
    );
  }, []);

  //LOGIN
  // Email Input Check
  const {
    value: enteredLogEmail,
    isValid: enteredLogEmailIsValid,
    hasError: logEmailInputHasError,
    valueChangeHandler: logEmailChangeHandler,
    inputBlurHandler: logEmailBlurHandler,
    reset: resetLogEmailInput,
  } = useInput(isNotEmail);

  // Password Input Check
  const {
    value: enteredLogPassword,
    isValid: enteredLogPasswordIsValid,
    hasError: logPasswordInputHasError,
    valueChangeHandler: logPasswordChangeHandler,
    inputBlurHandler: logPasswordBlurHandler,
    reset: resetLogPasswordInput,
  } = useInput(isNotPassword);

  let loginFormIsValid = false;

  if (enteredLogEmailIsValid && enteredLogPasswordIsValid) {
    loginFormIsValid = true;
  }
  const logInEmployerFormSubmissionHandler = (event) => {
    event.preventDefault();
    if (!enteredLogEmailIsValid && !enteredLogPasswordIsValid) {
      return;
    } else {
      Axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/auth/login`, {
        email: enteredLogEmail,
        password: enteredLogPassword,
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
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            id: response.data.id,
            admin: response.data.admin,
            company: response.data.company,
            attempt: response.data.attempt,
            status: true,
          });

          if (response.data.attempt === 1) {
            navigate("/");
          } else {
            navigate("/basicinfo");
          }
        }
      });
    }
    resetLogEmailInput();
    resetLogPasswordInput();
  };

  const logEmailClasses = logEmailInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const logPasswordClasses = logPasswordInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  //SIGN UP
  // Company Name Check
  const {
    value: enteredSignUpCompanyName,
    isValid: enteredSignUpCompanyNameIsValid,
    hasError: signUpCompanyNameInputHasError,
    valueChangeHandler: signUpCompanyNameChangeHandler,
    inputBlurHandler: signUpCompanyNameBlurHandler,
    reset: resetSignUpCompanyNameInput,
  } = useInput(isNotEmpty);

  //Industry Input Check
  const {
    value: enteredSignUpIndustry,
    isValid: enteredSignUpIndustryIsValid,
    hasError: signUpIndustryInputHasError,
    valueChangeHandler: signUpIndustryChangeHandler,
    inputBlurHandler: signUpIndustryBlurHandler,
    reset: resetSignUpIndustryInput,
  } = useInput(isNotEmpty);

  // Full Name Check
  const {
    value: enteredSignUpFullName,
    isValid: enteredSignUpFullNameIsValid,
    hasError: signUpFullNameInputHasError,
    valueChangeHandler: signUpFullNameChangeHandler,
    inputBlurHandler: signUpFullNameBlurHandler,
    reset: resetSignUpFullNameInput,
  } = useInput(isNotEmpty);

  // Email Input Check
  const {
    value: enteredSignUpEmail,
    isValid: enteredSignUpEmailIsValid,
    hasError: signUpEmailInputHasError,
    valueChangeHandler: signUpEmailChangeHandler,
    inputBlurHandler: signUpEmailBlurHandler,
    reset: resetSignUpEmailInput,
  } = useInput(isNotEmail);

  // Phone Input Check
  const {
    value: enteredSignUpPhone,
    isValid: enteredSignUpPhoneIsValid,
    hasError: signUpPhoneInputHasError,
    valueChangeHandler: signUpPhoneChangeHandler,
    inputBlurHandler: signUpPhoneBlurHandler,
    reset: resetSignUpPhoneInput,
  } = useInput(isNotPhone);

  // Password Input Check
  const {
    value: enteredSignUpPassword,
    isValid: enteredSignUpPasswordIsValid,
    hasError: signUpPasswordInputHasError,
    valueChangeHandler: signUpPasswordChangeHandler,
    inputBlurHandler: signUpPasswordBlurHandler,
    reset: resetSignUpPasswordInput,
  } = useInput(isNotPassword);

  let signUpFormIsValid = false;

  if (
    enteredSignUpCompanyName &&
    enteredSignUpIndustry &&
    enteredSignUpFullName &&
    enteredSignUpEmail &&
    enteredSignUpPhone &&
    enteredSignUpPassword
  ) {
    signUpFormIsValid = true;
  }

  /* eslint-disable-next-line */
  const signUpEmployerFormSubmissionHandler = (event) => {
    event.preventDefault();
    if (
      !enteredSignUpCompanyNameIsValid &&
      !enteredSignUpIndustryIsValid &&
      !enteredSignUpFullNameIsValid &&
      !enteredSignUpEmailIsValid &&
      !enteredSignUpPhoneIsValid &&
      !enteredSignUpPasswordIsValid
    ) {
      return;
    } else {
      Axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/auth/employer/signup`,
        {
          companyName: enteredSignUpCompanyName,
          industry: enteredSignUpIndustry,
          fullName: enteredSignUpFullName,
          email: enteredSignUpEmail,
          phone: enteredSignUpPhone,
          password: enteredSignUpPassword,
        }
      ).then((response) => {
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
    resetSignUpCompanyNameInput();
    resetSignUpIndustryInput();
    resetSignUpFullNameInput();
    resetSignUpEmailInput();
    resetSignUpPhoneInput();
    resetSignUpPasswordInput();
  };

  const signUpCompanyNameClasses = signUpCompanyNameInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const signUpIndustryClasses = signUpIndustryInputHasError
    ? "form-select form-select-sm is-invalid"
    : "form-select form-select-sm";

  const signUpFullNameClasses = signUpFullNameInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const signUpEmailClasses = signUpEmailInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const signUpPhoneClasses = signUpPhoneInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const signUpPasswordClasses = signUpPasswordInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <title> Employer - Sign Up & Log In | Zom - IN </title>
        </Helmet>
      </HelmetProvider>
      <div id="signUpEmployer" className="signUpEmployer">
        <Col sm={11} md={9} className="mx-auto">
          <Row>
            <Col sm={12} md={6}>
              {userIsRegistered ? (
                <>
                  <div className="text-center">
                    <Heading
                      content="Sign Up Now as an Employer!"
                      design="h4 mb-4"
                    />
                  </div>
                  <Form onSubmit={signUpEmployerFormSubmissionHandler}>
                    <Col sm={12} className="mb-3">
                      <input
                        type="text"
                        id="inputSignUpCompanyName"
                        placeholder="Company Name"
                        className={signUpCompanyNameClasses}
                        onChange={signUpCompanyNameChangeHandler}
                        onBlur={signUpCompanyNameBlurHandler}
                        value={enteredSignUpCompanyName}
                      />
                      {signUpCompanyNameInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please enter your Company Name.
                        </Form.Control.Feedback>
                      )}
                    </Col>
                    <Col sm={12} className="mb-3">
                      <select
                        defaultValue={""}
                        className={signUpIndustryClasses}
                        onChange={signUpIndustryChangeHandler}
                        onBlur={signUpIndustryBlurHandler}
                        aria-label="Industry"
                      >
                        <option value="" selected>
                          Industry
                        </option>

                        {industryList.map((industryList, key) => {
                          const enteredSignUpIndustry = industryList.child_name;
                          return (
                            <option
                              key={enteredSignUpIndustry}
                              value={enteredSignUpIndustry}
                            >
                              {enteredSignUpIndustry}
                            </option>
                          );
                        })}
                      </select>
                      {signUpCompanyNameInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please enter your Company Name.
                        </Form.Control.Feedback>
                      )}
                    </Col>
                    <Col sm={12} className="mb-3">
                      <input
                        type="text"
                        id="inputSignUpFullName"
                        placeholder="Representative Name"
                        className={signUpFullNameClasses}
                        onChange={signUpFullNameChangeHandler}
                        onBlur={signUpFullNameBlurHandler}
                        value={enteredSignUpFullName}
                      />
                      {signUpFullNameInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please enter your Full Name.
                        </Form.Control.Feedback>
                      )}
                    </Col>
                    <Col sm={12} className="mb-3">
                      <input
                        type="email"
                        id="inputSignUpEmail"
                        placeholder="Representative Email Address"
                        className={signUpEmailClasses}
                        onChange={signUpEmailChangeHandler}
                        onBlur={signUpEmailBlurHandler}
                        value={enteredSignUpEmail}
                      />
                      {signUpEmailInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please enter a valid Email Address.
                        </Form.Control.Feedback>
                      )}
                    </Col>
                    <Col sm={12} className="mb-3">
                      <input
                        type="text"
                        id="inputSignUpPhone"
                        placeholder="Phone Number"
                        className={signUpPhoneClasses}
                        onChange={signUpPhoneChangeHandler}
                        onBlur={signUpPhoneBlurHandler}
                        value={enteredSignUpPhone}
                      />
                      {signUpPhoneInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please enter a valid Phone Number.
                        </Form.Control.Feedback>
                      )}
                    </Col>
                    <Col sm={12} className="mb-3">
                      <input
                        type="password"
                        id="inputSignUpPassword"
                        placeholder="Password"
                        className={signUpPasswordClasses}
                        onChange={signUpPasswordChangeHandler}
                        onBlur={signUpPasswordBlurHandler}
                        value={enteredSignUpPassword}
                      />
                      {signUpPasswordInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Must contain more than 8 characters which contain at
                          least one lowercase letter, one uppercase letter, one
                          numeric digit, and one special character.
                        </Form.Control.Feedback>
                      )}
                    </Col>
                    <Col sm={12} className="mb-3">
                      <label>
                        By clicking sign up, you agree to Zom-In's{" "}
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
                    <Col sm={12} className="mb-3 text-center mx-auto">
                      <button
                        type="submit"
                        className=" btn btn-success"
                        disabled={!signUpFormIsValid}
                      >
                        Sign Up
                      </button>
                    </Col>
                    <Row>
                      <Col className=" text-end">
                        <Button variant="link" onClick={toggleLogin}>
                          Already have an account?
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <Heading
                      content="Log In Now as an Employer!"
                      design="h4 mb-4"
                    />
                  </div>
                  <Form onSubmit={logInEmployerFormSubmissionHandler}>
                    <Col sm={12} className="mb-3">
                      <input
                        type="email"
                        id="inputLogEmail"
                        placeholder="Email Address"
                        className={logEmailClasses}
                        onChange={logEmailChangeHandler}
                        onBlur={logEmailBlurHandler}
                        value={enteredLogEmail}
                      />
                      {logEmailInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please enter a valid Email Address.
                        </Form.Control.Feedback>
                      )}
                    </Col>
                    <Col sm={12} className="mb-3">
                      <input
                        type="password"
                        id="inputLogPassword"
                        placeholder="Password"
                        className={logPasswordClasses}
                        onChange={logPasswordChangeHandler}
                        onBlur={logPasswordBlurHandler}
                        value={enteredLogPassword}
                      />
                      {logPasswordInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Must contain more than 8 characters which contain at
                          least one lowercase letter, one uppercase letter, one
                          numeric digit, and one special character.
                        </Form.Control.Feedback>
                      )}
                    </Col>
                    <Col sm={12} className="mb-3 text-center mx-auto">
                      <button
                        type="submit"
                        className=" btn btn-primary"
                        disabled={!loginFormIsValid}
                      >
                        Log In
                      </button>
                    </Col>
                  </Form>
                  <Row>
                    <Col className="text-start">
                      <Button variant="link" href="/forgetpassword">
                        {!userIsRegistered && "Forget Password?"}
                      </Button>
                    </Col>
                    <Col className=" text-end">
                      <Button variant="link" onClick={toggleLogin}>
                        Don't have an account?
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
            </Col>
            <Col sm={12} md={6} className="divider text-center">
              <Heading content="Sign Up as User" design="h4 mb-4" />
              <div className="mb-5 d-grid gap-3">
                <Button href="/signup" variant="outline-success">
                  <BiUser className="icon" />
                  Sign Up as User
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </div>
    </Fragment>
  );
}

export default SignUpEmployer;
