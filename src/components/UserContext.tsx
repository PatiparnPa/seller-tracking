// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import Cookies from 'universal-cookie';

interface UserContextProps {
  storeId: string | null;
  setStoreId: (id: string | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [storeId, setStoreId] = useState<string | null>(null);

  useEffect(() => {
    const cookies = new Cookies();
    const accessToken = cookies.get('access_token');

    if (accessToken) {
      try {
        const decodedToken: any = jwtDecode(accessToken);
        console.log('Decoded Token:', decodedToken);
        setStoreId(decodedToken.storeId);
      } catch (error) {
        console.error('Error decoding access token:', error);
      }
    }
  }, []);

  useEffect(() => {
    console.log('Store ID updated:', storeId);
  }, [storeId]);

  return (
    <UserContext.Provider value={{ storeId, setStoreId }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };