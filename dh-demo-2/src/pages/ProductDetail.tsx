import { useLoaderData } from "react-router-dom";
import { SearchInput } from "@/components/search-input";
import { ProductLayout } from "@/layouts/product-layout";
import { formatCurrency, replaceImgUrl } from "../utils";
import { RatingStars } from "@/components/rating-stars";
import { useCart } from "@/context/store";

export default function ProductDetail() {
	const { description, images, price, rating, title, stock, brand } =
		useLoaderData() as Product;

	const product = useLoaderData();

	const { addProduct } = useCart();

	return (
		<ProductLayout>
			<SearchInput />

			<div className="pdp">
				<h1>
					<span className="pdp-product_name">{title}</span> -{" "}
					<span>{brand}</span>
				</h1>

				<figure className="pdp-images_wrapper">
					<img
						className="pdp-main-image"
						src={replaceImgUrl(images[0])}
						alt={title}
						title={title}
						width="250"
						height="248"
					/>
					<ul className="pdp-images-list">
						{images.slice(0, 3).map((image: string) => (
							<li key={image}>
								<img
									src={replaceImgUrl(image)}
									alt={title}
									title={title}
									loading="lazy"
								/>
							</li>
						))}
					</ul>
				</figure>

				<div className="pdp-info">
					<div className="pdp-price">
						{formatCurrency(price)} <RatingStars rating={rating} />
					</div>
					<p className="pdp-stock">Disponibles: {stock} un.</p>
					<p className="pdp-description">{description}</p>
				</div>

				<button
					type="button"
					onClick={() => addProduct({ ...product, quantity: 1 })}
				>
					Comprar
				</button>
			</div>
		</ProductLayout>
	);
}
