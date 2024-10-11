function generateRandomColor() {  
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 30%)`;
}

export const Tag = ({ text }) => {
  return (
    <span className="tag" style={{ backgroundColor: generateRandomColor() }}>
      {text}
    </span>
  );
};
