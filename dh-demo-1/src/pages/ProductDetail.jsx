import { useLoaderData } from "react-router-dom";
import { SearchInput } from "../components/search-input";
import { ProductLayout } from "../layouts/product-layout";
import { formatCurrency, replaceImgUrl } from "../utils/utils";
import { RatingStars } from "../components";

export default function ProductDetail() {
  const { description, images, price, rating, title, stock, brand } =
    useLoaderData();

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
            {images.slice(0, 3).map((image) => (
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

        <button>Comprar</button>
      </div>
    </ProductLayout>
  );
}
