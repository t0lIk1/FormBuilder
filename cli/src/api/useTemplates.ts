import api from "src/api/axios";
import { useAsync } from "src/api/useAsync";

export const useTemplates = () => {
  const { run, loading, error } = useAsync();

  const getAllTemplates = async () => {
    return await run(async () => {
      const res = await api.get("/templates");
      return res.data;
    });
  };

  return { getAllTemplates, loading, error };
};