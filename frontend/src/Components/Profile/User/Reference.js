import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import useInput from "../../../Helpers/use-input";
import {
  BiTrash,
  BiMinusCircle,
  BiUser,
  BiPhoneCall,
  BiEnvelope,
  BiMessageCheck,
  BiPlus,
} from "react-icons/bi";

import { Col, Row, Form } from "react-bootstrap";
import Heading from "../../Heading";
import { toast } from "react-toastify";

const isNotEmpty = (value) => value.trim() !== "";
const isNotEmail = (
  value //eslint-disable-next-line
) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
const isNotPhone = (value) => value.match(/^\d{10,12}$/);

function Reference() {

  const [reference, setReference] = useState([]);

  useEffect(() => {
      Axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/reference/`,
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
          setReference(response.data);
        }
      });
  }, []);

  //Name Input
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(isNotEmpty);

  //Position Input
  const {
    value: enteredPosition,
    isValid: enteredPositionIsValid,
    hasError: positionInputHasError,
    valueChangeHandler: positionChangeHandler,
    inputBlurHandler: positionBlurHandler,
    reset: resetPositionInput,
  } = useInput(isNotEmpty);

  //Email Input
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isNotEmail);

  //Contact Input
  const {
    value: enteredContact,
    isValid: enteredContactIsValid,
    hasError: contactInputHasError,
    valueChangeHandler: contactChangeHandler,
    inputBlurHandler: contactBlurHandler,
    reset: resetContactInput,
  } = useInput(isNotPhone);

  let referenceFormIsValid = false;

  if (
    enteredNameIsValid &&
    enteredPositionIsValid &&
    enteredEmailIsValid &&
    enteredContactIsValid
  ) {
    referenceFormIsValid = true;
  }

  const referenceFormSubmissionHandler = (event) => {
    event.preventDefault();

    if (
      !enteredNameIsValid &&
      !enteredPositionIsValid &&
      !enteredEmailIsValid &&
      !enteredContactIsValid
    ) {
      return;
    } else {
      Axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/newReference`,
        {
          name: enteredName,
          position: enteredPosition,
          email: enteredEmail,
          contact: enteredContact,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((response) => {
        const newReferenceData = response.data[1];

        if (response.data[0].error) {
          return toast.error(
            <Fragment>
              <BiMinusCircle /> <span>{response.data[0].error}</span>
            </Fragment>
          );
        } else {
          return [
            toast.success(
              <Fragment>
                <BiMessageCheck /> <span>{response.data[0].success}</span>
              </Fragment>
            ),
            setReference([
              {
                id: newReferenceData.insertId,
                name_refer: enteredName,
                role_refer: enteredPosition,
                contnum_refer: enteredContact,
                email_refer: enteredEmail,
              },
              ...reference,
            ]),
          ];
        }
      });
    }
    resetNameInput();
    resetPositionInput();
    resetEmailInput();
    resetContactInput();
  };

  const nameClasses = nameInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const positionClasses = positionInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const emailClasses = emailInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const contactClasses = contactInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  //DELETE
  const deleteReference = (referenceID) => {
    Axios.delete(
      `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/reference/` +
        referenceID,
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
        return [
          toast.success(
            <Fragment>
              <BiMessageCheck /> <span>{response.data.success}</span>
            </Fragment>
          ),
          setReference(
            reference.filter((referenceDetails) => {
              /* eslint-disable-next-line */
              return referenceDetails.id != referenceID;
            })
          ),
        ];
      }
    });
  };

  return (
    <Row className="mx-auto border rounded p-2 my-2">
      <Col sm={12}>
        <Row>
          <Col xs={10} sm={10} className="text-start">
            <Heading content="Reference" design="h5" />
          </Col>
          <Col xs={2} sm={2} className="text-end align-self-center">
            <p role="button" className="my-auto">
              <BiPlus
                className="icon"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#addReference"
              />
            </p>
          </Col>
          <div
            className="modal fade"
            id="addReference"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className=" modal-header">
                  <Heading content="Add Reference" design="h4 my-auto" />
                  <button
                    type="button"
                    id="closeButton"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <Form onSubmit={referenceFormSubmissionHandler}>
                  <div className="modal-body">
                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="name" className="required">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="What's your reference's name?"
                        className={nameClasses}
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHandler}
                        value={enteredName}
                      />
                      {nameInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please enter your reference's name.
                        </Form.Control.Feedback>
                      )}
                    </Col>

                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="position" className="required">
                        Position
                      </label>
                      <input
                        type="text"
                        placeholder="What's your reference's position?"
                        className={positionClasses}
                        onChange={positionChangeHandler}
                        onBlur={positionBlurHandler}
                        value={enteredPosition}
                      />
                      {positionInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please enter your reference's position.
                        </Form.Control.Feedback>
                      )}
                    </Col>

                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="email" className="required">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="What's your reference's email?"
                        className={emailClasses}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        value={enteredEmail}
                      />
                      {emailInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please enter your reference's email.
                        </Form.Control.Feedback>
                      )}
                    </Col>

                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="contact" className="required">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        placeholder="What's your reference's contact number?"
                        className={contactClasses}
                        onChange={contactChangeHandler}
                        onBlur={contactBlurHandler}
                        value={enteredContact}
                      />
                      {contactInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please enter your reference's contact number.
                        </Form.Control.Feedback>
                      )}
                    </Col>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      disabled={!referenceFormIsValid}
                    >
                      Save Changes
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Row>
      </Col>
      <Col sm={12}>
        <Col>
          {reference.map((referenceDetails) => {
            const referenceID = referenceDetails.id;
            const referenceName = referenceDetails.name_refer;
            const referenceRole = referenceDetails.role_refer;
            const referenceContact = referenceDetails.contnum_refer;
            const referenceEmail = referenceDetails.email_refer;

            return (
              <Row key={referenceID} className="mb-2">
                <Col lg={10} sm={10}>
                  <p className="m-0 fw-bold fs-7">{referenceName}</p>
                </Col>
                <Col lg={2} sm={2} className="text-end">
                  <BiTrash
                    className="icon"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target={`#createReferenceModal${referenceID}`}
                  />
                </Col>

                <div
                  className="modal fade"
                  id={`createReferenceModal${referenceID}`}
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className=" modal-header">
                        <Heading
                          content="Delete Reference"
                          design="h4 my-auto"
                        />
                        <button
                          type="button"
                          id="closeButton"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p>Are you sure want to delete?</p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => deleteReference(referenceID)}
                          data-bs-dismiss="modal"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <Col sm={12}>
                  <p className="m-0 text-secondary fs-7">
                    <BiUser className="icon" />
                    {referenceRole}
                  </p>
                </Col>
                <Col sm={12}>
                  <p className="m-0 text-secondary fs-7">
                    <BiPhoneCall className="icon" /> {referenceContact}
                  </p>
                </Col>
                <Col sm={12}>
                  <p className="m-0 text-secondary fs-7">
                    <BiEnvelope className="icon" /> {referenceEmail}
                  </p>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Col>
    </Row>
  );
}

export default Reference;
