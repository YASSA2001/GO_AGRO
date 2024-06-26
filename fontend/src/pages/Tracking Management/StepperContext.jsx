import React, { createContext, useState } from 'react';

const StepperContext = createContext();

const StepperProvider = ({ children }) => {
  const [statusIndex, setStatusIndex] = useState(0);

  return (
    <StepperContext.Provider value={{ statusIndex, setStatusIndex }}>
      {children}
    </StepperContext.Provider>
  );
};

export { StepperContext, StepperProvider }; // Export both StepperContext and StepperProvider
