export default function Square({ displayNumber, value, onSquareClick, isHighlighted }) {
  let highlightedStyle;
  if (isHighlighted) {
    highlightedStyle = {"backgroundColor": "#f5f580"};
  } else {
    highlightedStyle = {};
  }

  return (
    <button className="square" style={highlightedStyle} onClick={onSquareClick}>
      <span className="square-display-number">
        {displayNumber}
      </span>
      <span className="square-value">
        {value}
      </span>
    </button>
  );
}
