import Header from "@/components/header";

type Props = {
	children: React.ReactNode;
};

export const ProductLayout = (props: Props) => {
	const { children } = props;

	return (
		<main className="container">
			<Header />
			<a href="/" id="back-to-home">
				Volver al inicio
			</a>
			{children}
		</main>
	);
};
