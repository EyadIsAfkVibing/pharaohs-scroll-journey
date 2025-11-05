// src/components/ui/DynastyCard.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEgyptianAnimations } from '../animations/EgyptianAnimationProvider';

interface DynastyCardProps {
    id: number;
    name: string;
    period: string;
    description: string;
    pharaohs?: number;
    monuments?: string[];
    index: number;
}

export const DynastyCard = ({
    id,
    name,
    period,
    description,
    pharaohs = 0,
    monuments = [],
    index
}: DynastyCardProps) => {
    const navigate = useNavigate();
    const { triggerHieroglyphExplosion, triggerSandVortex } = useEgyptianAnimations();
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        triggerHieroglyphExplosion(e.clientX, e.clientY);
        setIsPressed(true);

        setTimeout(() => {
            triggerSandVortex();
            setTimeout(() => {
                navigate(`/dynasty/${id}`);
            }, 600);
        }, 200);
    };

    // Different hieroglyph symbols for variety
    const symbols = ['𓂀', '𓆣', '𓇋', '☥', '𓁹', '𓆃'];
    const cardSymbol = symbols[index % symbols.length];

    return (
        <div
            className="group relative"
            style={{
                animation: `float-in 0.8s ease-out forwards`,
                animationDelay: `${index * 0.15}s`,
                opacity: 0,
            }}
        >
            {/* Animated Border Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 rounded-2xl animate-gradient-x" />

            {/* Main Card */}
            <div
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
          relative cursor-pointer overflow-hidden rounded-2xl
          bg-gradient-to-br from-card via-card/95 to-background
          border-2 border-border/50
          transition-all duration-500
          ${isPressed ? 'scale-95' : isHovered ? 'scale-105 -translate-y-2' : 'scale-100'}
          ${isHovered ? 'shadow-[0_20px_60px_-15px_rgba(218,165,32,0.5)]' : 'shadow-xl'}
        `}
            >
                {/* Papyrus Texture Overlay */}
                <div className="absolute inset-0 opacity-5 mix-blend-overlay papyrus-texture" />

                {/* Animated Background Hieroglyph */}
                <div className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          text-[200px] text-primary/5 select-none pointer-events-none
          transition-all duration-700
          ${isHovered ? 'scale-125 rotate-180 opacity-10' : 'scale-100 rotate-0 opacity-5'}
        `}>
                    {cardSymbol}
                </div>

                {/* Top Decorative Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                {/* Card Content */}
                <div className="relative p-8 space-y-6">
                    {/* Header with Symbol */}
                    <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-3">
                                <div className={`
                  text-5xl transition-all duration-500
                  ${isHovered ? 'animate-pulse text-primary scale-110' : 'text-primary/70'}
                `}>
                                    {cardSymbol}
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-gradient-gold">
                                        {name}
                                    </h3>
                                    <p className="text-accent text-sm font-medium tracking-wider">
                                        {period}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Dynasty Number Badge */}
                        <div className="relative">
                            <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg animate-pulse" />
                            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border-2 border-primary/50">
                                <span className="text-2xl font-bold text-background">{id}</span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-lg leading-relaxed min-h-[80px]">
                        {description}
                    </p>

                    {/* Stats Section */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border/30">
                        {pharaohs > 0 && (
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">👑</span>
                                <div>
                                    <p className="text-xs text-muted-foreground">فراعنة</p>
                                    <p className="text-lg font-bold text-primary">{pharaohs}</p>
                                </div>
                            </div>
                        )}

                        {monuments.length > 0 && (
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🏛️</span>
                                <div>
                                    <p className="text-xs text-muted-foreground">معالم</p>
                                    <p className="text-lg font-bold text-primary">{monuments.length}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Monuments Preview */}
                    {monuments.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-xs text-muted-foreground">معالم بارزة:</p>
                            <div className="flex flex-wrap gap-2">
                                {monuments.slice(0, 3).map((monument, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/30"
                                    >
                                        {monument}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA Button */}
                    <div className={`
            relative overflow-hidden rounded-xl
            transition-all duration-300
            ${isHovered ? 'shadow-[0_0_30px_rgba(218,165,32,0.4)]' : ''}
          `}>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-90" />
                        <div className={`
              absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent
              ${isHovered ? 'animate-shimmer' : 'translate-x-[-200%]'}
            `} />
                        <button className="relative w-full py-4 text-background font-bold text-lg tracking-wide hover:tracking-wider transition-all">
                            استكشف الأسرة ←
                        </button>
                    </div>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/30" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/30" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/30" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/30" />
            </div>
        </div>
    );
};