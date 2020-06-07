import React from 'react';
import Home from './views/Home/Home';
import LandingPage from './views/LandingPage/LandingPage';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, props, ...rest }: any) {
  const { authenticated, photoURL, handleLogout, currentUser, uid } = props;

  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Home
            photoURL={photoURL}
            handleLogout={handleLogout}
            currentUser={currentUser}
            uid={uid}
          />
        ) : (
          <LandingPage />
        )
      }
    />
  );
}

export default PrivateRoute;
