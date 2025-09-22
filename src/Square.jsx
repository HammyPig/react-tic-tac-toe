export default function Square({ displayNumber, value, onSquareClick, isHighlighted, isDisabled }) {
  let className = "square";
  if (isHighlighted) {
    className += " square-highlighted";
  }

  return (
    <button className={className} onClick={onSquareClick} disabled={value || isDisabled}>
      <span className="square-display-number">
        {displayNumber}
      </span>
      <span className="square-value">
        {value}
      </span>
    </button>
  );
}
