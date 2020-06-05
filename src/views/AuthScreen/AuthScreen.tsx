import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import styled from 'styled-components';

interface IProps {}

function AuthScreen(props: IProps) {
  const context = useContext(AppContext);

  return <h1>{context.authenticated ? 'Logged in' : 'Not logged in'}</h1>;
}

export default AuthScreen;

const LoginBody = styled.div`
    display: flex;
    justify-content: center;
    align-item: center

    background-color: #2d2d2d
`;

const LoginForm = styled.div`
  width: 300px;
  height: 400px;
  border: 1px solid #fff;
`;
