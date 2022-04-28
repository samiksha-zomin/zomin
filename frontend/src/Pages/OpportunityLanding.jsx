import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Axios from "axios";

//Componenents
import Heading from "../Components/Heading";
import Footer from "../Components/Footer";
import ScrollToTop from "../Components/ScrollToTop";

import LandingTop from "../Components/Opportunity/LandingTop";
import LandingJD from "../Components/Opportunity/LandingJD";
import LandingCompany from "../Components/Opportunity/LandingCompany";
import ApplyJob from "../Components/Opportunity/ApplyJob";

import { Container, Row, Col } from "react-bootstrap";

import { toast } from "react-toastify";
import { BiError } from "react-icons/bi";

//Custom Style
import "../Styles/opportunity.css";

function OpportunityLanding() {
  const [opportunity, setOpportunity] = useState([]);
  const { company, jobtitle, oppoID } = useParams();
  const [applyJobModalShow, setApplyJobModalShow] = useState(false);
  const [applyJobStatus, setApplyJobStatus] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      Axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/opportunity/user/applystatus/` +
          oppoID,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((response) => {
        const applyStatus = response.data;
        if (applyStatus.length > 0) {
          setApplyJobStatus(true);
        }
      });
    }
  });

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/opportunity/list/` +
        company +
        "/" +
        jobtitle +
        "/" +
        oppoID
    ).then((response) => {
      if (response.data === "No Opportunities Found!") {
        return toast.error(
          <Fragment>
            <BiError />
            <span>System is Error. Please Try Again!</span>
          </Fragment>
        );
      }
      setOpportunity(response.data);
    });
  }, [company, jobtitle, oppoID]);

  return (
    <div>
      {opportunity.map((opportunityLDetails, key) => {
        const oppoID = opportunityLDetails.oppo_id;
        const job_type = opportunityLDetails.job_type;
        const job_title = opportunityLDetails.job_title;
        const company_name = opportunityLDetails.companyname;
        const job_location = opportunityLDetails.job_location;
        const salary_status = opportunityLDetails.salary_status;
        const salary = opportunityLDetails.salary;
        const test = opportunityLDetails.test;
        const nationality = opportunityLDetails.nationality;
        const year_exp = opportunityLDetails.year_exp;
        const fresh_graduate = opportunityLDetails.fresh_graduate;
        const education = opportunityLDetails.education;
        const field_study = opportunityLDetails.field_study;
        const iv_option = opportunityLDetails.iv_option;
        const job_desc = opportunityLDetails.job_desc;
        const partnerIndustry = opportunityLDetails.industry;
        const partnerLink =
          "/partner/" +
          opportunityLDetails.companyname
            .toLowerCase()
            .trim()
            .split(/\s+/)
            .join("-");
        const partnerLogo =
          `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/user/` +
          opportunityLDetails.company_logo;
        const partnerCoverPic =
          `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/user_cover/` +
          opportunityLDetails.company_team_pic;
        return (
          <div>
            <HelmetProvider>
              <Helmet>
                <title> {job_title} - Opportunity | Zom - IN </title>
              </Helmet>
            </HelmetProvider>

            <Container className="mt-2 mb-5">
              <Row>
                <Col xs={12} sm={12} md={9} lg={10}>
                  <LandingTop
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
                    nationality={nationality}
                    jobTest={test}
                    coverPic={partnerCoverPic}
                  />

                  <LandingJD
                    yearExp={year_exp}
                    freshGraduate={fresh_graduate}
                    education={education}
                    fieldStudy={field_study}
                    ivOption={iv_option}
                    jobDesc={job_desc}
                  />
                  <LandingCompany
                    compName={company_name}
                    compLink={partnerLink}
                    compIndustry={partnerIndustry}
                    cardImage={partnerLogo}
                  />

                  <div className="d-grid gap-2">
                    {applyJobStatus ? (
                      <button
                        className="btn btn-outline-primary"
                        href="/dashboard"
                      >
                        Applied!
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-success"
                          size="sm"
                          onClick={() => setApplyJobModalShow(true)}
                        >
                          Apply Now!
                        </button>
                        <ApplyJob
                          oppo_id={oppoID}
                          job_title={jobtitle}
                          show={applyJobModalShow}
                          onHide={() => setApplyJobModalShow(false)}
                        />
                      </>
                    )}
                  </div>
                </Col>
                <Col md={3} lg={2} className="d-none d-sm-block">
                  <Heading content="Featured Opportunities" design="h4 mb-4" />
                </Col>
              </Row>
            </Container>
          </div>
        );
      })}

      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default OpportunityLanding;
