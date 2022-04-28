import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../../Helpers/AuthContext";

import CoverImg from "../../Assests/Images/background/bg-1.png";
import { FaUniversity } from "react-icons/fa";

function Profile(props) {
  const userID = props.userID;
  const { authState, setAuthState } = useContext(AuthContext);

  const [viewName, setViewName] = useState("Zom-IN User");
  const [viewProfile, setViewProfile] = useState("avatar/male.svg");
  const [viewEducation, setViewEducation] = useState("Education");

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/home/userProfile/` + userID,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      const profileDetail1 = response.data[0];
      const profileDetail2 = response.data[1];

      var profile;

      if (profileDetail1.length === 0) {
        if (authState.company === 1) {
          profile = `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/avatar/bp.png`;
          setViewProfile(profile);
        } else {
          if (profileDetail2[0].gender === "Male") {
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
          profileDetail1[0].profile_photo;
        setViewProfile(profile);
      }
    });
  });

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/home/userName/` + userID
    ).then((response) => {
      const userName = response.data[0];
      if (authState.company !== 1) {
        setViewName(userName.name);
      } else {
        setViewName(userName.companyname);
      }
    });
  });

  // useEffect(() => {
  //   if (authState.company === 0) {
  //     Axios.get(
  //       `${process.env.REACT_APP_SERVER_DOMAIN}/home/userEducation/` + userID
  //     ).then((response) => {
  //       const userEducation = response.data[0];
  //       setViewEducation(userEducation.school);
  //     });
  //   } else {
  //     Axios.get(
  //       `${process.env.REACT_APP_SERVER_DOMAIN}/home/employerIndustry/` + userID
  //     ).then((response) => {
  //       const employerIndustry = response.data[0];
  //       setViewEducation(employerIndustry.industry);
  //     });
  //   }
  // });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <div className="card mb-3">
        <img
          src={CoverImg}
          className="card-img-top profilecover"
          alt="Background Cover"
        />
        <div className="position-relative">
          <div className="position-absolute top-50 start-50 translate-middle w-50">
            <img
              src={viewProfile}
              className=" my-auto rounded-circle"
              width="100"
              height="100"
              alt="Background Cover"
            />
          </div>
        </div>
        <div className="card-body mt-4 text-center pb-0 px-1">
          <h6 href="/edcwe" className="card-title pt-3 text-truncate">
            <a className="text-decoration-none link-dark" href="/profile">
              {viewName}
            </a>
          </h6>
          {/* {viewEducation.length !== 0 &&
            <p className="card-text text-muted text-small">
            {authState.company === 0 ? (
              <p>
                <FaUniversity className="icon" />
                {viewEducation}
              </p>
            ) : (
              <span className="badge rounded-pill bg-info text-dark">
                {viewEducation}
              </span>
            )}
          </p>
          } */}
        </div>
        <hr className="dropdown-divider" />
        <div className="mx-auto m-1">
          <a href="/profile" className="text-decoration-none link-primary">
            View Profile
          </a>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default Profile;
