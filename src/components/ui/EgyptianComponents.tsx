// src/components/ui/EgyptianComponents.tsx
import React, { useState, useEffect } from 'react';
import { useEgyptianAnimations } from '../animations/EgyptianAnimationProvider';

// 3D Rotating Pyramid Navigation
export const PyramidNav: React.FC<{ items: Array<{ label: string; onClick: () => void }> }> = ({ items }) => {
    const [rotation, setRotation] = useState(0);

    return (
        <div className="relative w-64 h-64 pyramid-3d" style={{ transform: `rotateY(${rotation}deg)` }}>
            {items.map((item, i) => {
                const angle = (i / items.length) * 360;
                return (
                    <button
                        key={i}
                        onClick={item.onClick}
                        onMouseEnter={() => setRotation(angle)}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 py-4 text-primary font-bold text-xl hover-gold-glow transition-all duration-300 hover:scale-110"
                        style={{
                            transform: `rotateY(${angle}deg) translateZ(120px)`,
                        }}
                    >
                        {item.label}
                    </button>
                );
            })}
        </div>
    );
};

// Papyrus Card with Unfurl Animation
export const PapyrusCard: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), delay);
    }, [delay]);

    return (
        <div className={`papyrus-scroll p-8 rounded-lg ${isVisible ? 'animate-papyrus-unfurl' : 'opacity-0'}`}>
            {children}
        </div>
    );
};

// Mummy Wrapped Content
export const MummyWrap: React.FC<{ children: React.ReactNode; unwrap?: boolean }> = ({ children, unwrap = false }) => {
    return (
        <div className={unwrap ? 'animate-mummy-unwrap' : ''}>
            {children}
        </div>
    );
};

// Hieroglyph Explosion Button
export const HieroglyphButton: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => {
    const { triggerHieroglyphExplosion } = useEgyptianAnimations();

    const handleClick = (e: React.MouseEvent) => {
        triggerHieroglyphExplosion(e.clientX, e.clientY);
        onClick?.();
    };

    return (
        <button
            onClick={handleClick}
            className="relative px-8 py-4 bg-gradient-to-r from-primary via-yellow-500 to-primary bg-[length:200%_100%] animate-gold-shimmer text-background font-bold text-lg rounded-lg hover:scale-105 hover-curse transition-transform duration-300 shadow-[0_0_20px_rgba(218,165,32,0.5)]"
        >
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-gold-shimmer rounded-lg" />
        </button>
    );
};

// Ankh Loading Spinner
export const AnkhLoader: React.FC = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="text-6xl text-primary animate-ankh-rotate">☥</div>
        </div>
    );
};

// Scarab Badge
export const ScarabBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-900 to-teal-800 rounded-full">
            <span className="text-2xl animate-scarab-crawl">𓆣</span>
            <span className="text-primary font-semibold">{children}</span>
        </div>
    );
};

// Eye of Horus Indicator
export const EyeIndicator: React.FC<{ active?: boolean }> = ({ active = false }) => {
    return (
        <div className={`text-4xl transition-all duration-300 ${active ? 'eye-glow animate-sphinx-eyes' : 'opacity-50'}`}>
            𓁹
        </div>
    );
};

// Nile River Divider
export const NileDivider: React.FC = () => {
    return (
        <div className="w-full h-2 nile-water animate-nile-flow my-8 rounded-full" />
    );
};

// Golden Sand Progress Bar
export const SandProgress: React.FC<{ progress: number }> = ({ progress }) => {
    return (
        <div className="relative w-full h-6 bg-muted rounded-full overflow-hidden">
            <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-600 via-primary to-yellow-600 transition-all duration-500 sand-texture"
                style={{ width: `${progress}%` }}
            >
                <div className="absolute inset-0 animate-gold-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>
        </div>
    );
};

