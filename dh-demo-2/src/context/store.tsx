import {
	createContext,
	useReducer,
	useContext,
	type ReactNode,
	useCallback,
	useEffect,
} from "react";

interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
	quantity: number;
	thumbnail: string;
}

interface CartState {
	products: Product[];
	totalPrice: number;
	totalQuantity: number;
	loading: boolean;
}

type CartAction =
	| { type: "addProduct"; payload: Product }
	| { type: "removeProduct"; payload: number }
	| { type: "updateProductQuantity"; payload: { id: number; quantity: number } }
	| { type: "setLoading"; payload: boolean }
	| { type: "emptyCart" };

const initialState: CartState = {
	products: [],
	totalPrice: 0,
	totalQuantity: 0,
	loading: false,
};

// Cada `action` puede separarse en funciones y colocarlas en otros archivos.
// Este caso es mucho más simple y considero que es mejor 
// tenerlo en el mismo archivo para un seguimiento más sencillo
const cartReducer = (state: CartState, action: CartAction): CartState => {
	switch (action.type) {
		case "addProduct": {
			const existingProduct = state.products.find(
				(p) => p.id === action.payload.id,
			);

			if (existingProduct) {
				const updatedProducts = state.products.map((p) =>
					p.id === action.payload.id ? { ...p, quantity: p.quantity + 1 } : p,
				);

				return {
					...state,
					products: updatedProducts,
					totalPrice: state.totalPrice + action.payload.price,
					totalQuantity: state.totalQuantity + 1,
				};
			}

			return {
				...state,
				products: [...state.products, { ...action.payload, quantity: 1 }],
				totalPrice: state.totalPrice + action.payload.price,
				totalQuantity: state.totalQuantity + 1,
			};
		}

		case "removeProduct": {
			const productToRemove = state.products.find(
				(p) => p.id === action.payload,
			);
			if (!productToRemove) return state;

			const updatedProducts = state.products.filter(
				(p) => p.id !== action.payload,
			);

			return {
				...state,
				products: updatedProducts,
				totalPrice:
					state.totalPrice - productToRemove.price * productToRemove.quantity,
				totalQuantity: state.totalQuantity - productToRemove.quantity,
			};
		}

		case "updateProductQuantity": {
			const updatedProducts = state.products.map((p) =>
				p.id === action.payload.id
					? { ...p, quantity: action.payload.quantity }
					: p,
			);

			const totalQuantity = updatedProducts.reduce(
				(acc, p) => acc + p.quantity,
				0,
			);

			const totalPrice = updatedProducts.reduce(
				(acc, p) => acc + p.price * p.quantity,
				0,
			);

			return {
				...state,
				products: updatedProducts,
				totalPrice,
				totalQuantity,
			};
		}

		case "setLoading":
			return {
				...state,
				loading: action.payload,
			};

		case "emptyCart":
			return {
				...initialState,
				loading: state.loading,
			};

		default:
			return state;
	}
};

const saveToLocalStorage = (state: CartState) => {
	localStorage.setItem("cart", JSON.stringify(state));
};

const loadFromLocalStorage = (): CartState => {
	const storedState = localStorage.getItem("cart");
	return storedState ? JSON.parse(storedState) : initialState;
};

// Este es el contexto global
const CartContext = createContext<{
	state: CartState;
	addProduct: (product: Product) => void;
	removeProduct: (id: number) => void;
	updateProductQuantity: (id: number, quantity: number) => void;
	setLoading: (loading: boolean) => void;
	emptyCart: () => void;
} | null>(null);

// Este es el provider que se encarga de manejar el estado global
export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(cartReducer, loadFromLocalStorage());

	const addProduct = useCallback((product: Product) => {
		dispatch({ type: "addProduct", payload: product });
	}, []);

	const removeProduct = useCallback((id: number) => {
		dispatch({ type: "removeProduct", payload: id });
	}, []);

	const updateProductQuantity = useCallback((id: number, quantity: number) => {
		dispatch({ type: "updateProductQuantity", payload: { id, quantity } });
	}, []);

	const setLoading = useCallback((loading: boolean) => {
		dispatch({ type: "setLoading", payload: loading });
	}, []);

	const emptyCart = useCallback(() => {
		dispatch({ type: "emptyCart" });
	}, []);


	// Efecto para guardar el estado en localStorage cada vez que el estado cambia
	useEffect(() => {
		saveToLocalStorage(state);
	}, [state]);

	return (
		<CartContext.Provider
			value={{
				state,
				addProduct,
				removeProduct,
				updateProductQuantity,
				setLoading,
				emptyCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

// Y esto es un hook para poder usar el contexto dónde sea que lo llamemos
// En caso de NO USARSE dentro del PROVIDER CORRECTO, se lanzará un error
export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};
