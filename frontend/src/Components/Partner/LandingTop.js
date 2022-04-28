import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

//Icon
import { BiMapAlt } from "react-icons/bi";

function LandingTop(props) {
    return (
        <div>
        <Row>
            <Col sm={12}>
                <Image className="partnerCoverImg" src={props.partnerCoverPic} fluid />
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={2} lg={2} className=" position-relative partnerCoverLogo">
                <Image
                    className="bg-white position-absolute top-100 start-0 "
                    src={props.partnerLogo}
                    fluid
                />
            </Col>
        </Row>
        <Row className="partnerTopContent">
            <Col sm={12} md={2} lg={2} />
            <Col sm={12} md={6} lg={6}>
                <h4 className="text-wrap">{props.partnerName}</h4>
                <span className="badge rounded-pill bg-info text-dark">{props.partnerIndustry}</span>
            </Col>
            <Col sm={12} md={4} lg={4} className="text-center">
                <p className="fs-6 "><BiMapAlt />{props.partnerLocation}, Malaysia</p>
            </Col>
        </Row>
        </div>
    )
}

export default LandingTop;
