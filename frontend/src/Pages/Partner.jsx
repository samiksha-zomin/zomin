import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Axios from 'axios';

import { Container, Row, Col, Image } from 'react-bootstrap';

//Componenents
import Heading from '../Components/Heading';
import Footer from '../Components/Footer';
import ScrollToTop from '../Components/ScrollToTop';
import CardPartner from '../Components/Partner/CardPartner';

import Ads from '../Components/Ads'

//Custom Style
import '../Styles/partner.css';

//ICOn
import { BiSearchAlt } from "react-icons/bi";


function Partner() {

    const [partnerList, setPartnerList] = useState([]);
    const [industryList, setIndustryList] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchIndustryTerm, setSearchIndustryTerm] = useState("");



    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/partner/list`)
            .then((response) => {
                setPartnerList(response.data);
            });
    }, []);

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/meta/industry`)
            .then((response) => {
                setIndustryList(response.data);

            });
    }, []);

    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>Partners | Zom-IN</title>
                </Helmet>
            </HelmetProvider>

            <Container fluid className=" h-100 searchbox">
                <Row className="py-3 px-5">
                    <div className="input-group ">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Keywords (Company Name, Industry, ...)"
                            aria-label="Keywords"
                            aria-describedby="button-addon2"
                            onChange={(event) => {
                                setSearchTerm(event.target.value);
                            }}
                        />
                        <button
                            className="btn btn-outline-primary"
                            type="button"
                            id="button-addon2" >
                            < BiSearchAlt /> Search
                        </button>
                    </div>
                    <div className="d-flex flex-wrap align-items-center  align-content-center  filterbox">
                        <div>
                            <select defaultValue={'DEFAULT'}
                                className="form-select form-select-sm"
                                aria-label="Default select example"
                                onChange={(event) => {
                                    setSearchIndustryTerm(event.target.value);
                                }} >
                                <option value=""> Industry </option>

                                {industryList.map((industryList, key) => {
                                    const childName = industryList.child_name;
                                    return (
                                        <option value={childName} > {childName} </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    {/* <Col xs={12} md={4} lg={5}>

                            <select className="form-select form-select-md" aria-label="Default select example">
                                <option value="DEFAULT">Select Industry</option>

                                {industryList.map((industryDetails) => {
                                    const industry = industryDetails.child_name;

                                    return (
                                        <option value={industry} key={industryDetails.child_id}>{industry}</option>
                                    );
                                
                            })}
                            </select>

                        </Col> */}
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col sm={10}>
                        <Row xs={1} sm={1} md={3} lg={4} className="g-1">

                            {partnerList

                                .filter(partnerDetails => {
                                    if (searchTerm === "") {
                                        return partnerDetails
                                    } else if (partnerDetails.company_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return partnerDetails
                                    } else if (partnerDetails.industry.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return partnerDetails
                                    }
                                    return false;
                                })

                                .filter(partnerDetails => {
                                    if (searchIndustryTerm === "") {
                                        return partnerDetails
                                    } else if (partnerDetails.industry.toLowerCase().includes(searchIndustryTerm.toLowerCase())) {
                                        return partnerDetails
                                    }
                                    return false;
                                })

                                .map((partnerDetails, key) => {
                                    const companyName = partnerDetails.company_name;
                                    const companyID = partnerDetails.id;
                                    const partnerIndustry = partnerDetails.industry;
                                    var truncatedSize = 85;
                                    const companyAbout = partnerDetails.company_about;
                                    var partnerAbout = companyAbout.substring(0, truncatedSize) + "...";

                                    const partnerLogo = `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/user/` + partnerDetails.company_logo;


                                    return (

                                        <CardPartner
                                            key={companyID}
                                            cardImage={partnerLogo}
                                            cardHeader={companyName}
                                            cardMeta={partnerIndustry}
                                            cardDesc={partnerAbout}

                                        />

                                    );

                                })}

                        </Row>
                    </Col>
                    <Col sm={2} className="sidebarHeader my-3" >
                        <Ads />

                    </Col>
                </Row>
            </Container>


            <Footer />
            <ScrollToTop />

        </div>
    )
}

export default Partner;
