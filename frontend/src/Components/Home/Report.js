import React, { Fragment, useState } from "react";
import Axios from "axios";


import { BsFlag } from "react-icons/bs";
import { BiMessageCheck, BiMinusCircle } from "react-icons/bi";
import { Form, Modal, Button } from "react-bootstrap";

import Heading from "../Heading";
//Toast
import { toast } from "react-toastify";


function Report(props) {
  const postID = props.postID;
  const userID = props.userID;
  const postOwnerID = props.postOwnerID;

  const [show, setShow] = useState(false);

  const handleCloseReport = () => setShow(false);
  const handleShowReport = () => setShow(true);

  const [reportInput, setReportInput] = useState("");

  let reportFormIsValid = false;

  if (reportInput !== "") {
    reportFormIsValid = true;
  }

  const reportFormSubmissionHandler = (event) => {
    event.preventDefault();

    if (reportInput === "") {
      return;
    } else {
      Axios.post(
          `${process.env.REACT_APP_SERVER_DOMAIN}/home/report`,
          {
              userID: userID,
              postID: postID,
              postOwnerID: postOwnerID,
              reportInput: reportInput,
          }
      ).then ((response) => {
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
            )
          }
      });
    }
    setShow(false);
    setReportInput("");
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-link dropdown-item"
        onClick={handleShowReport}
      >
        <BsFlag className="icon" /> Report
      </button>

      <Modal
        show={show}
        onHide={handleCloseReport}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Heading content="Report" design="h5" />
        </Modal.Header>
        <Form onSubmit={reportFormSubmissionHandler}>
          <Modal.Body>
            <p className=" fw-bold">Why are you reporting this?</p>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="reportPost"
                id="reportPost1"
                value="Suspicious, spam or fake"
                onChange={(e) => {
                  setReportInput(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="reportPost1">
                Suspicious, spam or fake
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="reportPost"
                id="reportPost2"
                value="Harassment or hateful speech"
                onChange={(e) => {
                  setReportInput(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="reportPost2">
                Harassment or hateful speech
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="reportPost"
                id="reportPost3"
                value="Violence or physical harm"
                onChange={(e) => {
                  setReportInput(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="reportPost3">
                Violence or physical harm
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="reportPost"
                id="reportPost4"
                value="Adult Content"
                onChange={(e) => {
                  setReportInput(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="reportPost4">
                Adult Content
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="reportPost"
                id="reportPost5"
                value="Intellectual property infringement or defamation"
                onChange={(e) => {
                  setReportInput(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="reportPost5">
                Intellectual property infringement or defamation
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="danger"
              disabled={!reportFormIsValid}
            >
              Report
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Report;