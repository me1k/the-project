import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.scss';
import { AppContextProvider } from './context/AppContext';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { config } from './firebaseConfig';
import Home from './views/Home/Home';
import PrivateRoute from './PrivateRoute';
import LandingPage from './views/LandingPage/LandingPage';
import { createBrowserHistory } from 'history';
import StockDetail from './views/StockDetail/StockDetail';

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
  const history = createBrowserHistory();
  let currentUser = firebase.auth().currentUser;
  let uid = currentUser && currentUser.uid;
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
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              authenticated ? (
                <Home
                  currentUser={currentUser && currentUser.displayName}
                  photoURL={currentUser && currentUser.photoURL}
                  handleLogout={handleLogout}
                  uid={uid}
                />
              ) : (
                <LandingPage />
              )
            }
          />
          <Route exact path="/stock/" render={() => <StockDetail />} />
        </Switch>
      </Router>
    </AppContextProvider>
  );
}

export default App;
