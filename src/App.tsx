import React, { useState } from 'react';

import './App.scss';
import AuthScreen from './views/AuthScreen/AuthScreen';
import { AppContextProvider, IAppContext } from './context/AppContext';

function App() {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  const handleLogin = () => {
    if (isAuthenticated) {
      console.log('authenticated');
    } else {
      console.log('is not authenticated');
    }
  };

  return (
    <AppContextProvider
      value={{ authenticated: isAuthenticated, login: handleLogin }}
    >
      <div className="App">
        <AuthScreen />
      </div>
    </AppContextProvider>
  );
}

export default App;
