import { useLoaderData, useSearchParams } from "react-router-dom";
import { Tag } from "../components/ui/tag";
import { ProductCard } from "../components/product-card";
import { ProductLayout } from "../layouts/product-layout";
import { SearchInput } from "../components";

export default function List() {
	const { products, limit, skip, total } = useLoaderData();
	const [searchParams] = useSearchParams();
	const search = `${searchParams.get("search")}`;

	const resultMessage = search
		? `Resultados de la búsqueda: "${search}" - ${total}`
		: `Todos los resultados (${total})`;

	console.log(search);

	// Agrupo las categorias que tengan el mismo nombre
	const groupedCategories = products.reduce((acc, product) => {
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
				{products.map((product) => (
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
