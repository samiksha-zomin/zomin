import React, { useState, useEffect } from "react";
import Axios from "axios";

function Name(props) {
  const userID = props.id;
  const design = props.design;
  const width = props.width;
  const height = props.height;

  const [viewProfile, setViewProfile] = useState(
    `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/avatar/male.svg`
  );

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/dashboard/userprofile/` + userID
    ).then((response) => {
      const userDetails0 = response.data[0];
      const userDetails1 = response.data[1];
      const userDetails2 = response.data[2];

      var profile;

      if (userDetails1.length === 0) {
        if (userDetails0.company === 1) {
          profile = `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/avatar/bp.png`;
          setViewProfile(profile);
        } else {
          if (userDetails2[0].gender === "Male") {
            profile = `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/avatar/male.svg`;
            setViewProfile(profile);
          } else {
            profile = `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/avatar/female.svg`;
            setViewProfile(profile);
          }
        }
      } else {
        profile =
          `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/user/` +
          userDetails1[0].profile_photo;
        setViewProfile(profile);
      }
    });
  });

  return <>
  <img
  src={viewProfile}
  className={design}
  alt=""
  width={width}
  height={height}
/> </>;
}

export default Name;
