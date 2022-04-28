import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ReactPaginate from "react-paginate";
import Axios from "axios";

import { Container, Row, Col, Pagination } from "react-bootstrap";
import CardSpiceIn from "../Components/SpiceIN/CardSpiceIn";
import Ads from "../Components/Ads";

import { BiSearchAlt } from "react-icons/bi";

function SpiceIN() {
  const [spiceInList, setSpiceInList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [pageNumber, setPageNumber] = useState(0);
  var cardPerPage = 30;
  const pagesVisited = pageNumber * cardPerPage;
  const pageCount = Math.ceil(spiceInList.length / cardPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/spicein/list`).then(
      (response) => {
        setSpiceInList(response.data);
      }
    );
  }, []);

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Spice IN | Zom-IN</title>
        </Helmet>
      </HelmetProvider>

      <Container fluid className=" h-100 searchbox">
        <Row className="py-3 px-5">
          <div className="input-group ">
            <input
              type="text"
              className="form-control"
              placeholder="Keywords (Category, Industry, ...)"
              aria-label="Keywords"
              aria-describedby="button-addon2"
              onChange={(event) => {
                setSearchTerm(event.target.value);
                console.log(event.target.value);
              }}
            />
            <button
              className="btn btn-outline-primary"
              type="button"
              id="button-addon2"
            >
              <BiSearchAlt /> Search
            </button>
          </div>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col sm={10}>
            <Row xs={1} sm={1} md={3} lg={4} className="g-1 py-5">
              {spiceInList
                .slice(pagesVisited, pagesVisited + cardPerPage)
              
                .filter(spiceINDetails => {
                    if (searchTerm === "") {
                        return spiceINDetails
                    } else if (spiceINDetails.title_spice.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return spiceINDetails
                    } else if (spiceINDetails.category_spice.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return spiceINDetails
                    }
                    return false;
                })


                .map((spiceINDetails, key) => {
                  const spiceID = spiceINDetails.spicein_id;
                  const category = spiceINDetails.category_spice;
                  const title = spiceINDetails.title_spice;
                  const spiceImg = spiceINDetails.img_title_spice;
                  const url = spiceINDetails.url_spice;

                  return (
                    <CardSpiceIn
                      key={spiceID}
                      category={category}
                      title={title}
                      spiceImg={spiceImg}
                      url={url}
                    />
                  );
                })}

              <div className="w-100">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginateBtn"}
                  previousLinkClassName={"previousBtn"}
                  nextLinkClassName={"nextBtn"}
                  disabledClassName={"paginateDisabled"}
                  activeClassName={"paginateActive"}
                />
              </div>
            </Row>
          </Col>
          <Col sm={2} className="py-5">
            <Ads />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SpiceIN;
