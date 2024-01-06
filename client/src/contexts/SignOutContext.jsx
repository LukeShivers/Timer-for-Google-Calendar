import React, { createContext, useState } from 'react';

const SignOutContext = createContext(() => {});

const SignOutContextProvider = ({ children }) => {
  const [signOut, setSignOut] = useState(() => {});
  const updateSignOut = (newFunction) => {
    setSignOut(() => newFunction);
  };

  return (
    <SignOutContext.Provider value={{ signOut, updateSignOut }}>
      {children}
    </SignOutContext.Provider>
  );
};

export { SignOutContextProvider, SignOutContext };