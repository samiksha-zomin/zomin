import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { BiInfoCircle } from "react-icons/bi";

import Heading from "../Components/Heading";

function ZomDashboard() {
  const [totalUser, setTotalUser] = useState("0");
  const [totalUnBlockUser, setTotalUnBlockUser] = useState("0");
  const [totalBlockUser, setTotalBlockUser] = useState("0");
  const [totalVerifiedUser, setTotalVerifiedUser] = useState("0");
  const [totalUnVerifiedUser, setTotalUnVerifiedUser] = useState("0");
  const [totalActiveUser, setTotalActiveUser] = useState("0");
  const [totalActiveBP, setTotalActiveBP] = useState("0");
  const [totalJobVacancy, setTotalJobVacancy] = useState("0");
  const [totalJobApplication, setTotalJobApplication] = useState("0");

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/zomAdminDashboard/totalList`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      setTotalUser(response.data[0][0].totalUser);
      setTotalUnBlockUser(response.data[1][0].totalUnBlockUser);
      setTotalBlockUser(response.data[2][0].totalBlockUser);
      setTotalVerifiedUser(response.data[3][0].totalVerifiedUser);
      setTotalUnVerifiedUser(response.data[4][0].totalUnverifiedUser);
      setTotalActiveUser(response.data[5][0].totalActiveUser);
      setTotalActiveBP(response.data[6][0].totalActiveBP);
      setTotalJobVacancy(response.data[7][0].totalJobVacancy);
      setTotalJobApplication(response.data[8][0].totalJobApplication);
    });
  }, []);


//   Month List
const [monthUser, setMonthUser] = useState("0");
const [monthUnBlockUser, setMonthUnBlockUser] = useState("0");
const [monthBlockUser, setMonthBlockUser] = useState("0");
const [monthVerifiedUser, setMonthVerifiedUser] = useState("0");
const [monthUnVerifiedUser, setMonthUnVerifiedUser] = useState("0");
const [monthActiveUser, setMonthActiveUser] = useState("0");
const [monthActiveBP, setMonthActiveBP] = useState("0");
const [monthJobVacancy, setMonthJobVacancy] = useState("0");
const [monthJobApplication, setMonthJobApplication] = useState("0");

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/zomAdminDashboard/monthList`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      setMonthUser(response.data[0][0].totalUser);
      setMonthUnBlockUser(response.data[1][0].totalUnBlockUser);
      setMonthBlockUser(response.data[2][0].totalBlockUser);
      setMonthVerifiedUser(response.data[3][0].totalVerifiedUser);
      setMonthUnVerifiedUser(response.data[4][0].totalUnverifiedUser);
      setMonthActiveUser(response.data[5][0].totalActiveUser);
      setMonthActiveBP(response.data[6][0].totalActiveBP);
      setMonthJobVacancy(response.data[7][0].totalJobVacancy);
      setMonthJobApplication(response.data[8][0].totalJobApplication);
    });
  }, []);


  //Today List
  const [todayUser, setTodayUser] = useState("0");
  const [todayUnBlockUser, setTodayUnBlockUser] = useState("0");
  const [todayBlockUser, setTodayBlockUser] = useState("0");
  const [todayVerifiedUser, setTodayVerifiedUser] = useState("0");
  const [todayUnVerifiedUser, setTodayUnVerifiedUser] = useState("0");
  const [todayActiveUser, setTodayActiveUser] = useState("0");
  const [todayActiveBP, setTodayActiveBP] = useState("0");
  const [todayJobVacancy, setTodayJobVacancy] = useState("0");
  const [todayJobApplication, setTodayJobApplication] = useState("0");

    useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/zomAdminDashboard/todayList`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      setTodayUser(response.data[0][0].totalUser);
      setTodayUnBlockUser(response.data[1][0].totalUnBlockUser);
      setTodayBlockUser(response.data[2][0].totalBlockUser);
      setTodayVerifiedUser(response.data[3][0].totalVerifiedUser);
      setTodayUnVerifiedUser(response.data[4][0].totalUnverifiedUser);
      setTodayActiveUser(response.data[5][0].totalActiveUser);
      setTodayActiveBP(response.data[6][0].totalActiveBP);
      setTodayJobVacancy(response.data[7][0].totalJobVacancy);
      setTodayJobApplication(response.data[8][0].totalJobApplication);
    });
  }, []);


    //OneDayBefore List
    const [oneDayBeforeUser, setOneDayBeforeUser] = useState("0");
    const [oneDayBeforeUnBlockUser, setOneDayBeforeUnBlockUser] = useState("0");
    const [oneDayBeforeBlockUser, setOneDayBeforeBlockUser] = useState("0");
    const [oneDayBeforeVerifiedUser, setOneDayBeforeVerifiedUser] = useState("0");
    const [oneDayBeforeUnVerifiedUser, setOneDayBeforeUnVerifiedUser] = useState("0");
    const [oneDayBeforeActiveUser, setOneDayBeforeActiveUser] = useState("0");
    const [oneDayBeforeActiveBP, setOneDayBeforeActiveBP] = useState("0");
    const [oneDayBeforeJobVacancy, setOneDayBeforeJobVacancy] = useState("0");
    const [oneDayBeforeJobApplication, setOneDayBeforeJobApplication] = useState("0");
    
      useEffect(() => {
      Axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/zomAdminDashboard/oneDayBeforeList`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((response) => {
        setOneDayBeforeUser(response.data[0][0].totalUser);
        setOneDayBeforeUnBlockUser(response.data[1][0].totalUnBlockUser);
        setOneDayBeforeBlockUser(response.data[2][0].totalBlockUser);
        setOneDayBeforeVerifiedUser(response.data[3][0].totalVerifiedUser);
        setOneDayBeforeUnVerifiedUser(response.data[4][0].totalUnverifiedUser);
        setOneDayBeforeActiveUser(response.data[5][0].totalActiveUser);
        setOneDayBeforeActiveBP(response.data[6][0].totalActiveBP);
        setOneDayBeforeJobVacancy(response.data[7][0].totalJobVacancy);
        setOneDayBeforeJobApplication(response.data[8][0].totalJobApplication);
      });
    }, []);

        //TwoDayBefore List
        const [twoDayBeforeUser, setTwoDayBeforeUser] = useState("0");
        const [twoDayBeforeUnBlockUser, setTwoDayBeforeUnBlockUser] = useState("0");
        const [twoDayBeforeBlockUser, setTwoDayBeforeBlockUser] = useState("0");
        const [twoDayBeforeVerifiedUser, setTwoDayBeforeVerifiedUser] = useState("0");
        const [twoDayBeforeUnVerifiedUser, setTwoDayBeforeUnVerifiedUser] = useState("0");
        const [twoDayBeforeActiveUser, setTwoDayBeforeActiveUser] = useState("0");
        const [twoDayBeforeActiveBP, setTwoDayBeforeActiveBP] = useState("0");
        const [twoDayBeforeJobVacancy, setTwoDayBeforeJobVacancy] = useState("0");
        const [twoDayBeforeJobApplication, setTwoDayBeforeJobApplication] = useState("0");
        
          useEffect(() => {
          Axios.get(
            `${process.env.REACT_APP_SERVER_DOMAIN}/zomAdminDashboard/oneDayBeforeList`,
            {
              headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
            }
          ).then((response) => {
            setTwoDayBeforeUser(response.data[0][0].totalUser);
            setTwoDayBeforeUnBlockUser(response.data[1][0].totalUnBlockUser);
            setTwoDayBeforeBlockUser(response.data[2][0].totalBlockUser);
            setTwoDayBeforeVerifiedUser(response.data[3][0].totalVerifiedUser);
            setTwoDayBeforeUnVerifiedUser(response.data[4][0].totalUnverifiedUser);
            setTwoDayBeforeActiveUser(response.data[5][0].totalActiveUser);
            setTwoDayBeforeActiveBP(response.data[6][0].totalActiveBP);
            setTwoDayBeforeJobVacancy(response.data[7][0].totalJobVacancy);
            setTwoDayBeforeJobApplication(response.data[8][0].totalJobApplication);
          });
        }, []);
    

  //Get Month
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  let todayMonth = month[date.getMonth()];

  let todayDate = date
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, " ");

  const oneDayBefore = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  const twoDayBefore = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 2);

  let oneDayBeforeDate = oneDayBefore
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, " ");

  let twoDayBeforeDate = twoDayBefore
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, " ");

  return (
    <>
      {/* Grand Report */}
      <Row className="mx-2 p-3">
        <Heading content="Grand Report" design="h3 text-start" />
        <Row className="text-center d-flex mb-3 mx-3 flex-nowrap overflow-auto">
          <Col sm={2} className="mx-1">
            <div class="card text-white bg-primary bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">Number of Sign Up</Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={totalUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-secondary bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Sign Up with block
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={totalBlockUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Blocked User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-secondary bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Sign Up with unblock
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={totalUnBlockUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Unblocked User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-danger bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of unVerified Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={totalUnVerifiedUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading
                    content="Total UnVerified User"
                    design="text-white"
                  />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-danger bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Verified Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={totalVerifiedUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Verified User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-info bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Active User Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={totalActiveUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Active User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-info bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Active BP Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={totalActiveBP} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Active BP" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-success bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">Number of Vacancy</Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={totalJobVacancy} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Job Vacancy" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-warning bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">Number of Application</Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={totalJobApplication} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading
                    content="Total Job Application"
                    design="text-white"
                  />
                </h5>
              </div>
            </div>
          </Col>
        </Row>
      </Row>

      {/* Current Month Data */}
      <Row className="mx-2 p-3">
        <Heading content={`${todayMonth} Report`} design="h3 text-start" />
        <Row className="text-center d-flex mb-3 mx-3 flex-nowrap overflow-auto">
          <Col sm={2} className="mx-1">
            <div class="card text-white bg-primary bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">Number of Sign Up</Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={monthUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-secondary bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Sign Up with block
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={monthBlockUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Blocked User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-secondary bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Sign Up with unblock
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={monthUnBlockUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Unblocked User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-danger bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of unVerified Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={monthUnVerifiedUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading
                    content="Total UnVerified User"
                    design="text-white"
                  />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-danger bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Verified Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={monthVerifiedUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Verified User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-info bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Active User Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={monthActiveUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Active User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-info bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Active BP Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={monthActiveBP} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Active BP" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-success bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">Number of Vacancy</Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={monthJobVacancy} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Job Vacancy" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-warning bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">Number of Application</Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={monthJobApplication} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading
                    content="Total Job Application"
                    design="text-white"
                  />
                </h5>
              </div>
            </div>
          </Col>
        </Row>
      </Row>

      {/* Current Date Data */}
      <Row className="mx-2 p-3">
        <Heading content={`${todayDate} Report`} design="h3 text-start" />
        <Row className="text-center d-flex mb-3 mx-3 flex-nowrap overflow-auto">
          <Col sm={2} className="mx-1">
            <div class="card text-white bg-primary bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">Number of Sign Up</Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={todayUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-secondary bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Sign Up with block
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={todayBlockUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Blocked User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-secondary bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Sign Up with unblock
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={todayUnBlockUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Unblocked User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-danger bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of unVerified Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={todayUnVerifiedUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading
                    content="Total UnVerified User"
                    design="text-white"
                  />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-danger bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Verified Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={todayVerifiedUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Verified User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-info bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Active User Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={todayActiveUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Active User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-info bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Active BP Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={todayActiveBP} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Active BP" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-success bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">Number of Vacancy</Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={todayJobVacancy} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Job Vacancy" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-warning bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">Number of Application</Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={todayJobApplication} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading
                    content="Total Job Application"
                    design="text-white"
                  />
                </h5>
              </div>
            </div>
          </Col>
        </Row>
      </Row>

      {/* One Day Before Data */}
      <Row className="mx-2 p-3">
        <Heading content={`${oneDayBeforeDate} Report`} design="h3 text-start" />
        <Row className="text-center d-flex mb-3 mx-3 flex-nowrap overflow-auto">
          <Col sm={2} className="mx-1">
            <div class="card text-white bg-primary bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">Number of Sign Up</Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={oneDayBeforeUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-secondary bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Sign Up with block
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={oneDayBeforeBlockUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Blocked User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-secondary bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Sign Up with unblock
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={oneDayBeforeUnBlockUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Unblocked User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-danger bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of unVerified Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={oneDayBeforeUnVerifiedUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading
                    content="Total UnVerified User"
                    design="text-white"
                  />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-danger bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Verified Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={oneDayBeforeVerifiedUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Verified User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-info bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Active User Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={oneDayBeforeActiveUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Active User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-info bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Active BP Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={oneDayBeforeActiveBP} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Active BP" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-success bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">Number of Vacancy</Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={oneDayBeforeJobVacancy} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Job Vacancy" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-warning bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">Number of Application</Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={oneDayBeforeJobApplication} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading
                    content="Total Job Application"
                    design="text-white"
                  />
                </h5>
              </div>
            </div>
          </Col>
        </Row>
      </Row>

      {/* Two Day Before Data */}
      <Row className="mx-2 p-3">
        <Heading content={`${twoDayBeforeDate} Report`} design="h3 text-start" />
        <Row className="text-center d-flex mb-3 mx-3 flex-nowrap overflow-auto">
          <Col sm={2} className="mx-1">
            <div class="card text-white bg-primary bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">Number of Sign Up</Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={twoDayBeforeUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-secondary bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Sign Up with block
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={twoDayBeforeBlockUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Blocked User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-secondary bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Sign Up with unblock
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={twoDayBeforeUnBlockUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Unblocked User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-danger bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of unVerified Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={twoDayBeforeUnVerifiedUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading
                    content="Total UnVerified User"
                    design="text-white"
                  />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-danger bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Verified Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={twoDayBeforeVerifiedUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Verified User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-info bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Active User Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={twoDayBeforeActiveUser} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Active User" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-info bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Number of Active BP Account
                      </Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={twoDayBeforeActiveBP} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Active BP" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-success bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">Number of Vacancy</Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={twoDayBeforeJobVacancy} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading content="Total Job Vacancy" design="text-white" />
                </h5>
              </div>
            </div>
          </Col>

          <Col sm={2} className="mx-1">
            <div class="card text-white bg-warning bg-gradient mb-3">
              <div class="position-relative">
                <div class="position-absolute top-0 end-0">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">Number of Application</Tooltip>
                    }
                  >
                    <Button variant="link">
                      <BiInfoCircle className="text-light" size={21} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="card-body">
                <Heading content={twoDayBeforeJobApplication} design="h3 text-white" />
                <h5 class="card-title">
                  <Heading
                    content="Total Job Application"
                    design="text-white"
                  />
                </h5>
              </div>
            </div>
          </Col>
        </Row>
      </Row>
    </>
  );
}

export default ZomDashboard;
