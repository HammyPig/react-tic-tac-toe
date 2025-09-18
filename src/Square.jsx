export default function Square({ displayNumber, value, onSquareClick, isHighlighted }) {
  let highlightedStyle;
  if (isHighlighted) {
    highlightedStyle = {"backgroundColor": "yellow"};
  } else {
    highlightedStyle = {};
  }

  return (
    <button className="square" style={highlightedStyle} onClick={onSquareClick}>
      <span className="square-display-number">
        {displayNumber}
      </span>
      {value}
    </button>
  );
}
