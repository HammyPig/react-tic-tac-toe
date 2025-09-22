import * as gameUtils from "./gameUtils";
import Square from "./Square";

export default function Board({ squares, highlightedSquares, turnNumber, onPlay }) {
  function handleClick(cellId) {
    if (squares[cellId] || gameUtils.getWinner(squares)) {
      return;
    }

    onPlay(cellId);
  }

  function renderGrid() {
    const grid = [];
    const nRows = Math.sqrt(squares.length);
    const nCols = nRows;

    for (let r = 0; r < nRows; r++) {
      const row = [];

      for (let c = 0; c < nCols; c++) {
        const cellId = r * nCols + c;
        row.push(
          <Square
            key={cellId}
            displayNumber={gameUtils.getCellDisplayNumber(cellId)}
            value={squares[cellId]}
            isHighlighted={highlightedSquares[cellId]}
            onSquareClick={() => handleClick(cellId)}
          />
        );
      }

      grid.push(
        <div key={r} className="board-row">
          {row}
        </div>
      );
    }
    
    return grid;
  }

  return (
    <div className="game-board">
      <div className="game-border">
        {renderGrid()}
      </div>
    </div>
  )
}
