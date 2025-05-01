import {useAsync} from "src/api/useAsync.ts";
import api from "src/api/axios.ts";
import {FormI} from "src/types/type.ts";


export const useForm = () => {
  const {run, loading} = useAsync()
  const submitForm = async (id: number, values: FormI) => {
    return await run(async () => {
      const res = await api.post(`forms/templates/${id}/submit`, values)
      return res.data;
    })
  }

  const getFormByNowUser = async () => {
    return await run(async () => {
      const res = await api.get("forms/user")
      return res.data;
    })
  }

  const getFormResponse = async (id: number) => {
    return await run(async () => {
      const res = await api.get(`forms/responses/${id}`);
      return res.data;
    })
  }

  return {submitForm,getFormByNowUser,getFormResponse, loading}
}