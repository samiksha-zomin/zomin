import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
import routes from './Config/routes';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        {routes.map(({ path, component, name }) => {
          return <Route exact path={path} key={name} component={component} />
        })}
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
