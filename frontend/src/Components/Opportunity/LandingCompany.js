import React from 'react';

import { Row, Col, Image, Button } from 'react-bootstrap';

import Heading from '../Heading';


function LandingCompany(props) {
    return (
        <Col className="border my-4 px-3 py-2">
            <Heading content="About Company" design="h4 mb-2" />
            <Row className="align-items-center m-1">
                <Col xs={3} sm={12} md={2} lg={1} className="p-0 m-0 ">
                    <Image
                        className="p-0 m-0"
                        src={props.cardImage}
                        fluid
                    />
                </Col>
                <Col xs={9} sm={12} md={6} lg={7}>
                    <div>
                        <h5 className="text-wrap mb-0">{props.compName}</h5>
                        <span className="badge rounded-pill bg-info text-dark">{props.compIndustry}</span>
                        <p className="text-muted mb-0">19 Jobs</p>
                    </div>
                </Col>
                <Col sm={12} md={4} lg={4} className="text-end">
                    <Button href={props.compLink} variant="outline-info " size="sm">View More!</Button>
                </Col>
            </Row>
            <Row>
                <Col sm={12} className="p-2 m-2">
                    <p>As an adventurous person, Ezra Tan has involved in various industries including As an adventurous person, Ezra Tan has involved in various industries including As an adventurous person, Ezra Tan has involved in various industries including As an adventurous person, Ezra Tan has involved in various industries including As an adventurous person, Ezra Tan has involved in various industries including
                        As an adventurous person, Ezra Tan has involved in various industries including As an adventurous person, Ezra Tan has involved in various industries including As an adventurous person, Ezra Tan has involved in various industries including As an adventurous person, Ezra Tan has involved in various industries including As an adventurous person, Ezra Tan has involved in various industries including
                    </p>
                </Col>
                <Col xs={6} sm={4} className="p-2">
                    <h6>Working Hours</h6>
                    <p className="text-muted mb-0">Monday - Friday</p>
                    <p className="text-muted mb-0">9AM - 5PM</p>
                </Col>
                <Col xs={6} sm={4} className="p-2">
                    <h6>Dress Code</h6>
                    <p className="text-muted mb-0">Casual Wear</p>
                </Col>
                <Col xs={6} sm={4} className="p-2">
                    <h6>Spoken Language</h6>
                    <p className="text-muted mb-0">English</p>
                    <p className="text-muted mb-0">Malay</p>
                </Col>
                <Col xs={6} sm={4} className="p-2">
                    <h6>Company Size</h6>
                    <p className="text-muted mb-0">0 - 20</p>
                </Col>
            </Row>
        </Col>
    )
}

export default LandingCompany
