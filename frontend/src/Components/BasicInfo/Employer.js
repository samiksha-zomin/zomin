import React, { Fragment, useEffect, useState, useContext } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

//SESSION and INPUT
import { AuthContext } from "../../Helpers/AuthContext";
import useInput from "../../Helpers/use-input";

import { Container, Row, Col, Form } from "react-bootstrap";
import { BiMessageCheck, BiMinusCircle } from "react-icons/bi";

//Toast
import { toast } from "react-toastify";

//Components
import Heading from "../Heading";

const isNotEmpty = (value) => value.trim() !== "";

function Employer() {
  const { authState, setAuthState } = useContext(AuthContext);
  const userID = authState.id;
  const navigate = useNavigate();

  const [hearlist, setHearList] = useState([]);
  const [location, setlocation] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/meta/hearZomIN`).then(
      (response) => {
        setHearList(response.data);
      }
    );
  }, []);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/meta/stateLocation`).then(
      (response) => {
        setlocation(response.data);
      }
    );
  }, []);

  //Role Input
  const {
    value: enteredRole,
    isValid: enteredRoleIsValid,
    hasError: roleInputHasError,
    valueChangeHandler: roleChangeHandler,
    inputBlurHandler: roleBlurHandler,
    reset: resetRoleInput,
  } = useInput(isNotEmpty);

  //Logo Input

  const [postImage, setPostImage] = useState();
  const [postImageName, setPostImageName] = useState("");
  const [imageLength, setImageLength] = useState(false);

  const imageChange = (event) => {
    let imageFile = event.target.files[0];

    if (event.target.files && event.target.files.length > 0) {
      setPostImage(imageFile);
      setPostImageName(imageFile.name);
      setImageLength(true);
    }

    if (imageFile.size > 5e6) {
      setPostImage();
      setImageLength(false);
      return toast.warn(
        <Fragment>
          <span>Please upload a file smaller than 5 MB</span>
        </Fragment>
      );
    }

    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setPostImage();
      setImageLength(false);
      return toast.warn(
        <Fragment>
          <span>
            Invalid File Upload. Please Try to Upload file with jpg, jpeg, png
            or gif
          </span>
        </Fragment>
      );
    }
  };

  //Location Input
  const {
    value: enteredLocation,
    isValid: enteredLocationIsValid,
    hasError: locationInputHasError,
    valueChangeHandler: locationChangeHandler,
    inputBlurHandler: locationBlurHandler,
    reset: resetLocationInput,
  } = useInput(isNotEmpty);

  //RegNum Input
  const {
    value: enteredRegNum,
    isValid: enteredRegNumIsValid,
    hasError: regNumInputHasError,
    valueChangeHandler: regNumChangeHandler,
    inputBlurHandler: regNumBlurHandler,
    reset: resetRegNumInput,
  } = useInput(isNotEmpty);

  //About Input Check
  const {
    value: enteredAbout,
    isValid: enteredAboutIsValid,
    hasError: aboutInputHasError,
    valueChangeHandler: aboutChangeHandler,
    inputBlurHandler: aboutBlurHandler,
    reset: resetAboutInput,
  } = useInput(isNotEmpty);

  //Hear Input
  const {
    value: enteredHearList,
    isValid: enteredHearListIsValid,
    hasError: hearInputHasError,
    valueChangeHandler: hearChangeHandler,
    inputBlurHandler: hearBlurHandler,
    reset: resetHearInput,
  } = useInput(isNotEmpty);

  //Become our BP Input
  const [accepttoBP, setAccepttoBP] = useState(false);
  const [otherinterest, setOtherinterest] = useState("");

  let employerBasicInfoFormIsValid = false;
  let becomePartnerBasicInfoFormIsValid = false;

  if (
    enteredRoleIsValid &&
    imageLength &&
    enteredLocationIsValid &&
    enteredRegNumIsValid &&
    enteredAboutIsValid &&
    enteredHearListIsValid
  ) {
    employerBasicInfoFormIsValid = true;
    if (accepttoBP) {
      becomePartnerBasicInfoFormIsValid = true;
      employerBasicInfoFormIsValid= false;
    }
  }

  const employerBasicInfoFormSubmissionHandler = (event) => {
    event.preventDefault();

    if (
      !enteredRoleIsValid &&
      !enteredLocationIsValid &&
      !enteredRegNumIsValid &&
      !enteredAboutIsValid &&
      !enteredHearListIsValid
    ) {
      return;
    } else {
      const checkedInterest = Array.from(event.target.interest).map(el => 
        [
        el.id,
        el.checked
      ]);


    const formData = new FormData();
    formData.append("file", postImage);
    formData.append("fileName", postImageName);
    formData.append("role", enteredRole);
    formData.append("location", enteredLocation);
    formData.append("regNum", enteredRegNum);
    formData.append("about", enteredAbout);
    formData.append("hearZomIN", enteredHearList);
    formData.append("acceptToBP", accepttoBP);
    formData.append("interest", checkedInterest);
    formData.append("userID", userID);

    Axios.post(
      `${process.env.REACT_APP_SERVER_DOMAIN}/basicinfo/employer`,
      formData
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
    });

    }
    resetRoleInput();
    resetLocationInput();
    resetRegNumInput();
    resetAboutInput();
    resetHearInput();
    setOtherinterest("");
    navigate("/");
  };

  const roleClasses = roleInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const locationClasses = locationInputHasError
    ? "form-select form-select-sm is-invalid"
    : "form-select form-select-sm";

  const regNumClasses = regNumInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const aboutClasses = aboutInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const hearClasses = hearInputHasError
    ? "form-select form-select-sm is-invalid"
    : "form-select form-select-sm";

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Fragment>
        <HelmetProvider>
          <Helmet>
            <title> Basic Info | Zom - IN </title>
          </Helmet>
        </HelmetProvider>
        <div id="basicInfo" className="basicInfo">
          <Container className="my-5">
            <Row>
              <Col sm={6} xs={12} className="mx-auto">
                <Heading content="Employer Info" design="h4 mb-4" />
                <Form onSubmit={employerBasicInfoFormSubmissionHandler}>
                  <Col sm={12} className="form-group mb-2">
                    <label htmlFor="role" className="required">
                      Role
                    </label>
                    <input
                      type="text"
                      placeholder="What's your role in your company?"
                      className={roleClasses}
                      onChange={roleChangeHandler}
                      onBlur={roleBlurHandler}
                      value={enteredRole}
                    />
                    {roleInputHasError && (
                      <Form.Control.Feedback type="invalid">
                        Please enter your role.
                      </Form.Control.Feedback>
                    )}
                  </Col>
                  <Col sm={12} className="form-group mb-2">
                    <label htmlFor="inputabout" className="required">
                      Logo
                    </label>
                    <input
                      type="file"
                      required
                      accept="image/*"
                      className={roleClasses}
                      onChange={imageChange}
                    />
                  </Col>
                  <Col sm={12} className="form-group mb-2">
                    <label htmlFor="location" className="required">
                      Location
                    </label>
                    <select
                      defaultValue={""}
                      aria-label="Location"
                      className={locationClasses}
                      onChange={locationChangeHandler}
                      onBlur={locationBlurHandler}
                    >
                      <option value="">Where is your Company located?</option>
                      {location.map((location) => {
                        const enteredLocation = location.child_name;
                        const enteredLocationID = location.child_id;
                        return (
                          <option key={enteredLocationID} value={enteredLocation}>
                            {enteredLocation}
                          </option>
                        );
                      })}
                    </select>
                    {locationInputHasError && (
                      <Form.Control.Feedback type="invalid">
                        Please choose your company location.
                      </Form.Control.Feedback>
                    )}
                  </Col>
                  <Col sm={12} className="form-group mb-3">
                    <label htmlFor="companyRegNum" className="required">
                      Company Registration Number
                    </label>
                    <input
                      type="text"
                      placeholder="What is your company's registration number?"
                      className={regNumClasses}
                      onChange={regNumChangeHandler}
                      onBlur={regNumBlurHandler}
                      value={enteredRegNum}
                    />
                    {regNumInputHasError && (
                      <Form.Control.Feedback type="invalid">
                        Please enter your Company Registration Number.
                      </Form.Control.Feedback>
                    )}
                  </Col>
                  <Col sm={12} className="form-group mb-2">
                    <label htmlFor="inputabout" className="required">
                      About
                    </label>
                    <Form.Control
                      as="textarea"
                      placeholder="Tell us about your Company"
                      className={aboutClasses}
                      onChange={aboutChangeHandler}
                      onBlur={aboutBlurHandler}
                      value={enteredAbout}
                    />
                    {aboutInputHasError && (
                      <Form.Control.Feedback type="invalid">
                        Tell us about your company.
                      </Form.Control.Feedback>
                    )}
                  </Col>
                  <hr className="my-4" />

                  <Col sm={12} className="form-group mb-2">
                    <label htmlFor="hearZomIN" className="required">
                      Hear about Zom-IN
                    </label>
                    <select
                      defaultValue={""}
                      aria-label="hearZomIN"
                      className={hearClasses}
                      onChange={hearChangeHandler}
                      onBlur={hearBlurHandler}
                    >
                      <option value="">How did you hear about Zom-IN?</option>
                      {hearlist.map((hearlist, key) => {
                        const enteredHearList = hearlist.child_name;
                        return (
                          <option 
                          key={enteredHearList} 
                          value={enteredHearList}
                          >
                            {enteredHearList}
                          </option>
                        );
                      })}
                    </select>
                    {hearInputHasError && (
                      <Form.Control.Feedback type="invalid">
                        Please choose your one.
                      </Form.Control.Feedback>
                    )}
                  </Col>
                  <Col sm={12} className="form-group mb-2">
                    <label htmlFor="eduLevel" className="required">
                      Why you are interest in Zom-IN?
                    </label>

                    {["I want to meet more young talents", "I want to empower & influence youths", "I want to increase brand awareness among millennials"].map(i => (

                      <div key={i} className="form-check ms-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={i}
                        id={i}
                        name="interest"
                      />
                      <label
                        className="form-check-label"
                        htmlFor={i}
                      >
                        {i}
                      </label>
                    </div>

                    ))}
                    <div className="form-check ms-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={otherinterest}
                        id={otherinterest}
                        name="interest"
                        defaultChecked= {otherinterest !== ''}
                      />
                      <label
                        className="form-check-label col col-sm-12"
                        htmlFor={otherinterest}
                      >
                        <input 
                        className="form-control form-control-sm"
                        type="text"  
                        placeholder="Others"
                        name={otherinterest}
                        onChange={(e) => setOtherinterest(e.target.value)}
                          value={otherinterest} />
                      </label>
                    </div>
                  
                  </Col>
                  <Col sm={12} className="form-group mb-2">
                    <label htmlFor="eduLevel">Become Our Partner?</label>
                    <div className="form-check ms-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        defaultChecked={accepttoBP}
                        onChange={() => setAccepttoBP(!accepttoBP)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        I accept the{" "}
                        <a
                          href="/termofbusiness"
                          target="_blank"
                          className="text-decoration-none"
                        >
                          Terms of Business{" "}
                        </a>
                      </label>
                    </div>
                  </Col>
                  <Col className="text-center my-3">
                    <button
                      type="submit"
                      value="dad"
                      name="buu"
                      className=" btn btn-primary mx-1"
                      disabled={!employerBasicInfoFormIsValid}
                    >
                      Submit
                    </button>
                    <button
                      type="submit"
                      value="mom"
                      name="buu"
                      className=" btn btn-success mx-1"
                      disabled={!becomePartnerBasicInfoFormIsValid}
                    >
                      Submit and I want to be a Partner!
                    </button>
                  </Col>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </Fragment>
    </AuthContext.Provider>
  );
}

export default Employer;
