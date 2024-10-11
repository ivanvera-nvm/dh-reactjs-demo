// Convierte un valor numérico en formato de moneda ARS
export const formatCurrency = (value: number) => {
	return new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
		minimumFractionDigits: 0,
	}).format(value);
};

export const replaceImgUrl = (url: string) => {
	const path = new URL(url).pathname.replace("/data/products", "/icon");

	// reemplazo el último numero por 150
	// viene asi: /8/1 quito el /1 y le pongo /150
	const last = `${path.split("/").slice(0, -1).join("/")}/350`;

	return `https://dummyjson.com${last}`;
};
