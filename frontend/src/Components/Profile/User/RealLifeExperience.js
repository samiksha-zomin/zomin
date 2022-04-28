import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import useInput from "../../../Helpers/use-input";
import {
  BiMinusCircle,
  BiCalendar,
  BiTrash,
  BiMessageCheck,
  BiPlus,
} from "react-icons/bi";

import { Col, Row, Form } from "react-bootstrap";
import Heading from "../../Heading";
import { toast } from "react-toastify";

const isNotEmpty = (value) => value.trim() !== "";

function RealLifeExperience() {

  const [realLifeExp, setRealLifeExp] = useState([]);

  useEffect(() => {
      Axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/realLifeExp/`,
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
          setRealLifeExp(response.data);
        }
      });
  }, []);

  //ADD Accomplishment
  //company Name Input
  const {
    value: enteredCompanyName,
    isValid: enteredCompanyNameIsValid,
    hasError: companyNameInputHasError,
    valueChangeHandler: companyNameChangeHandler,
    inputBlurHandler: companyNameBlurHandler,
    reset: resetCompanyNameInput,
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

  let realLifeFormIsValid = false;

  if (enteredCompanyNameIsValid && enteredDateIsValid && enteredDescIsValid) {
    realLifeFormIsValid = true;
  }

  const realLifeFormSubmissionHandler = (event) => {
    event.preventDefault();

    if (
      !enteredCompanyNameIsValid &&
      !enteredDateIsValid &&
      !enteredDescIsValid
    ) {
      return;
    } else {
      Axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/newRealLife`,
        {
          companyName: enteredCompanyName,
          date: enteredDate,
          desc: enteredDesc,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((response) => {
        const newRealLifeData = response.data[1];

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
            setRealLifeExp([
              {
                id: newRealLifeData.insertId,
                rle_comp_name: enteredCompanyName,
                rle_date: enteredDate,
                rle_desc: enteredDesc,
              },
              ...realLifeExp,
            ]),
          ];
        }
      });
    }
    resetCompanyNameInput();
    resetDateInput();
    resetDescInput();
  };

  const companyNameClasses = companyNameInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const dateClasses = dateInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const descClasses = descInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  // DELETE

  const deleteRealLife = (realLifeID) => {
    Axios.delete(
      `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/realLifeExp/` +
        realLifeID,
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
          setRealLifeExp(
            realLifeExp.filter((realLifeExpDetails) => {
              /* eslint-disable-next-line */
              return realLifeExpDetails.id != realLifeID;
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
            <Heading content="Real Life Experience" design="h5" />
          </Col>
          <Col xs={2} sm={2} className="text-end align-self-center">
            <p role="button" className="my-auto">
              <BiPlus
                className="icon"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#addRealLife"
              />
            </p>
          </Col>

          <div
            className="modal fade"
            id="addRealLife"
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
                    content="Add Real Life Experience"
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
                <Form onSubmit={realLifeFormSubmissionHandler}>
                  <div className="modal-body">
                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="companyName" className="required">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="What's the company Name?"
                        className={companyNameClasses}
                        onChange={companyNameChangeHandler}
                        onBlur={companyNameBlurHandler}
                        value={enteredCompanyName}
                      />
                      {companyNameInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please enter the company name.
                        </Form.Control.Feedback>
                      )}
                    </Col>

                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="date" className="required">
                        Date
                      </label>
                      <input
                        type="date"
                        placeholder="When did you attend?"
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
                      disabled={!realLifeFormIsValid}
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
          {realLifeExp.map((realLifeExpDetails) => {
            const realLifeID = realLifeExpDetails.id;
            const realLifeCompName = realLifeExpDetails.rle_comp_name;
            const realLifeDesc = realLifeExpDetails.rle_desc;
            const rleDate = new Date(realLifeExpDetails.rle_date);
            const realLifeDate = rleDate
              .toLocaleDateString("en-GB", {
                month: "short",
                year: "numeric",
              })
              .replace(/ /g, " ");

            return (
              <div key={realLifeID} className="mb-2">
                <Row>
                  <Col lg={10} sm={10}>
                    <p className="text-start m-0 fw-bold fs-6 text-capitalize">
                      {realLifeCompName}
                    </p>
                  </Col>
                  <Col lg={2} sm={2} className="text-end">
                    <BiTrash
                      className="icon"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#createRealLifeModal${realLifeID}`}
                    />
                  </Col>
                  <div
                    className="modal fade"
                    id={`createRealLifeModal${realLifeID}`}
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
                            content="Delete Real Life Experience"
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
                            onClick={() => deleteRealLife(realLifeID)}
                            data-bs-dismiss="modal"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Row>
                <Row>
                  <p className="m-0 text-start fs-7">
                    <BiCalendar className="icon" />
                    {realLifeDate}
                  </p>
                  <p className="m-0 text-start fs-7">{realLifeDesc}</p>
                </Row>
              </div>
            );
          })}
        </Col>
      </Col>
    </Row>
  );
}

export default RealLifeExperience;
