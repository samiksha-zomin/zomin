import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

import {
  BiPhoneCall,
  BiEnvelope,
  BiBriefcase,
  BiUser,
  BiBookReader,
  BiBuilding,
  BiMinusCircle,
} from "react-icons/bi";
import { FaUniversity } from "react-icons/fa";

import Heading from "../Components/Heading";
import Name from '../Components/Name';
import Email from "../Components/Email";
import Contact from "../Components/Contact";

import Logo from "../Assests/Images/logo/logo.png";

function Resume() {

  const [about, setAbout] = useState([]);
  const [education, setEducation] = useState([]);
  const [workingExperience, setWorkingExperience] = useState([]);
  const [realLifeExp, setRealLifeExp] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [accomplishment, setAccomplishment] = useState([]);
  const [reference, setReference] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const { token } = useParams();

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/resume/` + token
    ).then(
      (response) => {
        if (response.data.error) {
            return toast.error(
              <Fragment>
                <BiMinusCircle /> <span>{response.data.error}</span>
              </Fragment>
            );
          } else {
        setAbout(response.data.[0]);
        setEducation(response.data.[1]);
        setWorkingExperience(response.data.[2]);
        setRealLifeExp(response.data.[3]);
        setPortfolio(response.data.[4]);
        setAccomplishment(response.data.[5]);
        setReference(response.data.[6]);
        setSkills(response.data.[7]);
        setLanguages(response.data.[8]);
          }

      }
    );
  }, [token]);

  return (
    <div className="resume mb-5" id="resume">
      <HelmetProvider>
        <Helmet>
          <title> Resume | Zom - IN </title>
        </Helmet>
      </HelmetProvider>
      <Container className="px-5">
        <Row className="justify-content-center  text-center">
          <Col sm={12} md={10} lg={8}>
            <img src={Logo} alt="" className="img-fluid w-25" />
          </Col>
        </Row>

        <Row className="border-bottom">
          <Col>
            <Heading
              content={<Name id={token} />}
              design="h4 p-0 mx-0 mb-2 fw-bold text-lg-start text-md-start text-center"
            />
          </Col>
          
            {about.map((aboutDetails, key) => {
                const aboutUser = aboutDetails.about_user;
                
                return (
                    <p className="fs-7 text-justify">
                    {aboutUser}
                    </p>
                )
            })}
          
        </Row>

        <Row className="border-bottom">
          <Col
            sm={12}
            md={6}
            lg={6}
            className="text-center text-md-end text-lg-end"
          >
            <p className="my-1">
              <BiPhoneCall className="icon" /> <Contact id={token} />
            </p>
          </Col>
          <Col
            sm={12}
            md={6}
            lg={6}
            className="text-center text-md-start text-lg-start"
          >
            <p className="my-1">
              <BiEnvelope className="icon" /> <Email id={token} />
            </p>
          </Col>
        </Row>

        <Row className="d-flex">
          <Col className=" py-lg-3 py-md-3 py-0 order-lg-1 order-md-1 order-2">
            {/* Work Experience */}
            {workingExperience.length > 0 && 
            <div className="mb-3">
              <Heading content="WORK EXPERIENCE" design="h6 fw-bold" />

              {workingExperience.map((workingExperienceDetails, key) => {
                  const jobType = workingExperienceDetails.employ_status;
                  const currentPosition = workingExperienceDetails.cur_position;
                  const compName = workingExperienceDetails.comp_name_user;
                  const industry = workingExperienceDetails.industry;
                  const experience = workingExperienceDetails.work_exp;
                  const startDate = new Date(workingExperienceDetails.start_date);
                  const endDate = new Date(workingExperienceDetails.end_date);
                  const startYear = startDate.toLocaleDateString("en-GB", {
                      month: "short",
                      year: "numeric"
                      }).replace(/ /g, " ");

                      const endYear = endDate.toLocaleDateString("en-GB", {
                      month: "short",
                      year: "numeric"
                      }).replace(/ /g, " ");

                  return (
                    <>
                        <Row>
                            <Col lg={8} sm={12}>
                                <p className="text-start m-0 fw-bold fs-6 text-capitalize">{currentPosition}</p>
                            </Col>
                            <Col lg={4}>
                                <p className="text-lg-end text-start m-0 text-secondary fs-7">
                                {startYear} - {endYear}
                                </p>
                            </Col>
                        </Row>

                        <Row>
                            <p className="m-0 text-start fs-7 text-capitalize">
                            <BiBriefcase className="icon" />
                            {jobType}
                            </p>
                            <p className="m-0 text-start fs-7 text-capitalize">
                            <BiBuilding className="icon"/>  {compName} ({industry})
                            </p>
                            <p className="px-auto px-md-1 px-lg-4 fs-7 text-justify">
                            {ReactHtmlParser(experience)}
                            </p>
                        </Row>
                    </>

                  )
              })}
              
            </div>

        }

            {/* REAL LIFE EXPERIENCE */}
            {realLifeExp.length > 0 && 
            <div className="mb-3">
              <Heading
                content="REAL LIFE EXPERIENCE BY ZOM-IN"
                design="h6 fw-bold"
              />
              {realLifeExp.map((realLifeExpDetails, key) => {
                  const realLifeCompName = realLifeExpDetails.rle_comp_name;
                  const realLifeDesc = realLifeExpDetails.rle_desc;
                  const rleDate = new Date(realLifeExpDetails.rle_date);
                  const realLifeDate = rleDate.toLocaleDateString("en-GB", {
                      month: "short",
                      year: "numeric"
                      }).replace(/ /g, " ");

                  return (
<>
<Row>
                <Col lg={8} sm={12}>
                  <p className="text-start m-0 fw-bold fs-6 text-capitalize">{realLifeCompName}</p>
                </Col>
                <Col lg={4}>
                  <p className="text-lg-end text-start m-0 text-secondary fs-7">
                {realLifeDate}
                  </p>
                </Col>
              </Row>
              <Row>
                <p className="fs-7">
                  {realLifeDesc}
                </p>
              </Row>
              </>
                  )
              })}
              
            </div>

        }

            {/* REFERENCES */}
            {reference.length > 0 && 
            <div className="mb-3">
              <Heading content="REFERENCES" design="h6 fw-bold" />
              {reference.map((referenceDetails, key) => {
                  const referenceName = referenceDetails.name_refer;
                  const referenceRole = referenceDetails.role_refer;
                  const referenceContact = referenceDetails.contnum_refer;
                  const referenceEmail = referenceDetails.email_refer;

                  return (
                    <Row className="mb-2">
                <Col sm={12}>
                  <p className="m-0 fw-bold fs-7">{referenceName}</p>
                </Col>
                <Col sm={12}>
                  <p className="m-0 text-secondary fs-7">
                    <BiUser className="icon" />
                    {referenceRole}
                  </p>
                </Col>
                <Col sm={12}>
                  <p className="m-0 text-secondary fs-7">
                    <BiPhoneCall className="icon" /> {referenceContact}
                  </p>
                </Col>
                <Col sm={12}>
                  <p className="m-0 text-secondary fs-7">
                    <BiEnvelope className="icon" /> {referenceEmail}
                  </p>
                </Col>
              </Row>
                  )
              })}

             
            </div>
            }
          </Col>

          
          <Col className="divider py-lg-3 py-md-3 py-0 order-lg-2 order-md-2 order-1">
            {/* EDUCATION */}
            {education.length > 0 && 
            <div className="mb-3">
            
              <Heading content="EDUCATION" design="h6 fw-bold" />
            
            {education.map((educationDetails, key) => {
                const school = educationDetails.school;
                const higherLevel = educationDetails.higher_stud;
                const studyField = educationDetails.study_field;
                const grade = educationDetails.grade;
                const gradYearFrom = educationDetails.grad_year_from;
                const gradYearTo = educationDetails.grad_year_to;

                return (
                    <div className="mb-2">
                    <Row>
                <Col lg={8} sm={12}>
                  <p className="text-start m-0 fw-bold fs-6">
                    {higherLevel} 
                    {studyField !== null && <> in {studyField}</> }
                  </p>
                </Col>
                <Col lg={4}>
                  <p className="text-lg-end text-start m-0 text-secondary fs-7">
                  {gradYearFrom} - {gradYearTo}
                  </p>
                </Col>
              </Row>
              <Row>
                <p className="m-0 text-start fs-7">
                  <FaUniversity className="icon" />
                  {school}
                </p>
                {grade !== null &&
                <p className="m-0 text-start fs-7">
                  <BiBookReader className="icon" />
                  {grade}
                </p>
                }
              </Row>
              </div>

                )
            })}
              
            </div>
            }

            {/* SKILLS */}
            {skills.length > 0 &&
            <div className="mb-3">
              <Heading content="SKILLS" design="h6 fw-bold" />
              <div className="d-flex flex-wrap">
              {skills.map((skillsDetails, key) => {
                  const skill = skillsDetails.skill;

                  return (
                    <p className="badge rounded-pill alert-primary fw-normal text-dark m-2 fs-7">
                  {skill}
                </p>
                  )
              })}
              </div>
            </div>
            }

            {/* LANGUAGES */}
            {languages.length > 0 &&
            <div className="mb-3">
              <Heading content="LANGUAGES" design="h6 fw-bold" />
              <div className="d-flex flex-wrap">
              {languages.map((languagesDetails, key) => {
                  const language = languagesDetails.language;

                  return (
                    <p className="badge rounded-pill alert-primary fw-normal text-dark m-2 fs-7">
                  {language}
                </p>
                  )
              })}
              </div>
            </div>
            }

            {/* PORTFOLIO / PROJECTS */}
            {portfolio.length > 0 && 
            <div className="mb-3">
              <Heading content="PORTFOLIO / PROJECTS" design="h6 fw-bold" />
              {portfolio.map((portfolioDetails, key) => {
                  const portfolioName = portfolioDetails.name_portfolio;
                  const portfolioSummary = portfolioDetails.summary_portfolio;
                  const portfolioLink = portfolioDetails.link_portfolio;
                  const portfolio_date = new Date(portfolioDetails.date_portfolio);

                  const portfolioDate = portfolio_date.toLocaleDateString("en-GB", {
                      month: "short",
                      year: "numeric"
                      }).replace(/ /g, " ");

                  return (
                      <div className="mb-2">
                      <Row>
                <Col lg={8} sm={12}>
                  <p className="text-start m-0 fw-bold fs-6 text-capitalize">{portfolioName}</p>
                </Col>
                <Col lg={4}>
                  <p className="text-lg-end text-start m-0 text-secondary fs-7">
                    {portfolioDate}
                  </p>
                </Col>
              </Row>
              <Row>
                <p className="m-0 text-start fs-7">
                  {portfolioSummary}
                </p>
                <p className="m-0 text-start fs-7">
                  <a className="text-decoration-none" rel="noreferrer" target="_blank" href={portfolioLink}>
                    Project Link{" "}
                  </a>
                </p>
              </Row>
              </div>
                  )
              })}
              
            </div>
            }

            {/* AWARDS AND ACHIEVEMENTS */}
            {accomplishment.length > 0 && 
            <div className="mb-3">
              <Heading content="AWARDS AND ACHIEVEMENTS" design="h6 fw-bold" />
              {accomplishment.map((accomplishmentDetails, key) => {
                  const title = accomplishmentDetails.accomplishment;
                  const desc = accomplishmentDetails.desc;
                  const date_accomplishment = new Date(accomplishmentDetails.date_accomplishment);
                  const date = date_accomplishment.toLocaleDateString("en-GB", {
                      month: "short",
                      year: "numeric"
                      }).replace(/ /g, " ");

                  return (
                      <div className="mb-2">
                      <Row>
                <Col lg={8} sm={12}>
                  <p className="text-start m-0 fw-bold fs-6">{title}</p>
                </Col>
                <Col lg={4}>
                  <p className="text-lg-end text-start m-0 text-secondary fs-7">
                    {date}
                  </p>
                </Col>
              </Row>
              <Row>
                <p className="m-0 text-start fs-7">
                  {desc}
                </p>
              </Row>
              </div>

                  )
              })}
              
            </div>
            }
          </Col>
        </Row>

        <Row className="justify-content-center  text-center my-4">
          <Col sm={12} md={10} lg={8}>
            Brought to you by:
          </Col>
          <Col sm={12} md={10} lg={8}>
            <img src={Logo} alt="" className="img-fluid w-25" />
          </Col>
          <Col sm={12} md={10} lg={8}>
            For more information, please visit www.zom-in.com
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Resume;
