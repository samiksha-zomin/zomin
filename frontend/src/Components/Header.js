import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
// import routes from '../conf/routes';
import Logo from './Logo';
import '../Styles/header.css';

import { Navbar, Container, Nav, Button } from 'react-bootstrap';

function Header() {
    return (
        <BrowserRouter>
            <Navbar bg="white" sticky="top" className="border-bottom">
                <Container>
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <Fragment>
                            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                                <Logo />
                            </a>
                            <Nav defaultActiveKey="/home" as="ul" text="black">
                                <Nav.Item as="li" >
                                    <Nav.Link href="/home">Partners</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link href="/home">Opportunity</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link href="/home">What's Happening</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Fragment>

                    </div>
                    <div className="text-end">
                        <Button variant="outline-primary" href="/SignUp">Sign Up</Button>{' '}
                        <Button variant="outline-success" href="/employer" >For Employer</Button>
                    </div>
                </Container>
            </Navbar>
        </BrowserRouter>
    )
}

export default Header;
