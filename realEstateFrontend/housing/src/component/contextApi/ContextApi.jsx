// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const ContextApi = ({ children }) => {

  const [buyerInfo, setBuyerInfo] = useState(null);


  useEffect(() => {
    const mobile = document.cookie
      .split('; ')
      .find(row => row.startsWith('buyerMobile='))
      ?.split('=')[1];

    if (mobile) {
      setBuyerInfo({ mobile });
    }
  }, []);



  return (
    <AuthContext.Provider value={{ buyerInfo, setBuyerInfo  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
