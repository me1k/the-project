import React, { useContext } from 'react';
import * as firebase from 'firebase/app';

import AppContext from '../../context/AppContext';
import LandingPage from '../LandingPage/LandingPage';
import * as Styled from './styled';
import Home from '../Home/Home';

interface IProps {
  authenticated: boolean;
  handleLogout: () => void;
}

function AuthScreen(props: IProps) {
  const context = useContext(AppContext);
  let currentUser = firebase.auth().currentUser;
  let uid = currentUser && currentUser.uid;
  let ref = firebase.database().ref('/');

  return (
    <Styled.AuthScreenWrapper>
      <>
        {props.authenticated ? (
          <Home
            currentUser={currentUser && currentUser.displayName}
            handleLogout={() => {
              firebase.auth().signOut();
            }}
            uid={uid}
            photoURL={currentUser && currentUser.photoURL}
          />
        ) : (
          <LandingPage />
        )}
      </>
    </Styled.AuthScreenWrapper>
  );
}

export default AuthScreen;
