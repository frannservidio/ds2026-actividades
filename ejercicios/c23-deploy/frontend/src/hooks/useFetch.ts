import { apiFetch } from "../services/api";
import { useEffect, useState } from "react";

type UseFetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

function useFetch<T>(url: string): UseFetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function obtenerDatos() {
      try {
        setLoading(true);
        setError(null);

        const resultado = await apiFetch<T>(url, { signal: controller.signal });
        setData(resultado);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Ocurrio un error inesperado al cargar los datos.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    obtenerDatos();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
