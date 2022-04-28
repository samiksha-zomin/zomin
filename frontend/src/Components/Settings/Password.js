import React, { useState, Fragment } from "react";
import Axios from "axios";
import { Col, Form } from "react-bootstrap";
import { BiChevronLeft } from "react-icons/bi";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { BiError, BiMessageCheck, BiMinusCircle } from "react-icons/bi";


import Heading from "../Heading";

import useInput from "../../Helpers/use-input";
import { toast } from "react-toastify";

const isNotPassword = (value) =>
  value.match(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/
  );

function Password({ setshowSubContentClick }) {

  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const toggleCurrentPassword = () => {
    setCurrentPassword(!currentPassword);
  };

  const toggleNewPassword = () => {
    setNewPassword(!newPassword);
  };

  const toggleConfirmPassword = () => {
    setConfirmPassword(!confirmPassword);
  };

  // Current Password Input Check
  const {
    value: enteredCurrentPassword,
    isValid: enteredCurrentPasswordIsValid,
    hasError: currentPasswordInputHasError,
    valueChangeHandler: currentPasswordChangeHandler,
    inputBlurHandler: currentPasswordBlurHandler,
    reset: resetCurrentPasswordInput,
  } = useInput(isNotPassword);

  // New Password Input Check
  const {
    value: enteredNewPassword,
    isValid: enteredNewPasswordIsValid,
    hasError: newPasswordInputHasError,
    valueChangeHandler: newPasswordChangeHandler,
    inputBlurHandler: newPasswordBlurHandler,
    reset: resetNewPasswordInput,
  } = useInput(isNotPassword);

  // Confirm Password Input Check
  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput(isNotPassword);

  let changePasswordIsValid = false;

  if (enteredCurrentPassword && enteredNewPassword && enteredConfirmPassword) {
    changePasswordIsValid = true;
  }

  const changePasswordFormSubmissionHandler = (event) => {
    event.preventDefault();

    if(enteredNewPassword !== enteredConfirmPassword) {

        return toast.warn(
            <Fragment>
              <BiError /> <span>New Password and Confirm Password does not match!</span>
            </Fragment>
          );

    } else {
        if (
            !enteredCurrentPasswordIsValid &&
            !enteredNewPasswordIsValid &&
            !enteredConfirmPasswordIsValid
          ) {
            return;
          } else {
            Axios.post(
                `${process.env.REACT_APP_SERVER_DOMAIN}/settings/password`,
                {
                    currentPassword: enteredCurrentPassword,
                    newPassword: enteredNewPassword,
                    confirmPassword: enteredConfirmPassword,
                }, 
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                      },
                }
            ).then ((response) => {
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
            })
          }
          resetCurrentPasswordInput();
          resetNewPasswordInput();
          resetConfirmPasswordInput();
    }


  };

  const currentPasswordClasses = currentPasswordInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const newPasswordClasses = newPasswordInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const confirmPasswordClasses = confirmPasswordInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  return (
    <div>
      <h1
        onClick={() => setshowSubContentClick(0)}
        className="me-2 d-block d-sm-none"
      >
        <BiChevronLeft className="d-inline" />
        <Heading content="Password" design="h1 d-inline-block" />
      </h1>
      <Col lg={10} md={12} sm={12} className="mx-auto my-2">
        <Heading content="Change Password" design=" h3 mb-4" />

        <Form onSubmit={changePasswordFormSubmissionHandler}>
          <Col sm={12} className="form-group mb-3">
            <label htmlFor="studyField" className="required">
              Current Password
            </label>
            <div className="input-group mb-3">
              <input
                type={currentPassword ? "text" : "password"}
                className={currentPasswordClasses}
                onChange={currentPasswordChangeHandler}
                onBlur={currentPasswordBlurHandler}
                value={enteredCurrentPassword}
              />
              <span
                className="input-group-text"
                onClick={toggleCurrentPassword}
              >
                {currentPassword === true ? <BsEyeFill /> : <BsEyeSlashFill />}
              </span>
              {currentPasswordInputHasError && (
                <Form.Control.Feedback type="invalid">
                  Please fill in current password.
                </Form.Control.Feedback>
              )}
            </div>
          </Col>

          <Col sm={12} className="form-group mb-3">
            <label htmlFor="studyField" className="required">
              New Password
            </label>
            <div className="input-group mb-3">
              <input
                type={newPassword ? "text" : "password"}
                className={newPasswordClasses}
                onChange={newPasswordChangeHandler}
                onBlur={newPasswordBlurHandler}
                value={enteredNewPassword}
              />
              <span className="input-group-text" onClick={toggleNewPassword}>
                {newPassword === true ? <BsEyeFill /> : <BsEyeSlashFill />}
              </span>

              {newPasswordInputHasError && (
                <Form.Control.Feedback type="invalid">
                Must contain more than 8 characters which contain at
                          least one lowercase letter, one uppercase letter, one
                          numeric digit, and one special character.
                </Form.Control.Feedback>
              )}
            </div>
          </Col>

          <Col sm={12} className="form-group mb-3">
            <label htmlFor="studyField" className="required">
              Confirm Password
            </label>
            <div className="input-group mb-3">
              <input
                type={confirmPassword ? "text" : "password"}
                className={confirmPasswordClasses}
                onChange={confirmPasswordChangeHandler}
                onBlur={confirmPasswordBlurHandler}
                value={enteredConfirmPassword}
              />
              <span
                className="input-group-text"
                onClick={toggleConfirmPassword}
              >
                {confirmPassword === true ? <BsEyeFill /> : <BsEyeSlashFill />}
              </span>

              {confirmPasswordInputHasError && (
                <Form.Control.Feedback type="invalid">
                Must contain more than 8 characters which contain at
                          least one lowercase letter, one uppercase letter, one
                          numeric digit, and one special character.
                </Form.Control.Feedback>
              )}
            </div>
          </Col>

          <Col className="text-end">
            <button type="submit" className="btn btn-primary" disabled={!changePasswordIsValid}>
              Save
            </button>
          </Col>
        </Form>
      </Col>
    </div>
  );
}

export default Password;
