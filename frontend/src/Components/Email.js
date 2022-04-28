import React, { useState, useEffect } from "react";
import Axios from "axios";

function Email(props) {
  const userID = props.id;
  const [viewEmail, setViewEmail] = useState("");

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/dashboard/username/` + userID
    ).then((response) => {
      const userDetails = response.data[0];
      setViewEmail(userDetails.email);
    });
  });

  return <>{viewEmail}</>;
}

export default Email;