// Hieroglyphic Text Animator
export const HieroglyphText: React.FC<{ text: string; symbols?: string[] }> = ({
    text,
    symbols = ['𓂀', '𓆣', '𓇋', '☥', '𓁹']
}) => {
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[index]);
                setIndex(prev => prev + 1);
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [index, text]);

    return (
        <div className="relative">
            <span className="text-gradient-gold text-4xl font-bold">{displayText}</span>
            {index < text.length && (
                <span className="inline-block ml-2 text-4xl text-primary animate-hieroglyph-pulse">
                    {symbols[index % symbols.length]}
                </span>
            )}
        </div>
    );
};

// Torch Lit Container
export const TorchContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="relative p-8 rounded-lg">
            {/* Torch lights in corners */}
            <div className="absolute -top-4 -left-4 w-3 h-12 bg-gradient-to-t from-orange-600 via-yellow-500 to-transparent animate-flicker" />
            <div className="absolute -top-4 -right-4 w-3 h-12 bg-gradient-to-t from-orange-600 via-yellow-500 to-transparent animate-flicker" style={{ animationDelay: '0.3s' }} />
            <div className="absolute -bottom-4 -left-4 w-3 h-12 bg-gradient-to-b from-orange-600 via-yellow-500 to-transparent animate-flicker" style={{ animationDelay: '0.6s' }} />
            <div className="absolute -bottom-4 -right-4 w-3 h-12 bg-gradient-to-b from-orange-600 via-yellow-500 to-transparent animate-flicker" style={{ animationDelay: '0.9s' }} />

            <div className="relative z-10 torch-glow">
                {children}
            </div>
        </div>
    );
};

// Sphinx Guardian
export const SphinxGuardian: React.FC = () => {
    return (
        <div className="relative w-32 h-32 animate-float">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                {/* Sphinx body */}
                <path
                    d="M50 30 L70 50 L70 80 L30 80 L30 50 Z"
                    fill="hsl(40 60% 50%)"
                    className="transition-all duration-300"
                />
                {/* Head */}
                <circle cx="50" cy="30" r="15" fill="hsl(40 60% 50%)" />
                {/* Eyes */}
                <circle cx="45" cy="28" r="2" fill="hsl(45 95% 55%)" className="animate-sphinx-eyes" />
                <circle cx="55" cy="28" r="2" fill="hsl(45 95% 55%)" className="animate-sphinx-eyes" />
                {/* Crown */}
                <path d="M35 25 L50 15 L65 25" stroke="hsl(45 95% 55%)" strokeWidth="2" fill="none" />
            </svg>
        </div>
    );
};

// Golden Cartouche Frame
export const Cartouche: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="relative inline-block">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                <path
                    d="M20 10 L180 10 C190 10 190 20 190 50 C190 80 190 90 180 90 L20 90 C10 90 10 80 10 50 C10 20 10 10 20 10 Z"
                    fill="none"
                    stroke="hsl(45 95% 55%)"
                    strokeWidth="3"
                />
            </svg>
            <div className="relative z-10 px-8 py-4">
                {children}
            </div>
        </div>
    );
};

// Sand Clock Timer
export const SandClock: React.FC<{ seconds: number }> = ({ seconds }) => {
    const [remaining, setRemaining] = useState(seconds);

    useEffect(() => {
        if (remaining > 0) {
            const timer = setTimeout(() => setRemaining(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [remaining]);

    const progress = (remaining / seconds) * 100;

    return (
        <div className="relative w-24 h-32">
            {/* Hourglass shape */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-16 h-12 border-2 border-primary rounded-t-full" />
                <div className="w-4 h-2 bg-primary" />
                <div className="w-16 h-12 border-2 border-primary rounded-b-full relative overflow-hidden">
                    <div
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-yellow-600 to-primary transition-all duration-1000 sand-texture"
                        style={{ height: `${progress}%` }}
                    />
                </div>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-primary font-bold">
                {remaining}s
            </div>
        </div>
    );
};