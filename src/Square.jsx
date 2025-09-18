export default function Square({ value, onSquareClick, isHighlighted }) {
  let highlightedStyle;
  if (isHighlighted) {
    highlightedStyle = {"backgroundColor": "yellow"};
  } else {
    highlightedStyle = {};
  }

  return (
    <button className="square" style={highlightedStyle} onClick={onSquareClick}>
      {value}
    </button>
  );
}
