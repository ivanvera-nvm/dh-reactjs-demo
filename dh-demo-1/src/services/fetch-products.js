const BASE_URL =
  "https://aws.e-cruce.com/cruce/digital/api";

export async function fetchProducts(search) {
  const url = new URL(`${BASE_URL}/items`);
  url.searchParams.set("q", search);

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(5000) });

    if (!response.ok) {
      throw new Error("Ocurrió un error al buscar los productos");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("La búsqueda tardó demasiado tiempo");
      return;
    }
    console.log("Ocurrió un error al buscar los productos", err);
  }
}

export async function fetchProductById(id) {
  const url = new URL(`${BASE_URL}/items/${id}`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Ocurrió un error al buscar el producto");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("La búsqueda tardó demasiado tiempo");
      return;
    }
    console.log("Ocurrió un error al buscar el producto", err);
  }
}
