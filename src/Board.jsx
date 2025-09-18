function Board({ squares, highlightedSquares, turnNumber, onPlay }) {
  function handleClick(cellId) {
    if (squares[cellId] || getWinner(squares)) {
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
          <Square key={cellId} value={squares[cellId]} isHighlighted={highlightedSquares[cellId]} onSquareClick={() => handleClick(cellId)} />
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

  const winner = getWinner(squares);
  const isGameOver = !squares.includes(null) || winner
  let statusMessage;

  if (isGameOver) {
    if (winner) {
      statusMessage = "Player " + winner + " wins!";
    } else {
      statusMessage = "It's a draw!"
    }
  } else {
    statusMessage = "Player Turn: " + getPlayerTurn(turnNumber);
  }

  return (
    <>
      <div className="status">{statusMessage}</div>
      {renderGrid()}
    </>
  );
}
