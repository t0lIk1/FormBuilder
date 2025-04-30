import { createContext, useContext, useEffect, useState } from "react";
import { useUsers } from "src/api/useUsers.ts";

interface UserContextType {
  user: any;
  token: string | null;
  updateUser: (userData: any) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { getUser } = useUsers();
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const res = await getUser();
      setUser(res);
    } catch (error) {
      console.error("Ошибка при получении пользователя:", error);
      setUser(null);
    }
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  useEffect(() => {
    if (token) {
      if (!user) {
        console.log("request user");
        fetchUser();
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const value = {
    user,
    token,
    updateUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export function useNowUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser должен использоваться внутри UserProvider');
  }
  return context;
}