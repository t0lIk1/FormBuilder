import api from "src/api/axios";
import {useAsync} from "src/api/useAsync.ts";


type AdminAction = "delete" | "block" | "toggle-role" | "unblock";

export const useAdmin = () => {
  const {run} = useAsync();


  const adminAction = async (type: AdminAction, ids: number[]) => {
    return await run(async () => {
      switch (type) {
        case 'delete':
          return await api.delete(`/users/delete`, {data: {ids}});
        case 'block':
          return await api.put('/users/block', {ids});
        case 'unblock':
          return await api.put('/users/unblock', {ids});
        case 'toggle-role':
          return await api.put('/users/admin/toggle-roles', {ids});
        default:
          return false
      }
    });
  };

  return {adminAction};
};