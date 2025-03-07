import { useQuery } from "@tanstack/react-query";

// Definición de la función para obtener las configuraciones
const fetchConfigurations = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/configuracion/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener configuraciones");
  }

  const data = await response.json();
  console.log("Configuraciones recibidas:", data); // 🔍 Verifica que sea un array

  if (!Array.isArray(data)) {
    throw new Error("La respuesta de la API no es un array.");
  }

  return data;
};

// Exportar la función useFetchConfigurations correctamente
export const useFetchConfigurations = () => {
  return useQuery({
    queryKey: ["configurations"],
    queryFn: fetchConfigurations,
    staleTime: 1000 * 60 * 5, // 5 minutos antes de volver a hacer fetch
    cacheTime: 1000 * 60 * 10, // 10 minutos en caché
    retry: 2, // Reintentar 2 veces en caso de error
  });
};
