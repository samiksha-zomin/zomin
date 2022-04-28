import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import Heading from "../Heading";

function ApplicationCard({ onClick, cddStatus, grabID, candidateID }) {
  const [showModal, setShowModal] = useState(false);
  const [statusCode, setStatusCode] = useState(cddStatus);

  const changingStatus = (e) => {
    setShowModal(true);
    setStatusCode(e.target.value);
  };

  const aboutClasses = "form-control form-control-sm";
  //  aboutInputHasError
  // ? "form-control form-control-sm is-invalid"
  // : "form-control form-control-sm";

  return (
    <div>
      <select
        className="form-select form-select-sm text-center"
        onChange={changingStatus}
        value={statusCode}
      >
        <option value="0">Pending</option>
        <option value="3">Shortlisted</option>
        <option value="2">Hired</option>
        <option value="1">Rejected</option>
      </select>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

{statusCode === "1" && (
    <>
    <Modal.Header closeButton>
              <Heading content="Reason for Rejection" design="h5" />
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Col sm={12} className="form-group mb-2">
                  <label htmlFor="inputabout" className="required">
                    Would appreciate if you could share some feedback about this
                    candidate
                  </label>

                  <Form.Control
                    as="textarea"
                    placeholder="Share some feedback here"
                    className={aboutClasses}
                    // onChange={aboutChangeHandler}
                    // onBlur={aboutBlurHandler}
                    // value={enteredAbout}
                  />
                  {/* {aboutInputHasError && (
                      <Form.Control.Feedback type="invalid">
                        Tell us about you.
                      </Form.Control.Feedback>
                    )} */}
                </Col>

                <Col sm={12} className="form-group mb-2">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label htmlFor="inputabout">Display to the candidate</label>
                </Col>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={() => onClick(statusCode, grabID)}
              >
                Reject this candidate
              </Button>
            </Modal.Footer>
    </>
)}




        {statusCode === "2" && (
          <>
            <Modal.Header closeButton>
              <Heading content="Hiring candidate" design="h5" />
            </Modal.Header>
            <Modal.Body>
              <p>
                Thanks for providing a career opportunity to this candidate!
              </p>
              <p>
                By clicking the Confirm button, a message will be sent to the
                candidate to notify on your hiring.
              </p>
              <p>
                We highly recommend you to contact the candidate within 3
                working days to proceed with your regular hiring process.
              </p>

              <p>
                Should you need any further assistance, please don't hesitate to
                contact us at{" "}
                <a href="admin@zom-in.com" className="text-decoration-none">
                  admin@zom-in.com
                </a>
                . Thanks!
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-success"
                onClick={() => onClick(statusCode, grabID)}
              >
                Confirm
              </Button>
            </Modal.Footer>
          </>
        )}

        {statusCode === "3" && (
          <>
            <Modal.Header closeButton>
              <Heading content="Shortlisting candidate" design="h5" />
            </Modal.Header>
            <Modal.Body>
              <p>
                Thanks for shortlisting this candidate!
              </p>

              <p>
                Should you need any further assistance, please don't hesitate to
                contact us at{" "}
                <a href="admin@zom-in.com" className="text-decoration-none">
                  admin@zom-in.com
                </a>
                . Thanks!
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-success"
                onClick={() => onClick(statusCode, grabID)}
              >
                Confirm
              </Button>
            </Modal.Footer>
          </>
        )}

        {statusCode === "0" && (
          <>
            <Modal.Header closeButton>
              <Heading content="Pending candidate" design="h5" />
            </Modal.Header>
            <Modal.Body>
              <p>
                Thanks for pending this candidate!
              </p>

              <p>
                Should you need any further assistance, please don't hesitate to
                contact us at{" "}
                <a href="admin@zom-in.com" className="text-decoration-none">
                  admin@zom-in.com
                </a>
                . Thanks!
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-success"
                onClick={() => onClick(statusCode, grabID)}
              >
                Confirm
              </Button>
            </Modal.Footer>
          </>
        )}

      </Modal>
    </div>
  );
}

export default ApplicationCard;
