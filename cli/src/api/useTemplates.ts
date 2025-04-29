import api from "src/api/axios";
import {useAsync} from "src/api/useAsync";
import {useNavigate} from "react-router-dom";
import {TemplateI} from "src/types/type.ts";

export const useTemplates = () => {
  const {run, loading, error} = useAsync();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getAllTemplates = async () => {
    return await run(async () => {
      const res = await api.get("/templates");
      return res.data;
    });
  };


  const getTemplatesByUser = async () => {
    return await run(async () => {
      const res = await api.get("/templates/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return res.data;
    });
  };

  const createTemplates = async (data: TemplateI) => {
    return await run(async () => {
      const res = await api.post("/templates", data);
      return res.data;
    })
  }

  const updateTemplate = async (data: TemplateI, id: number) => {
    console.log(data)
    return await run(async () => {
      const res = await api.put(`/templates/${id}`, data);
      return res.data;
    })
  }

  const getTemplateById = async (id: number) => {
    if (!token) navigate("/login")
    return await run(async () => {
      const res = await api.get(`/templates/${id}`);
      return res.data;
    })
  }

  return {
    getTemplateById,
    createTemplates,
    getAllTemplates,
    getTemplatesByUser,
    updateTemplate,
    loading,
    error,
    token
  };
};