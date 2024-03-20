import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext("");

export const DataContextProvider = ({ children }) => {
  const [dataArray, setDataArray] = useState("");
  const updateData = (newData) => {
    setDataArray(newData);
  };

  return (
    <DataContext.Provider value={{ dataArray, updateData }}>
      {children}
    </DataContext.Provider>
  );
};


export const useDataContext = () => {
  const context = useContext(DataContext);
  return context;
};

