import React, { Fragment, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import User from '../Components/Profile/User';
import Employer from "../Components/Profile/Employer";
import ScrollToTop from "../Components/ScrollToTop";
import Footer from "../Components/Footer";

import { AuthContext } from "../Helpers/AuthContext";

function Profile() {
  const navigate = useNavigate();

  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/signup");
    }
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Fragment>
        <HelmetProvider>
          <Helmet>
            <title> Profile | Zom - IN </title>
          </Helmet>
        </HelmetProvider>
      </Fragment>
      <div id="profile" className="profile">
        {authState.company === 1 ? <Employer /> : <User />}
      </div>
      <ScrollToTop />
      <Footer />
    </AuthContext.Provider>
  );
}

export default Profile;
