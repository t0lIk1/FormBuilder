import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface AuthPayload {
  name?: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = async (data: AuthPayload, type: 'login' | 'register') => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/${type}`, data);
      localStorage.setItem('token', response.data.token);
      navigate("/")
      return response.data;
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Что-то пошло не так");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {auth, loading, error};
};
