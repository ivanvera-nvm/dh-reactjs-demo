// Convierte un valor numérico en formato de moneda ARS
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(value);
};

export const replaceImgUrl = (url) => {
  const path = new URL(url).pathname.replace(
    "/data/products",
    "/product-images"
  );
  return `https://cdn.dummyjson.com${path}`;
};
