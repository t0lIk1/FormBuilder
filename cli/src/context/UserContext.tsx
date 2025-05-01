import {createContext, useContext, useEffect, useState} from "react";
import {useUsers} from "src/api/useUsers.ts";
import {UserI} from "src/types/type.ts";
import axios from "axios";

interface UserContextType {
  user: UserI;
  token: string | null;
  updateUser: (userData: UserI) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {getUser} = useUsers();
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

  const updateUser = (userData: UserI) => {
    setUser((prev) => ({...prev, ...userData}));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  useEffect(() => {
    if (token) {
      if (!user) {
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
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useNowUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useNowUser должен использоваться внутри UserProvider");
  }
  return context;
}
