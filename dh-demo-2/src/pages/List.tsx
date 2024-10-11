import { useLoaderData, useSearchParams } from "react-router-dom";
import { Tag } from "@/components/ui/tag";
import { ProductCard } from "../components/product-card";
import { ProductLayout } from "@/layouts/product-layout";
import { SearchInput } from "@/components/search-input";

export default function List() {
	const { products, total } = useLoaderData();
	const [searchParams] = useSearchParams();
	const search = `${searchParams.get("search")}`;

	const resultMessage = search
		? `Resultados de la búsqueda: "${search}" - ${total}`
		: `Todos los resultados (${total})`;

	console.log(search);

	// Agrupo las categorias que tengan el mismo nombre
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const groupedCategories = products.reduce((acc: any, product: Product) => {
		if (!acc[product.category]) {
			acc[product.category] = 0;
		}

		acc[product.category]++;
		return acc;
	}, {});

	if (!products.length) {
		return (
			<ProductLayout>
				<SearchInput />
				<p className="result-message">
					No se encontraron resultados para la búsqueda
				</p>
			</ProductLayout>
		);
	}

	return (
		<ProductLayout>
			<div className="results-info">
				<SearchInput />
				<p className="result-message">{resultMessage}</p>
				<ul className="result-tags">
					{Object.entries(groupedCategories).map(([category, count]) => (
						<li key={category} className="result-item">
							<Tag text={`${category} - ${count}`} />
						</li>
					))}
				</ul>
			</div>

			<ul className="list">
				{products.map((product: Product) => (
					<li key={product.id}>
						<a href={`/items/${product.id}`} aria-label={product.title}>
							<ProductCard data={product} />
						</a>
					</li>
				))}
			</ul>
		</ProductLayout>
	);
}
