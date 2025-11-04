import { cn } from "@/lib/utils";

interface FloatingHieroglyphProps {
  symbol: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  delay?: number;
}

export const FloatingHieroglyph = ({
  symbol,
  position,
  delay = 0,
}: FloatingHieroglyphProps) => {
  const positionClasses = {
    "top-left": "top-8 left-8",
    "top-right": "top-8 right-8",
    "bottom-left": "bottom-8 left-8",
    "bottom-right": "bottom-8 right-8",
  };

  return (
    <div
      className={cn(
        "fixed text-6xl opacity-20 animate-float pointer-events-none z-0",
        "text-primary",
        positionClasses[position]
      )}
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {symbol}
    </div>
  );
};
