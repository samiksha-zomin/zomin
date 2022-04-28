import React from 'react';
// , { Fragment}
// import { BrowserRouter } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
// import routes from '../conf/routes';
import Logo from './Logo';
import '../Styles/footer.css';

import { Container, Row, Col, Image, Nav } from 'react-bootstrap';
import { ImFacebook, ImInstagram, ImLinkedin, ImYoutube } from "react-icons/im";


//Icon
import { BiCopyright } from "react-icons/bi";


function Footer() {
    return (
        <div >
            <hr />
            <Container className="footerDiv" >
                <Row >
                    <Col xs={12} md={5} lg={5} className="footerImg">
                        <Row >
                            <Col xs={2} md={2} lg={2} >
                                <Image src="https://www.zom-in.com/images/img/location.svg" fluid  className="w-75"/>
                            </Col>
                            <Col xs={10} md={10} lg={10}>
                                <p>
                                    B 06 20, Empire Subang SOHO, Jalan SS16/1, 47500 Subang Jaya, Selangor
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2} md={2} lg={2}>
                                <Image src="https://www.zom-in.com/images/img/contact.svg" fluid className="w-75" />
                            </Col>
                            <Col xs={10} md={10} lg={10}>
                                <p>
                                    +603-5611 8732

                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2} md={2} lg={2}>
                                <Image src="https://www.zom-in.com/images/img/email.svg" fluid  className="w-75"/>
                            </Col>
                            <Col xs={10} md={10} lg={10}>
                                <p>
                                    admin@zom-in.com
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={2} lg={2}>
                        <Nav defaultActiveKey="/home" className="flex-column text-center">
                            <Nav.Link href="/aboutus">About</Nav.Link>
                            <Nav.Link eventKey="/faq">FaQs</Nav.Link>
                            <Nav.Link href="/contact">Contact Us</Nav.Link>
                            <Nav.Link eventKey="link-2">Spice IN</Nav.Link>
                            <Nav.Link href="/termofuse" eventKey="termofuse">Term of Use</Nav.Link>
                            <Nav.Link href="/privacypolicy" eventKey="privacypolicy">Privacy Policy</Nav.Link>
                        </Nav>
                    </Col>
                    <Col xs={12} md={5} lg={5} className="zomInDetails">
                        <Logo />
                        <p className="fs-6">An online platform created for young minds and successful entrepreneurs to empower and inspire one another</p>
                        <p><BiCopyright /> zom-in.com. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
            <hr />

            <div className="zomINSocialLink">
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs md="auto">
                            <ImFacebook />
                        </Col>
                        <Col xs md="auto">
                            <ImInstagram />
                        </Col>
                        <Col xs md="auto">
                            <ImLinkedin />
                        </Col>
                        <Col xs md="auto">
                            <ImYoutube />
                        </Col>
                    </Row>
                </Container>
            </div>
            
        </div>
    )
}

export default Footer;
