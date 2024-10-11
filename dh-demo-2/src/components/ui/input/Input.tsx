// Esto es solo un ejemplo de como podemos extender un componente nativo
// con propiedades personalizadas

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	isLoading: boolean;
	isError: boolean;
}

const Input = (props: Props) => {
	const { isLoading, isError, ...restOfProps } = props;

	return (
		<div>
			<input {...restOfProps} />
			{isLoading && <div className="spinner" />}
			{isError && <div className="error">Error</div>}
		</div>
	);
};

export default Input;
