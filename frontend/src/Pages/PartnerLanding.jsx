import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Axios from 'axios';


import LandingTop from '../Components/Partner/LandingTop';
import LandingAbout from '../Components/Partner/LandingAbout';
import LandingOverview from '../Components/Partner/LandingOverview';
import LandingAchievement from '../Components/Partner/LandingAchievement';
import LandingSidebar from '../Components/Partner/LandingSidebar';
import Footer from '../Components/Footer';
import ScrollToTop from '../Components/ScrollToTop';

import { Container, Row, Col, Tabs, Tab, Badge } from 'react-bootstrap';

//Custom Style
import '../Styles/partner.css';
import LandingInfo from '../Components/Partner/LandingInfo';

function PartnerLanding() {

    const { companyname } = useParams();
    const [partner, setPartner] = useState([]);

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/partner/list/` + companyname)
            .then((response) => {
                setPartner(response.data);
                console.log(response.data)
            });
    }, [companyname]);


    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>Partner | Zom-IN</title>
                </Helmet>
            </HelmetProvider>
            <Container className="content mt-2">

                {partner

                    .map((partnerDetails, key) => {
                        const partnerName = partnerDetails.company_name;
                        const partnerID = partnerDetails.id;
                        const partnerIndustry = partnerDetails.industry;
                        const partnerLogo = `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/user/`+ partnerDetails.company_logo;
                        const partnerCoverPic = `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/user_cover/` + partnerDetails.company_team_pic;
                        const partnerLocation = partnerDetails.location_com;


                        return (
                            <LandingTop
                                key={partnerID}
                                partnerLogo={partnerLogo}
                                partnerName={partnerName}
                                partnerCoverPic={partnerCoverPic}
                                partnerIndustry={partnerIndustry}
                                partnerLocation={partnerLocation}
                            />
                        );
                    })}

                <hr />
                <Row>
                    <Col sm={12} md={9} lg={9}>

                        <Tabs defaultActiveKey="about" id="uncontrolled-tab-example" className="mb-3 nav-fill">

                            <Tab eventKey="overview" title="Overview">
                                {partner.map((overview, key) => {
                                    const partnerOverview = overview.interview;
                                    
                                    return (
                                        <LandingOverview
                                            partnerOverview={partnerOverview}
                                        />
                                    )
                                })}
                            </Tab>

                            <Tab eventKey="about" title="About">
                                {partner.map((about, key) => {
                                    const partnerAbout = about.company_about;
                                    
                                    return (
                                        <LandingAbout
                                            partnerAbout={partnerAbout}
                                        />
                                    )
                                })}
                            </Tab>

                            {/* <Tab eventKey="achievement" title="Achievement">
                                {partner.map((achievement, key) => {
                                    const partnerAchievement = "Achievement";
                                    
                                    return (
                                        <LandingAchievement
                                            partnerAchievement={partnerAchievement}
                                        />
                                    )
                                })}
                            </Tab>

                            <Tab eventKey="jobs" title="Jobs">
                               <div>
                                   <h1>Jobs</h1>
                               </div>
                            </Tab>

                            <Tab eventKey="qna" title="Q&A">
                               <div>
                                   <h1>Q&A</h1>
                               </div>
                            </Tab>
                            <Tab eventKey="events" title={<div>Event <span className="badge bg-secondary">New</span></div>}>
                               <div>
                                   <h1>Events<Badge bg="secondary">19</Badge></h1>
                                   
                               </div>
                            </Tab> */}
                        </Tabs>
                    </Col>
                    
                    <Col sm={12} md={3} lg={3}>
                    <LandingInfo />
                    <LandingSidebar />
                    </Col>
                </Row>
                
            </Container>
            <Footer />
            <ScrollToTop />
        </div>
    )
}

export default PartnerLanding
