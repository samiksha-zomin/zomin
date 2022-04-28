import React, { Fragment, useContext } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { AuthContext } from "../Helpers/AuthContext";

import Home from "../Components/Home/Home";
import Main from "../Components/Index/Main";

//Custom Style
import '../Styles/index.css';

function Index() {
  const { authState, setAuthState } = useContext(AuthContext);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Fragment>
        <HelmetProvider>
          <Helmet>
            <title> Home | Zom - IN </title>
          </Helmet>
        </HelmetProvider>
        {authState.status ? <Home userID={authState.id}/> : <Main />}
      </Fragment>
    </AuthContext.Provider>
  );
}

export default Index;
