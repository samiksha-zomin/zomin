import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

//Image
import ImgError404 from '../Components/ImgError404';

//Custom Style
import '../Styles/notFound.css';

function NotFound() {

        return (
        <div className="bg">
        
            <Container className="text-center" >
                <Row>
                    <Col className="centerDiv">
                    <ImgError404 />

                        <h5>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</h5>
                        <Button  href="/" variant="outline-primary" >Return to Homepage</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default NotFound;