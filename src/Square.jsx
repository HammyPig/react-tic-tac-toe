export default function Square({ id, value, onSquareClick, isHighlighted }) {
  let highlightedStyle;
  if (isHighlighted) {
    highlightedStyle = {"backgroundColor": "yellow"};
  } else {
    highlightedStyle = {};
  }

  return (
    <button className="square" style={highlightedStyle} onClick={onSquareClick}>
      <span className="cell-id">
        {id}
      </span>
      {value}
    </button>
  );
}
