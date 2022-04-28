import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";

import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";
import OpportunityLongCard from "./OpportunityLongCard";
import Heading from "../Heading";
import FullTime from "./FullTime";
import Contract from "./Contract";
import PartTime from "./PartTime";

import updateResume from "../../Assests/Images/banner/SideBar/updateResume.jpeg";
import Internship from "./Internship";
function Employer() {
  const [opportunityList, setOpportunityList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [show, setShow] = useState(false);
  const [currentJobType, setCurrentJobType] = useState("Full Time");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocationTerm, setSearchLocationTerm] = useState("");
  const [searchEducationTerm, setSearchEducationTerm] = useState("");
  const [searchJobTypeTerm, setSearchJobTypeTerm] = useState("");

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/opportunity/employerlist`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      setOpportunityList(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/meta/stateLocation`).then(
      (response) => {
        setStateList(response.data);
      }
    );
  }, []);

  const onClickJobType = (currentJobType) => {
    setCurrentJobType(currentJobType);

    let jobTypeBG;
    switch (currentJobType) {
      case "Contract":
        jobTypeBG = "bg-contract";
        break;
      case "Internship":
        jobTypeBG = "bg-internship";
        break;
      case "Part Time":
        jobTypeBG = "bg-partTime";
        break;
      default:
        jobTypeBG = "bg-fullTime";
    }
  };

  return (
    <>
      <Container fluid className="h-100 searchbox">
        <Row className="py-3 px-5">
          <div className="input-group ">
            <input
              type="text"
              className="form-control"
              placeholder="Keywords (Marketing, Internship, ...)"
              aria-label="Keywords"
              aria-describedby="button-addon2"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
            <button
              className="btn btn-outline-primary"
              type="button"
              id="button-addon2"
            >
              <BiSearchAlt /> Search
            </button>
          </div>
          <div className="d-flex flex-wrap align-items-center  align-content-center  filterbox">
            <div>
              <select
                defaultValue={"DEFAULT"}
                className="form-select form-select-sm"
                aria-label="Default select example"
                onChange={(event) => {
                  setSearchLocationTerm(event.target.value);
                }}
              >
                <option value=""> Location </option>
                {stateList.map((stateList, key) => {
                  const childName = stateList.child_name;
                  return <option value={childName}> {childName} </option>;
                })}
              </select>
            </div>
            <div>
              <select
                defaultValue={"DEFAULT"}
                className="form-select form-select-sm"
                aria-label="Default select example"
                onChange={(event) => {
                  setSearchEducationTerm(event.target.value);
                }}
              >
                <option value=""> Education </option>
                <option value="Bachelor's Degree"> Bachelor's Degree </option>
                <option value="Diploma"> Diploma </option>
                <option value="Sabah"> Sabah </option>
              </select>
            </div>

            <div>
              <select
                defaultValue={"DEFAULT"}
                className="form-select form-select-sm"
                aria-label="Default select example"
                onChange={(event) => {
                  setSearchJobTypeTerm(event.target.value);
                }}
              >
                <option value=""> Job Type </option>
                <option value="Full Time"> Full Time </option>
                <option value="Internship"> Internship </option>
                <option value="Contract"> Contract </option>
                <option value="Part Time">Part Time</option>
              </select>
            </div>
            {/* <div>
                            <select defaultValue={'DEFAULT'}
                                className="form-select form-select-sm"
                                aria-label="Default select example"
                                onChange={(event) => {
                                    setSearchSalaryTerm(event.target.value);
                            }} >
                                <option value=""> Salary Range </option>
                                <option value="RM 2001 and RM 3000" > RM 2001 and RM 3000 </option>
                                <option value="Selangor" > Selangor </option>
                                <option value="Sabah" > Sabah </option>
                            </select>
                        </div> */}
            {/* <div className="form-check form-switch me-1">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                                value="1" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault"> <img
                                alt="zom-in-fresh-graduate-icon"
                                className="icon"
                                src="https://www.zom-in.com/images/icon/graduated.svg"
                            /> Fresh Graduates</label>
                        </div> */}
            {/* <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault"> <img
                                alt="zom-in-fresh-graduate-icon"
                                className="icon"
                                src="https://www.zom-in.com/images/icon/opportunity.svg"
                            /> New Job Posted</label>
                        </div> */}
          </div>
        </Row>
      </Container>

      <Container className="py-3 px-3">
        <Row>
          <Col xs={12} sm={12} md={12} lg={10}>
            <Row>
              <div className="text-end align-items-center">
                <Button variant="primary" onClick={() => setShow(true)}>
                  Add Job Posting
                </Button>

                <Modal
                  show={show}
                  onHide={() => setShow(false)}
                  scrollable
                  size="md"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <Heading content="Create Job" />
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row className="text-center">
                      <Col
                        role="button"
                        className={`${
                          currentJobType === "Full Time" && "bg-fullTime"
                        } rounded m-1 p-1`}
                        onClick={(e) => onClickJobType("Full Time")}
                      >
                        Full Time
                      </Col>
                      <Col
                        role="button"
                        className={`${
                          currentJobType === "Internship" && "bg-internship"
                        } rounded m-1 p-1`}
                        onClick={(e) => onClickJobType("Internship")}
                      >
                        Internship
                      </Col>
                      <Col
                        role="button"
                        className={`${
                          currentJobType === "Contract" && "bg-contract"
                        } rounded m-1 p-1`}
                        onClick={(e) => onClickJobType("Contract")}
                      >
                        Contract
                      </Col>
                      <Col
                        role="button"
                        className={`${
                          currentJobType === "Part Time" && "bg-partTime"
                        } rounded m-1 p-1`}
                        onClick={(e) => onClickJobType("Part Time")}
                      >
                        Part Time
                      </Col>
                    </Row>

                    {currentJobType === "Full Time" && (
                      <FullTime  show={show} setShow={setShow} />
                    )}

                    {currentJobType === "Internship" && (
                      <Internship />
                    )}

                    {currentJobType === "Contract" && (
                      <Contract />
                    )}

                    {currentJobType === "Part Time" && (
                      <PartTime />
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={() => setShow(false)}>
                      Create Job
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </Row>
            <Row xs={1} sm={1} md={2} lg={2} className="g-1 py-1 px-1 mt-4">
              {opportunityList
                .filter((opportunityDetails) => {
                  if (searchTerm === "") {
                    return opportunityDetails;
                  } else if (
                    opportunityDetails.job_title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    opportunityDetails.job_type
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    opportunityDetails.company_name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    opportunityDetails.job_location
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return opportunityDetails;
                  }
                  return false;
                })

                .filter((opportunityDetails) => {
                  if (searchLocationTerm === "") {
                    return opportunityDetails;
                  } else if (
                    opportunityDetails.job_location
                      .toLowerCase()
                      .includes(searchLocationTerm.toLowerCase())
                  ) {
                    return opportunityDetails;
                  }
                  return false;
                })

                .filter((opportunityDetails) => {
                  if (searchEducationTerm === "") {
                    return opportunityDetails;
                  } else if (
                    opportunityDetails.education
                      .toLowerCase()
                      .includes(searchEducationTerm.toLowerCase())
                  ) {
                    return opportunityDetails;
                  }
                  return false;
                })

                .filter((opportunityDetails) => {
                  if (searchJobTypeTerm === "") {
                    return opportunityDetails;
                  } else if (
                    opportunityDetails.job_type
                      .toLowerCase()
                      .includes(searchJobTypeTerm.toLowerCase())
                  ) {
                    return opportunityDetails;
                  }
                  return false;
                })

                .map((opportunityDetails, key) => {
                  const oppoID = opportunityDetails.oppo_id;
                  const job_type = opportunityDetails.job_type;
                  const job_title = opportunityDetails.job_title;
                  const company_name = opportunityDetails.companyname;
                  const job_location = opportunityDetails.job_location;
                  const salary_status = opportunityDetails.salary_status;
                  const salary = opportunityDetails.salary;
                  const test = opportunityDetails.test;
                  const nationality = opportunityDetails.nationality;
                  const year_exp = opportunityDetails.year_exp;
                  const fresh_graduate = opportunityDetails.fresh_graduate;
                  const education = opportunityDetails.education;
                  const field_study = opportunityDetails.field_study;
                  const iv_option = opportunityDetails.iv_option;
                  const job_desc = opportunityDetails.job_desc;
                  const partnerLink =
                    "/partner/" +
                    opportunityDetails.companyname
                      .toLowerCase()
                      .trim()
                      .split(/\s+/)
                      .join("-");
                  const partnerLogo =
                    "https://www.zom-in.com/images/profileimg/" +
                    opportunityDetails.company_logo;

                  return (
                    <OpportunityLongCard
                      key={oppoID}
                      oppoID={oppoID}
                      cardImage={partnerLogo}
                      jobType={job_type}
                      jobTitle={job_title}
                      jobLocation={job_location}
                      compName={company_name}
                      compLink={partnerLink}
                      salary={salary}
                      salaryStatus={salary_status}
                      jobTest={test}
                      nationality={nationality}
                      yearExp={year_exp}
                      freshGraduate={fresh_graduate}
                      education={education}
                      fieldStudy={field_study}
                      ivOption={iv_option}
                      jobDesc={job_desc}
                    />
                  );
                })}
            </Row>
          </Col>
          <Col xs={12} sm={12} md={12} lg={2} className="sidebarHeader">
            <img src={updateResume} alt="" className="w-100" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Employer;
