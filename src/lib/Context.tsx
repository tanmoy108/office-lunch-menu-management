import React, { createContext, useContext, useState, ReactNode } from "react";

interface valueType {
  id: String;
  role: String;
}

interface MyContextType {
  value: valueType;
  setValue: (value: valueType) => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};

interface MyProviderProps {
  children: ReactNode;
}

const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [value, setValue] = useState<valueType>({
    id:"",
    role:""
  });

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, useMyContext };
