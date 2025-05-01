import {useNavigate} from "react-router-dom";
import api from "src/api/axios.ts";
import {useAsync} from "./useAsync.ts";

interface AuthPayload {
  name?: string;
  email: string;
  password: string;
}

export const useUsers = () => {
  const {run, loading, error} = useAsync();
  const navigate = useNavigate();

  const auth = (data: AuthPayload, type: "login" | "register") => {
    return run(async () => {
      const {data: res} = await api.post(`/auth/${type}`, data);
      localStorage.setItem("token", res.token);
      navigate("/");
      return res;
    });
  };

  const deleteUser = async () => {
    return await run(async () => {
      await api.delete(`/users/delete/me`)
    });
  };

  const token = localStorage.getItem("token");
  const getUser = () => {
    return run(async () => {
      const res = await api.get(`/users/now`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      return res.data;
    })
  }

  const getAllUsers = async () => {
    return run(async () => {
      const res = await api.get('/users', {headers: {Authorization: `Bearer ${token}`}})
      return res.data;
    })
  }

  const toggleLike = (id: number) => {
    return run(async () => {
      const res = await api.post(`/templates/${id}/toggle-like`, {}, {
        headers: {Authorization: `Bearer ${token}`}
      })
      return res.data;
    })
  }

  return {getUser, deleteUser, auth, loading, error, toggleLike, getAllUsers};
};
