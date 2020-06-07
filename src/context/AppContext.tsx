import React, { createContext } from 'react';

export interface IAppContext {
  authenticated: boolean;
}

const AppContext = createContext<IAppContext>({
  authenticated: false
});

export const AppContextProvider = AppContext.Provider;

export const AppContextConsumer = AppContext.Consumer;

export default AppContext;
