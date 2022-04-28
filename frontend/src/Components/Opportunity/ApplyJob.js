import React, { Fragment, useContext } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Helpers/AuthContext";

import { Modal, Button } from "react-bootstrap";
import { BiMessageCheck, BiMinusCircle } from "react-icons/bi";

//Toast
import { toast } from "react-toastify";

import Heading from "../Heading";

function ApplyJob(props) {

const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);

  const oppoID = props.oppo_id;
  const jobTitle = props.job_title;


  const applyJob = (id) => {
    let applyJobInfo = [id];

    if (!localStorage.getItem("accessToken")) {
      return [
        navigate("/signup"),
        toast.warn(
          <Fragment>
            <BiMinusCircle />
            <span>Please Sign In /Sign Up before applying for a job</span>
          </Fragment>
        ),
      ];
    } else {
      Axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/opportunity/user/`,
        {
          oppoID: applyJobInfo[0],
        },
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
          return toast.success(
            <Fragment>
              <BiMessageCheck /> <span>{response.data.success}</span>
            </Fragment>
          );
        }
  /* eslint-disable-next-line */
        document.getElementsByClassName("btn-close").click();
      });
    }
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Heading content={`Applying for ${jobTitle}`} design="h5" />
        </Modal.Header>
        <Modal.Body>
          <p>Is your resume complete?</p>
          {authState.status && (
            <p>
              If Yes, please click "Apply" and if No, then click "Go to Profile"
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {authState.status && (
            <Button variant="outline-success" href="/profile">
              Go to Profile
            </Button>
          )}
          <Button onClick={() => applyJob(oppoID)}>Apply</Button>
        </Modal.Footer>
      </Modal>
    </AuthContext.Provider>
  );
}

export default ApplyJob;
