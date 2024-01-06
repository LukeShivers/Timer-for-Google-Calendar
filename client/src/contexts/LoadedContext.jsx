import React, { createContext, useContext, useState } from 'react';

const LoadContext = createContext();

export const LoadedContextProvider = ({ children }) => {
    const [calLoaded, setCalLoaded] = useState(null);
    const updateCalLoad = (newCalLoad) => {
        setCalLoaded(newCalLoad);
    }

    return (
        <LoadContext.Provider value={{ calLoaded, updateCalLoad }}>
            {children}
        </LoadContext.Provider>
    );
};

export const useLoadContext = () => {
    const context = useContext(LoadContext);
    return context;
  }