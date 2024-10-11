// import { useEffect, useState } from "react";

// const BASE_URL =
//   "https://digitalhouse-backend-abril-2024.onrender.com/api/items";

// export async function fetchProducts(url) {
//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error("Ocurrió un error al buscar los productos");
//     }

//     const data = await response.json();
//     return data;
//   } catch (err) {
//     if (err.name === "AbortError") {
//       console.log("La búsqueda tardó demasiado tiempo");
//       return;
//     }
//     console.log("Ocurrió un error al buscar los productos", err);
//   }
// }

// export const useSearchProducts = (search) => {
//   const url = new URL(BASE_URL);
//   url.searchParams.set("q", search);

//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (search === null) return;

//     setIsLoading(true);

//     fetchProducts(url)
//       .then(setProducts)
//       .catch(setError)
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, [search]);

//   return {
//     products,
//     isLoading,
//     error,
//   };
// };
