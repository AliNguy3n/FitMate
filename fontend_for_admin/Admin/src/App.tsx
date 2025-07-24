import React from 'react';

import AllRoutes from "./routes/Routes";

import { configureRealBackend } from './helpers';

import "nouislider/distribute/nouislider.css";

import "./assets/scss/app.scss";
import "./assets/scss/icons.scss";

// configure real backend
configureRealBackend()

const App = () => {

  return (
    <>
      <React.Fragment>
        <AllRoutes />
      </React.Fragment>
    </>
  );
}

export default App;
