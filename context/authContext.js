import React from 'react';

export const authContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = React.useState(null);

  return (
    <authContext.Provider value={{user, setUser}}>
      {children}
    </authContext.Provider>
  );
};
