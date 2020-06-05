import React, { createContext } from 'react';

export interface IAppContext {
  authenticated: boolean;
  login: () => void;
}

const AppContext = createContext<IAppContext>({
  authenticated: false,
  login: () => {}
});

export const AppContextProvider = AppContext.Provider;

export const AppContextConsumer = AppContext.Consumer;

export default AppContext;
