import React from "react";
import { Row, Col } from "react-bootstrap";

import PicOne from "../../Assests/Images/aboutUs/team1.jpg";
import PicTwo from "../../Assests/Images/aboutUs/team2.jpg";
import PicThree from "../../Assests/Images/aboutUs/team3.jpg";
import PicFour from "../../Assests/Images/aboutUs/team4.jpeg";
import PicFive from "../../Assests/Images/aboutUs/team5.jpeg";
import PicSix from "../../Assests/Images/aboutUs/team6.jpeg";
import PicSeven from "../../Assests/Images/aboutUs/team7.jpg";
import PicTen from "../../Assests/Images/aboutUs/team8.jpeg";
import PicNine from "../../Assests/Images/aboutUs/team9.png";
import PicEigth from "../../Assests/Images/aboutUs/team10.png";
import PicEleven from "../../Assests/Images/aboutUs/team11.png";
import PicTweleve from "../../Assests/Images/aboutUs/team12.jpeg";

import Heading from "../Heading";

function Team() {
  return (
    <Row>
      <Col sm={12} className="my-1 mx-auto" id="team">
        <Heading
          content="Our Teams"
          design="fw-bold fs-5 bg-info text-white rounded text-center mb-3"
        />
        <Row className="d-flex flex-wrap mx-auto align-items-center">
          <img src={PicOne} alt="Zom-IN teams" className="w-50 p-2 my-2" />
          <img src={PicTwo} alt="Zom-IN teams" className="w-50 p-2 my-2" />
          <img src={PicThree} alt="Zom-IN teams" className="w-50 p-2 my-2" />
          <img src={PicFour} alt="Zom-IN teams" className="w-50 p-2 my-2" />
          <img src={PicFive} alt="Zom-IN teams" className="w-50 p-2 my-2" />
          <img src={PicSix} alt="Zom-IN teams" className="w-50 p-2 my-2" />
          <img src={PicSeven} alt="Zom-IN teams" className="w-50 p-2 my-2" />
          <img src={PicEigth} alt="Zom-IN teams" className="w-50 p-2 my-2" />
          <img src={PicNine} alt="Zom-IN teams" className="w-50 p-2 my-2" />
          <img src={PicTen} alt="Zom-IN teams" className="w-50 p-2 my-2" />
          <img src={PicEleven} alt="Zom-IN teams" className="w-50 p-2 my-2" />
          <img src={PicTweleve} alt="Zom-IN teams" className="w-50 p-2 my-2" />
        </Row>
      </Col>
    </Row>
  );
}

export default Team;
