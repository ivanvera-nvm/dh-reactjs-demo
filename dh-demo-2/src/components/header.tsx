import { useCart } from "@/context/store";
import { formatCurrency } from "@/utils";
import { IoCart, IoTrash } from "react-icons/io5";

const Header = () => {
	const { state, emptyCart } = useCart();

	const totalItems = state.totalQuantity;
	const totalPrice = state.totalPrice;

	return (
		<div style={{ margin: "1.5rem 0", borderBottom: "1px solid silver" }}>
			<div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
				<IoCart />
				<span>Cantidad: {totalItems}</span>
				<span>Precio: {formatCurrency(totalPrice)}</span>
				<button type="button" className="secondary" onClick={emptyCart}>
					<IoTrash />
				</button>
			</div>
		</div>
	);
};

export default Header;
