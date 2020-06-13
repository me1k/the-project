import React from 'react';
import Home from './views/Home/Home';
import LandingPage from './views/LandingPage/LandingPage';
import { Route, Redirect } from 'react-router-dom';

interface IProps {
  photoURL: string | null;
  uid: string | null;
  currentUser: string | null;
  handleLogout: () => void;
  authenticated: boolean | null;
}

function PrivateRoute(props: IProps, { component: Component, ...rest }: any) {
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
