import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import useInput from "../../../Helpers/use-input";
import {
  BiMinusCircle,
  BiXCircle,
  BiMessageCheck,
  BiPlus
} from "react-icons/bi";

import { Col, Row, Form } from "react-bootstrap";
import Heading from "../../Heading";
import { toast } from "react-toastify";

const isNotEmpty = (value) => value.trim() !== "";

function Language() {

  const [languages, setLanguages] = useState([]);

  useEffect(() => {
      Axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/language/`,
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
          setLanguages(response.data);
        }
      });
  }, []);

    //Language Input
    const {
      value: enteredLanguage,
      isValid: enteredLanguageIsValid,
      hasError: languageInputHasError,
      valueChangeHandler: languageChangeHandler,
      inputBlurHandler: languageBlurHandler,
      reset: resetLanguageInput,
    } = useInput(isNotEmpty);
  
    let languageFormIsValid = false;
  
    if (enteredLanguageIsValid) {
      languageFormIsValid = true;
    }

    const languageFormSubmissionHandler = (event) => {
      event.preventDefault();
  
      if(!enteredLanguageIsValid) {
        return;
      } else {
        Axios.post(
          `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/newlanguage`,
          {
            newlanguage: enteredLanguage
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        ).then((response) => {
        const newlanguageData = response.data[1];
  
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
            setLanguages([
              {
              language: enteredLanguage,
              id: newlanguageData.insertId,
            },
            ...languages,
          ])
            ];
          }
        });
      }
      resetLanguageInput();
    };

    const languageClasses = languageInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const deleteLanguage = (languageID) => {
    Axios.delete(
      `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/language/` +
        languageID,
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
          setLanguages(
            languages.filter((languageDetails) => {
              /* eslint-disable-next-line */
              return languageDetails.id != languageID;
            })
          )
        ];
      }
    });
  };

  return (
    <Row className="mx-auto border rounded p-2 my-2">
      <Col sm={12}>
        <Row>
          <Col xs={10} sm={10} className="text-start">
            <Heading content="Language" design="h5" />
          </Col>
          <Col xs={2} sm={2} className="text-end align-self-center">
            <p role="button" className="my-auto">
            <BiPlus
                className="icon"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#addLanguage"
              />
            </p>
          </Col>
          <div
            className="modal fade"
            id="addLanguage"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className=" modal-header">
                  <Heading content="Add Language" design="h4 my-auto" />
                  <button
                    type="button"
                    id="closeButton"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <Form onSubmit={languageFormSubmissionHandler}>
                <div className="modal-body">
                
               
                  <Col sm={12} className="form-group mb-2">
                    <label htmlFor="role" className="required">
                      Language
                    </label>
                    <input
                      type="text"
                      placeholder="What language do you know?"
                      className={languageClasses}
                      onChange={languageChangeHandler}
                      onBlur={languageBlurHandler}
                      value={enteredLanguage}
                    />
                    {languageInputHasError && (
                      <Form.Control.Feedback type="invalid">
                        Please enter your language.
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
                    disabled={!languageFormIsValid}
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
          <div className="d-flex flex-wrap">
            {languages.map((languageDetails) => {
              const languageID = languageDetails.id;
              const language = languageDetails.language;

              return (
                <>
                  <p
                    key={languageID}
                    className="badge rounded-pill alert-primary fw-normal text-dark m-2 fs-7"
                  >
                    {language}{" "}
                    <BiXCircle
                      type="button"
                      data-bs-toggle="modal"
                    data-bs-target={`#createLanguageModal${languageID}`}
                    />
                  </p>

                  <div
                  className="modal fade"
                  id={`createLanguageModal${languageID}`}
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className=" modal-header">
                        <Heading content="Delete Language" design="h4 my-auto" />
                        <button
                          type="button"
                          id="closeButton"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p>Are you sure want to delete {language}?</p>
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
                          onClick={() => deleteLanguage(languageID)}
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
          </div>
        </Col>
      </Col>
    </Row>
  );
}

export default Language;
