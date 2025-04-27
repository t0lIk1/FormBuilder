import {createContext, useContext, useEffect, useState} from "react";
import {useUsers} from "src/api/useUsers.ts";

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [user, setUser] = useState()
  const {getUser} = useUsers()
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser();
      setUser(res)
    }
    if (token) {
      if (!user) {
        console.log("request user");
        fetchUser();
      }
    } else {
      setUser(null);
    }
  }, [token])

  const value = {
    user,
    token,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    < /UserContext.Provider>
  )
}

export function useNowUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser должен использоваться внутри UserProvider');
  }
  return context;
}
