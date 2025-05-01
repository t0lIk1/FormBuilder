import api from "src/api/axios";
import {useAsync} from "src/api/useAsync";
import {TemplateCreateDto} from "src/types/type.ts";

export const useTemplates = () => {
  const {run, loading, error} = useAsync();
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

  const createTemplates = async (data: TemplateCreateDto) => {
    return await run(async () => {
      const res = await api.post("/templates", data);
      return res.data;
    })
  }

  const deleteTemplates = async (id: number) => {
    return await run(async () => {
      const res = await api.delete(`/templates/${id}`);
      return res;
    })
  }

  const updateTemplate = async (data: TemplateCreateDto, id: number) => {
    return await run(async () => {
      const res = await api.put(`/templates/${id}`, data);
      return res.data;
    })
  }

  const getTemplateById = async (id: number) => {
    return await run(async () => {
      const res = await api.get(`/templates/${id}`, {skipAuth: true});
      return res.data;
    })
  }

  return {
    getTemplateById,
    createTemplates,
    getAllTemplates,
    getTemplatesByUser,
    updateTemplate,
    deleteTemplates,
    loading,
    error,
  };
};