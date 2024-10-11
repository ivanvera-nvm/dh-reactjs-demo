export const ProductLayout = ({ children }) => {
  return (
    <main className="container">
      <a href="/" id="back-to-home">Volver al inicio</a>
      {children}
    </main>
  );
};
