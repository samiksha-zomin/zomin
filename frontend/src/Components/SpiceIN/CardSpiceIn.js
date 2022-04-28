import React from "react";

import { Card, Button } from "react-bootstrap";

function CardSpiceIn(props) {

    const title = props.title;
    const category = props.category;
    const spiceImg = `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/spiceIN/` +
    props.spiceImg;
    var spiceINLink = "/spiceIn/" + props.url;


  return (
    <Card className="position-relative my-2 mx-4 p-0 pt-0 pb-2">
      <a
        href={spiceINLink}
        className="text-decoration-none text-dark m-0 p-0"
      >
        <img
          src={spiceImg}
          className="img-fluid mx-auto mt-0 my-1 roundedImageCard border"
          alt="Spice-In"
        />
        <div className="m-2">
          <p className=" px-3 py-1 m-0 badge rounded-pill alert-primary fs-6 fw-normal text-dark">
            {category}
          </p>
        </div>
        <p className="p-0 my-0 mx-2 fs-5 lh-sm fw-bold text-truncate-3">
          {title}
        </p>
      </a>
    </Card>
  );
}

export default CardSpiceIn;
