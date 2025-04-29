import { createContext, useContext, useEffect, useState } from "react";
import { useUsers } from "src/api/useUsers.ts";

interface UserContextType {
  user: any; // Замените any на тип вашего пользователя
  token: string | null;
  updateUser: (userData: any) => void; // Добавляем функцию обновления
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<any>(null); // Замените any на тип вашего пользователя
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

  // Функция для обновления пользователя
  const updateUser = (userData: any) => {
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
    updateUser, // Добавляем функцию в контекст
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