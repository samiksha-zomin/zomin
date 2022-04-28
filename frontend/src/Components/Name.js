import React, { useState, useEffect } from "react";
import Axios from "axios";

function Name(props) {
  const userID = props.id;
  const [viewName, setViewName] = useState("Zom-IN User");

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/dashboard/username/` + userID
    ).then((response) => {
      const userDetails = response.data[0];
      setViewName(userDetails.name);
    });
  }, [userID]);

  return <>{viewName}</>;
}

export default Name;
