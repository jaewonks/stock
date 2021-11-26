import React from "react";
import { Route, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const AuthenticatedRoute = ({ component: Component, ...rest }: any) => {
  //converts object to boolean ->false if null else true//
  const isAuthenticated = Cookies.get("token")? true : false;
  return (
    <Route
      {...rest}
      render={(props: any) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/signin" />
        )
      }
    />
  );
};

export default React.memo(AuthenticatedRoute);
