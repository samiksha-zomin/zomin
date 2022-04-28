import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import useInput from "../../../Helpers/use-input";
import {
  BiMinusCircle,
  BiCalendar,
  BiTrash,
  BiPlus,
  BiMessageCheck,
} from "react-icons/bi";

import { Col, Row, Form } from "react-bootstrap";
import Heading from "../../Heading";
import { toast } from "react-toastify";

const isNotEmpty = (value) => value.trim() !== "";

function Portfolio() {

  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
      Axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/portfolio/`,
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
          setPortfolio(response.data);
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

  const [link, setLink] = useState("");

  let portfolioFormIsValid = false;

  if (enteredTitleIsValid && enteredDateIsValid && enteredDescIsValid) {
    portfolioFormIsValid = true;
  }

  const portfolioFormSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredTitleIsValid && !enteredDateIsValid && !enteredDescIsValid) {
      return;
    } else {
      Axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/newPortfolio`,
        {
          title: enteredTitle,
          date: enteredDate,
          desc: enteredDesc,
          link: link,
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
            setPortfolio([
              {
                id: newAccomplishmentData.insertId,
                name_portfolio: enteredTitle,
                date_portfolio: enteredDate,
                summary_portfolio: enteredDesc,
                link_portfolio: link,
              },
              ...portfolio,
            ]),
          ];
        }
      });
    }
    resetTitleInput();
    resetDateInput();
    resetDescInput();
    setLink("");
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

  //DELETE

  const deletePortfolio = (portfolioID) => {
    Axios.delete(
      `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/portfolio/` +
        portfolioID,
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
          setPortfolio(
            portfolio.filter((portfolioDetails) => {
              /* eslint-disable-next-line */
              return portfolioDetails.id != portfolioID;
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
            <Heading content="Portfolio and Projects" design="h5" />
          </Col>
          <Col xs={2} sm={2} className="text-end align-self-center">
            <p role="button" className="my-auto">
              <BiPlus
                className="icon"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#addPortfolio"
              />
            </p>
          </Col>

          <div
            className="modal fade"
            id="addPortfolio"
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
                    content="Add Portfolio and Project"
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
                <Form onSubmit={portfolioFormSubmissionHandler}>
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

                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="link">Link</label>
                      <input
                        type="text"
                        placeholder="What's the link for this project/portfolio?"
                        className="form-control form-control-sm"
                        onChange={(e) => setLink(e.target.value)}
                        value={link}
                      />
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
                      disabled={!portfolioFormIsValid}
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
          {portfolio.map((portfolioDetails) => {
            const portfolioID = portfolioDetails.id;
            const portfolioName = portfolioDetails.name_portfolio;
            const portfolioSummary = portfolioDetails.summary_portfolio;
            const portfolioLink = portfolioDetails.link_portfolio;
            const portfolio_date = new Date(portfolioDetails.date_portfolio);

            const portfolioDate = portfolio_date
              .toLocaleDateString("en-GB", {
                month: "short",
                year: "numeric",
              })
              .replace(/ /g, " ");

            return (
              <div key={portfolioID} className="mb-2">
                <Row>
                  <Col lg={10} sm={10}>
                    <p className="text-start m-0 fw-bold fs-6 text-capitalize">
                      {portfolioName}
                    </p>
                  </Col>
                  <Col lg={2} sm={2} className="text-end">
                    <BiTrash
                      className="icon"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#createPortfolioModal${portfolioID}`}
                    />
                  </Col>

                  <div
                    className="modal fade"
                    id={`createPortfolioModal${portfolioID}`}
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
                            content="Delete Portfolio and Projects"
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
                          <p>Are you sure want to delete {portfolioName}?</p>
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
                            onClick={() => deletePortfolio(portfolioID)}
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
                    <BiCalendar className="icon" /> {portfolioDate}
                  </p>
                  <p className="m-0 text-start fs-7">{portfolioSummary}</p>
                  <p className="m-0 text-start fs-7">
                    <a
                      className="text-decoration-none"
                      target="_blank"
                      rel="noreferrer"
                      href={portfolioLink}
                    >
                      Project Link{" "}
                    </a>
                  </p>
                </Row>
              </div>
            );
          })}
        </Col>
      </Col>
    </Row>
  );
}

export default Portfolio;
