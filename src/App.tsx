import React, { useState, Suspense, useEffect } from 'react';
import { Router, Route, useHistory } from 'react-router-dom';
import * as Styled from './styled';
import './App.scss';
import { AppContextProvider, IAppContext } from './context/AppContext';
import firebase from 'firebase';
import { config } from './firebaseConfig';
import { Switch } from 'react-native';

interface IUser {
  name: string;
  age: string;
  role: string;
}

const AuthScreenComponent = React.lazy(() =>
  import('./views/AuthScreen/AuthScreen')
);

firebase.initializeApp(config);

function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const history = useHistory();
  const handleLogout = () => {
    firebase.auth().signOut();
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setAuthenticated(!!user);
    });
  }, []);

  return (
    <AppContextProvider value={{ authenticated: !authenticated }}>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthScreenComponent
          authenticated={authenticated}
          handleLogout={handleLogout}
        />
      </Suspense>
    </AppContextProvider>
  );
}

export default App;
