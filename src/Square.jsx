export default function Square({ displayNumber, value, onSquareClick, isHighlighted }) {
  let className = "square";
  if (isHighlighted) {
    className += " square-highlighted";
  }

  return (
    <button className={className} onClick={onSquareClick}>
      <span className="square-display-number">
        {displayNumber}
      </span>
      <span className="square-value">
        {value}
      </span>
    </button>
  );
}
