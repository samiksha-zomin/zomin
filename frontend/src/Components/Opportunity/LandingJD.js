import React from 'react';
import { Col } from 'react-bootstrap';

//ICON
import { FcReadingEbook } from "react-icons/fc";
import { GiBrain, GiVideoConference } from "react-icons/gi";
import { FaUniversity } from "react-icons/fa";

import Heading from '../Heading';

function LandingJD(props) {
    return (
        <Col className="border my-4 px-3 py-2">
            <Heading content="Job Details" design="h4 mb-4 m-0" />
            {props.yearExp > 0
                &&
                <p className="ps-3"><GiBrain /> {props.yearExp} years of experience</p>
            }

            {props.freshGraduate === 1
                &&
                <p className="ps-3">
                    <img
                        alt="zom-in-fresh-graduate-icon"
                        className="icon"
                        src="https://www.zom-in.com/images/icon/graduated.svg"
                    />
                    Open for Fresh Graduates
                </p>
            }

            {props.education
                &&
                <p className="ps-3"><FaUniversity /> {props.education}</p>
            }

            {props.fieldStudy
                &&
                <p className="ps-3"><FcReadingEbook /> {props.fieldStudy}</p>
            }

            {props.ivOption
                &&
                <p className="ps-3"><GiVideoConference /> {props.ivOption}</p>
            }

            <Heading content="Job Requirement / Responsibilities" design="h4 mb-4 m-0" />
            <div className="ps-3" dangerouslySetInnerHTML={{ __html: props.jobDesc }} />
        </Col>
    )
}

export default LandingJD;
