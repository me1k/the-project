import React from 'react';
import * as firebase from 'firebase/app';
import { uiConfig } from '../../firebaseConfig';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import * as Styled from './styled';

function LandingPage() {
  return (
    <>
      <Styled.HeadlineWrapper>
        <h1>The Project </h1>

        <Styled.LoginWrapper>
          <h2>Einloggen</h2>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </Styled.LoginWrapper>
      </Styled.HeadlineWrapper>
    </>
  );
}

export default LandingPage;
