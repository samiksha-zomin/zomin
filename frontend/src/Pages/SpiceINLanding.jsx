import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Axios from "axios";
import ReactHtmlParser from "react-html-parser";


import { Container, Row, Col, Tabs, Tab, Badge } from "react-bootstrap";
import Name from "../Components/Name";
import Ads from "../Components/Ads";
import Footer from "../Components/Footer";
import ScrollToTop from "../Components/ScrollToTop";

function SpiceINLanding() {
    const { spiceinLanding } = useParams();
    const [spiceIn, setSpiceIn] = useState([]);

    console.log(spiceinLanding)

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/spicein/list/` +spiceinLanding)
            .then((response) => {
                setSpiceIn(response.data);
                console.log(response.data);
            });
    }, [spiceinLanding]);

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Spice IN | Zom-IN</title>
        </Helmet>
      </HelmetProvider>
      <Container className="content mt-2">
        <Row>

        {spiceIn
        .map((spiceINLandingDetails, key) => {
            const title = spiceINLandingDetails.title_spice;
            const spiceImg = `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/spiceIN/` + spiceINLandingDetails.img_title_spice;
            const author = spiceINLandingDetails.user_id;
            const article = spiceINLandingDetails.editor;
            
            const postTime = new Date(spiceINLandingDetails.post_time);
              const postDate = postTime
                .toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
                .replace(/ /g, " ");

            return (
                <Col sm={12} md={9} lg={9}>
            <div className="text-center mx-auto px-lg-0 px-md-4 px-0">
              <img
                src={spiceImg}
                className="img-fluid mx-auto border"
                alt="Spice-In"
              />
            </div>

            <div className="text-center mx-auto px-lg-0 px-md-4 px-0">
            <h2 class="p-0 mx-0 mt-3 fw-bold">{title}</h2>
            <p class="p-0 my-3">By <span class="fw-bold">
            <Name id={author} />
            </span> | Updated at <span class="fw-bold">{postDate}</span></p>
            </div>
            <div className="my-4 mx-2">
            {ReactHtmlParser(article)}
            </div>
          </Col>
            );

        })
        }
          
          <Col sm={12} md={3} lg={3}>
            <Ads />
          </Col>
        </Row>
      </Container>
      <ScrollToTop />
        <Footer />
    </div>
  );
}

export default SpiceINLanding;
