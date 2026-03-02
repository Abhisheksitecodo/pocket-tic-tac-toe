import { useState, useCallback } from "react";

export type Player = "X" | "O";
export type CellValue = Player | null;
export type Board = CellValue[];

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function getWinner(board: Board): { winner: Player; line: number[] } | null {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line };
    }
  }
  return null;
}

export function useTicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const result = getWinner(board);
  const isDraw = !result && board.every(Boolean);
  const gameOver = !!result || isDraw;

  const play = useCallback(
    (index: number) => {
      if (board[index] || gameOver) return;
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const win = getWinner(newBoard);
      if (win) {
        setScores((s) => ({ ...s, [win.winner]: s[win.winner] + 1 }));
      } else if (newBoard.every(Boolean)) {
        setScores((s) => ({ ...s, draws: s.draws + 1 }));
      } else {
        setCurrentPlayer((p) => (p === "X" ? "O" : "X"));
      }
    },
    [board, currentPlayer, gameOver]
  );

  const restart = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
  }, []);

  return { board, currentPlayer, result, isDraw, gameOver, scores, play, restart };
}
