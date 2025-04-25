import api from "src/api/axios";
import { useAsync } from "src/api/useAsync";

export const useTemplates = () => {
  const { run, loading, error } = useAsync();
  const token = localStorage.getItem("token");

  const getAllTemplates = async () => {
    return await run(async () => {
      const res = await api.get("/templates");
      return res.data;
    });
  };

  const createTemplates = async (data) => {


    return await run(async () => {
      const res = await api.post("/templates", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return res.data;
    })
  }

  return { createTemplates, getAllTemplates, loading, error, token };
};