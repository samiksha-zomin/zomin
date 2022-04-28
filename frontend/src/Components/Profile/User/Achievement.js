import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import useInput from "../../../Helpers/use-input";
import {
  BiPlus,
  BiMinusCircle,
  BiCalendar,
  BiTrash,
  BiMessageCheck,
} from "react-icons/bi";

import { Col, Row, Form } from "react-bootstrap";
import Heading from "../../Heading";
import { toast } from "react-toastify";

const isNotEmpty = (value) => value.trim() !== "";

function Achievement() {

  const [accomplishment, setAccomplishment] = useState([]);

  useEffect(() => {
      Axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/accomplishment/`,
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
          setAccomplishment(response.data);
        }
      });
  }, []);

  //ADD Accomplishment
  //Title Input
  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput(isNotEmpty);

  //Date Input
  const {
    value: enteredDate,
    isValid: enteredDateIsValid,
    hasError: dateInputHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDateInput,
  } = useInput(isNotEmpty);

  //Desc Input
  const {
    value: enteredDesc,
    isValid: enteredDescIsValid,
    hasError: descInputHasError,
    valueChangeHandler: descChangeHandler,
    inputBlurHandler: descBlurHandler,
    reset: resetDescInput,
  } = useInput(isNotEmpty);

  let accomplishmentFormIsValid = false;

  if (enteredTitleIsValid && enteredDateIsValid && enteredDescIsValid) {
    accomplishmentFormIsValid = true;
  }

  const accomplishmentFormSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredTitleIsValid && !enteredDateIsValid && !enteredDescIsValid) {
      return;
    } else {
      Axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/newAccomplishment`,
        {
          title: enteredTitle,
          date: enteredDate,
          desc: enteredDesc,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((response) => {
        const newAccomplishmentData = response.data[1];

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
            setAccomplishment([
              {
                id: newAccomplishmentData.insertId,
                accomplishment: enteredTitle,
                date_accomplishment: enteredDate,
                desc: enteredDesc,
              },
              ...accomplishment,
            ]),
          ];
        }
      });
    }
    resetTitleInput();
    resetDateInput();
    resetDescInput();
  };

  const titleClasses = titleInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const dateClasses = dateInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const descClasses = descInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  //DELETE Accomplishment
  const deleteAccomplishment = (accomplishmentID) => {
    Axios.delete(
      `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/accomplishment/` +
        accomplishmentID,
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
          setAccomplishment(
            accomplishment.filter((accomplishmentDetails) => {
              /* eslint-disable-next-line */
              return accomplishmentDetails.id != accomplishmentID;
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
            <Heading content="Awards and Achievements" design="h5" />
          </Col>
          <Col xs={2} sm={2} className="text-end align-self-center">
            <p role="button" className="my-auto">
              <BiPlus
                className="icon"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#addAccomplishment"
              />
            </p>
          </Col>
          <div
            className="modal fade"
            id="addAccomplishment"
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
                    content="Add Awards and Achievements"
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
                <Form onSubmit={accomplishmentFormSubmissionHandler}>
                  <div className="modal-body">
                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="role" className="required">
                        Title
                      </label>
                      <input
                        type="text"
                        placeholder="What's the title?"
                        className={titleClasses}
                        onChange={titleChangeHandler}
                        onBlur={titleBlurHandler}
                        value={enteredTitle}
                      />
                      {titleInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please enter the title.
                        </Form.Control.Feedback>
                      )}
                    </Col>

                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="date" className="required">
                        Date
                      </label>
                      <input
                        type="date"
                        placeholder="When did you received it??"
                        className={dateClasses}
                        onChange={dateChangeHandler}
                        onBlur={dateBlurHandler}
                        value={enteredDate}
                      />
                      {dateInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please enter the date.
                        </Form.Control.Feedback>
                      )}
                    </Col>

                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="desc" className="required">
                        Description
                      </label>
                      <Form.Control
                        as="textarea"
                        placeholder="Tell us more detail about it"
                        className={descClasses}
                        onChange={descChangeHandler}
                        onBlur={descBlurHandler}
                        value={enteredDesc}
                      />
                      {descInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Tell us more about it.
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
                      disabled={!accomplishmentFormIsValid}
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
          {accomplishment.map((accomplishmentDetails) => {
            const accomplishmentID = accomplishmentDetails.id;
            const title = accomplishmentDetails.accomplishment;
            const desc = accomplishmentDetails.desc;
            const date_accomplishment = new Date(
              accomplishmentDetails.date_accomplishment
            );
            const date = date_accomplishment
              .toLocaleDateString("en-GB", {
                month: "short",
                year: "numeric",
              })
              .replace(/ /g, " ");

            return (
              <>
                <div key={accomplishmentID} className="mb-2">
                  <Row>
                    <Col lg={10} sm={12}>
                      <p className="text-start m-0 fw-bold fs-6">{title}</p>
                    </Col>
                    <Col lg={2} sm={2} className="text-end">
                      <BiTrash
                        className="icon"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target={`#createAccomplishmentModal${accomplishmentID}`}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <p className="m-0 text-start fs-7">
                      <BiCalendar className="icon" /> {date}{" "}
                    </p>
                    <p className="m-0 text-start fs-7">{desc}</p>
                  </Row>
                </div>

                <div
                  className="modal fade"
                  id={`createAccomplishmentModal${accomplishmentID}`}
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
                          content="Delete Awards and Achievements"
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
                        <p>Are you sure want to delete {title}?</p>
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
                          onClick={() => deleteAccomplishment(accomplishmentID)}
                          data-bs-dismiss="modal"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </Col>
      </Col>
    </Row>
  );
}

export default Achievement;
