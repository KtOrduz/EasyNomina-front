import { createContext } from "react";

export const authContext = createContext();
export const authProvider = ({ children }) => {
  return <authContext.Provider value={{}}>{children}</authContext.Provider>;
};
