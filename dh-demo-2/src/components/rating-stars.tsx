import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export const RatingStars = ({ rating }: { rating: number }) => {
	const fullStars = Math.floor(rating);
	const isHalfStar = rating % 1 !== 0;

	const starsArray = [
		...Array(fullStars).fill(<FaStar />),
		isHalfStar && <FaStarHalfAlt />,
		...Array(5 - Math.ceil(rating)).fill(<FaRegStar />),
	];

	console.log(starsArray);

	return (
		<div className="rating-stars">
			{starsArray.map((star) => (
				<span key={star} className="star">
					{star}
				</span>
			))}
		</div>
	);
};
