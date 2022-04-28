import React, { Fragment, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Axios from "axios";

import User from '../Components/BasicInfo/User';
import Employer from "../Components/BasicInfo/Employer";

import { AuthContext } from "../Helpers/AuthContext";

function BasicInfo() {
  const navigate = useNavigate();

  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/signup");
    } else {
      Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/basicinfo/status/`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((response) => {
        const attemptStatus = response.data[0];
        if(attemptStatus.attempt === 1) {
      navigate("/");
        }
      });
    }
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Fragment>
        <HelmetProvider>
          <Helmet>
            <title> Basic Info | Zom - IN </title>
          </Helmet>
        </HelmetProvider>
      </Fragment>
      <div id="basicInfo" className="basicInfo">
        {authState.company === 1 ? <Employer /> : <User />}
      </div>
    </AuthContext.Provider>
  );
}

export default BasicInfo;
