import { formatCurrency, replaceImgUrl } from "../utils/utils";
import { RatingStars } from "./rating-stars";

export const ProductCard = ({ data }) => {
  const { title, price, description,thumbnail, rating } = data;

  return (
    <article className="product-card">
      <figure className="pc-image_wrapper">
        <img src={replaceImgUrl(thumbnail)} alt={title} title={title} width={124} height={124} loading="lazy" />
      </figure>
      <div className="pc-info_wrapper">
        <h3 className="pc-title">{title}</h3>
        <p className="pc-description">{description}</p>
        <div>
            <p className="pc-price">{formatCurrency(price)}</p>
            <RatingStars rating={rating}/>
        </div>
      </div>
    </article>
  );
};
