import React, { useState } from "react";

const TokenContext = React.createContext();

function TokenContextProvider({ children }) {
  const [token, setToken] = useState("");

  const value = {
    setToken,
    token,
  };

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
}

export { TokenContextProvider, TokenContext };
