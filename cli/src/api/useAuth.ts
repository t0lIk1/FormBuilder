import { useNavigate } from "react-router-dom";
import api from "src/api/axios.ts";
import { useAsync } from "./useAsync.ts";

interface AuthPayload {
  name?: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const { run, loading, error } = useAsync();
  const navigate = useNavigate();

  const auth = (data: AuthPayload, type: "login" | "register") => {
    return run(async () => {
      const { data: res } = await api.post(`/auth/${type}`, data);
      localStorage.setItem("token", res.token);
      navigate("/");
      return res;
    });
  };

  return { auth, loading, error };
};
