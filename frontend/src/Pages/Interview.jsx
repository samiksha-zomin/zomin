import React, { Fragment, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import User from '../Components/Interview/User';
import Employer from "../Components/Interview/Employer";
import ScrollToTop from "../Components/ScrollToTop";
import Footer from "../Components/Footer";

import { AuthContext } from "../Helpers/AuthContext";

function Interview() {
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
            <title> Interview | Zom - IN </title>
          </Helmet>
        </HelmetProvider>
      </Fragment>
      <div id="interview" className="interview">
        {authState.company === 1 ? <Employer /> : <User />}
      </div>
      <ScrollToTop />
      <Footer />
    </AuthContext.Provider>
  );
}

export default Interview;