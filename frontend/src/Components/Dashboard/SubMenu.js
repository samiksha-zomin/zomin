import React from 'react';
import { Col } from "react-bootstrap";

import { BiChevronRight } from "react-icons/bi";


function SubMenu(props) {
    return (
        <>
           <Col
                    xs={10}
                    sm={10}
                    className="align-self-center fw-bold my-3"
                  >
                    {props.content}
                  </Col>
                  <Col xs={2} sm={2} className="align-self-center">
                    <BiChevronRight className="text-end d-block" />
                  </Col> 
        </>
    )
}

export default SubMenu
