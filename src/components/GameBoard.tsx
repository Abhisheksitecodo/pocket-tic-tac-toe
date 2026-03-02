import { motion, AnimatePresence } from "framer-motion";
import Cell from "./Cell";
import { useTicTacToe } from "@/hooks/useTicTacToe";
import { RotateCcw } from "lucide-react";

export default function GameBoard() {
  const { board, currentPlayer, result, isDraw, gameOver, scores, play, restart } = useTicTacToe();

  const statusText = result
    ? `${result.winner} wins!`
    : isDraw
    ? "It's a draw!"
    : `${currentPlayer}'s turn`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 gap-6">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-black tracking-tight"
      >
        <span className="text-x">Tic</span>
        <span className="text-muted-foreground"> • </span>
        <span className="text-o">Tac</span>
        <span className="text-muted-foreground"> • </span>
        <span className="text-foreground">Toe</span>
      </motion.h1>

      {/* Scoreboard */}
      <div className="flex gap-6 text-center">
        <div className={`px-4 py-2 rounded-lg ${currentPlayer === "X" && !gameOver ? "glow-x bg-muted" : "bg-muted/50"}`}>
          <div className="text-x font-bold text-lg">X</div>
          <div className="text-2xl font-black text-foreground">{scores.X}</div>
        </div>
        <div className="px-4 py-2 rounded-lg bg-muted/50">
          <div className="text-muted-foreground font-bold text-lg">Draw</div>
          <div className="text-2xl font-black text-foreground">{scores.draws}</div>
        </div>
        <div className={`px-4 py-2 rounded-lg ${currentPlayer === "O" && !gameOver ? "glow-o bg-muted" : "bg-muted/50"}`}>
          <div className="text-o font-bold text-lg">O</div>
          <div className="text-2xl font-black text-foreground">{scores.O}</div>
        </div>
      </div>

      {/* Status */}
      <AnimatePresence mode="wait">
        <motion.div
          key={statusText}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`text-xl font-bold ${
            result?.winner === "X" ? "text-x" : result?.winner === "O" ? "text-o" : "text-muted-foreground"
          }`}
        >
          {statusText}
        </motion.div>
      </AnimatePresence>

      {/* Board */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid grid-cols-3 gap-3 w-full max-w-[320px] sm:max-w-[360px]"
      >
        {board.map((cell, i) => (
          <Cell
            key={i}
            value={cell}
            onClick={() => play(i)}
            isWinning={result?.line.includes(i) ?? false}
            disabled={gameOver}
          />
        ))}
      </motion.div>

      {/* Restart */}
      <motion.button
        whileTap={{ scale: 0.9, rotate: -90 }}
        onClick={restart}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-muted text-foreground font-semibold
                   hover:bg-muted/80 active:bg-muted/60 transition-colors"
      >
        <RotateCcw className="w-5 h-5" />
        New Game
      </motion.button>
    </div>
  );
}
