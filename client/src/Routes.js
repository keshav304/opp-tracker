import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import App from "./App";
import Activate from "./auth/Activate";
import AdminRoute from "./auth/privateroutes/AdminRoute";
import PrivateRoute from "./auth/privateroutes/PrivateRoute";

import Signin from "./auth/Signin";
import Signup from "./auth/Signup.js";
import Admin from "./core/Admin";
import Private from "./core/Private";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/account-activation/:token" exact component={Activate} />
        <PrivateRoute path="/private" exact component={Private} />
        <AdminRoute path="/admin" exact component={Admin} />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
