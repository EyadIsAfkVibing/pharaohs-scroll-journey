import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EgyptianButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const EgyptianButton = ({
  onClick,
  children,
  variant = "primary",
  icon,
  className,
  disabled = false,
}: EgyptianButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative overflow-hidden px-8 py-6 text-lg font-bold transition-all duration-300",
        "border-2 hover:scale-105 active:scale-95",
        variant === "primary" && [
          "bg-primary text-primary-foreground",
          "border-primary",
          "shadow-[0_0_20px_hsl(var(--primary)/0.3)]",
          "hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)]",
        ],
        variant === "secondary" && [
          "bg-secondary text-secondary-foreground",
          "border-secondary",
          "shadow-[0_0_20px_hsl(var(--secondary)/0.2)]",
          "hover:shadow-[0_0_40px_hsl(var(--secondary)/0.4)]",
        ],
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
      </span>
    </Button>
  );
};
