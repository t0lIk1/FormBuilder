import {useContext, useState} from "react";
import {NotificationContext} from "src/context/NotificationContext.tsx";

export const useAsync = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useContext(NotificationContext);

  const run = async <T>(callback: () => Promise<T>): Promise<T | undefined> => {
    setLoading(true);
    setError(null);
    try {
      return await callback();
    } catch (err: any) {
      showNotification(err?.response?.data?.message || err.message || "Что-то пошло не так")
      setError(err?.response?.data?.message || err.message || "Что-то пошло не так");
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return { run, loading, error };
};
