import { motion } from "framer-motion";
import type { CellValue } from "@/hooks/useTicTacToe";

interface CellProps {
  value: CellValue;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

const XMark = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 sm:w-14 sm:h-14">
    <motion.line
      x1="16" y1="16" x2="48" y2="48"
      stroke="hsl(160, 84%, 50%)" strokeWidth="6" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 0.3 }}
    />
    <motion.line
      x1="48" y1="16" x2="16" y2="48"
      stroke="hsl(160, 84%, 50%)" strokeWidth="6" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    />
  </svg>
);

const OMark = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 sm:w-14 sm:h-14">
    <motion.circle
      cx="32" cy="32" r="18" fill="none"
      stroke="hsl(270, 60%, 60%)" strokeWidth="6" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 0.4 }}
    />
  </svg>
);

export default function Cell({ value, onClick, isWinning, disabled }: CellProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={!disabled && !value ? { scale: 0.9 } : {}}
      className={`
        aspect-square rounded-xl bg-cell flex items-center justify-center
        transition-colors duration-150
        ${!value && !disabled ? "hover:bg-cell-hover active:bg-cell-hover cursor-pointer" : "cursor-default"}
        ${isWinning ? "glow-win ring-2 ring-accent" : ""}
      `}
    >
      {value === "X" && <XMark />}
      {value === "O" && <OMark />}
    </motion.button>
  );
}
