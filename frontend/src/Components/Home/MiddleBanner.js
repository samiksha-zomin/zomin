import React from "react";

import { Carousel } from "react-bootstrap";

function MiddleBanner() {
  return (
    <Carousel variant="dark" indicators={false} className="border mb-3">
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="https://zom-in.com/images/banner/homepage-banner/bp-myfitbox-more-info.jpeg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="https://zom-in.com/images/banner/homepage-banner/bp-dawn-adaptive-more-info.jpeg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="https://zom-in.com/images/banner/homepage-banner/bp-myfitbox-more-info.jpeg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}
export default MiddleBanner;
