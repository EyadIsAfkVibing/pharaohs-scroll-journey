// src/components/animations/AncientAnimationProvider.tsx
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface AnimationContextType {
    triggerScrollUnroll: () => void;
    triggerRoyalSeal: (x: number, y: number) => void;
    triggerInkReveal: (element: HTMLElement) => void;
    isTransitioning: boolean;
}

const AnimationContext = createContext<AnimationContextType>({
    triggerScrollUnroll: () => { },
    triggerRoyalSeal: () => { },
    triggerInkReveal: () => { },
    isTransitioning: false,
});

export const useAncientAnimations = () => useContext(AnimationContext);

interface SandParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    drift: number;
}

interface RoyalSeal {
    x: number;
    y: number;
    scale: number;
    opacity: number;
    rotation: number;
}

interface Props {
    children: React.ReactNode;
}

export const AncientAnimationProvider = ({ children }: Props) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const [sealAnimation, setSealAnimation] = useState<RoyalSeal | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sandParticlesRef = useRef<SandParticle[]>([]);
    const animationFrameRef = useRef<number>();
    const shadowTimeRef = useRef(0);
    const heatWaveTimeRef = useRef(0);

    const location = useLocation();

    // Initialize ultra-slow sand drift
    useEffect(() => {
        const particles: SandParticle[] = [];
        for (let i = 0; i < 40; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: 0.1 + Math.random() * 0.2, // Ultra slow
                vy: 0.05 + Math.random() * 0.1,
                size: 1 + Math.random() * 2,
                opacity: 0.02 + Math.random() * 0.05, // Almost invisible
                drift: Math.random() * Math.PI * 2,
            });
        }
        sandParticlesRef.current = particles;
    }, []);

    // Parallax mouse tracking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Scroll Unroll page transition
    useEffect(() => {
        triggerScrollUnroll();
    }, [location.pathname]);

    const triggerScrollUnroll = () => {
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), 1800);
    };

    const triggerRoyalSeal = (x: number, y: number) => {
        setSealAnimation({ x, y, scale: 0, opacity: 1, rotation: 0 });

        // Play deep thud sound
        const audio = new Audio();
        audio.volume = 0.3;
        // Would need actual sound file

        setTimeout(() => setSealAnimation(null), 1000);
    };

    const triggerInkReveal = (element: HTMLElement) => {
        element.style.animation = 'inkBrush 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
    };

    // Main animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const updateSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        updateSize();
        window.addEventListener('resize', updateSize);

        let time = 0;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.016; // ~60fps

            // 1. Ultra-slow sand drift
            sandParticlesRef.current.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.drift += 0.001;

                // Drift effect
                const driftX = Math.sin(particle.drift) * 0.3;
                const driftY = Math.cos(particle.drift) * 0.3;

                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y > canvas.height) particle.y = 0;

                ctx.fillStyle = `rgba(194, 145, 22, ${particle.opacity})`;
                ctx.beginPath();
                ctx.arc(particle.x + driftX, particle.y + driftY, particle.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // 2. Heat mirage distortion (very subtle)
            if (time - heatWaveTimeRef.current > 6) {
                heatWaveTimeRef.current = time;
                const waveHeight = canvas.height * 0.6;
                const imageData = ctx.getImageData(0, waveHeight, canvas.width, canvas.height - waveHeight);

                for (let y = 0; y < imageData.height; y++) {
                    const distortion = Math.sin((y / 20) + time) * 1.5;
                    for (let x = 0; x < imageData.width; x++) {
                        const sourceX = Math.floor(x + distortion);
                        if (sourceX >= 0 && sourceX < imageData.width) {
                            const sourceIndex = (y * imageData.width + sourceX) * 4;
                            const targetIndex = (y * imageData.width + x) * 4;
                            imageData.data[targetIndex] = imageData.data[sourceIndex];
                            imageData.data[targetIndex + 1] = imageData.data[sourceIndex + 1];
                            imageData.data[targetIndex + 2] = imageData.data[sourceIndex + 2];
                        }
                    }
                }
                ctx.putImageData(imageData, 0, waveHeight);
            }

            // 3. Royal Seal animation
            if (sealAnimation) {
                const progress = Math.min((Date.now() % 1000) / 1000, 1);
                const scale = progress < 0.3 ? progress * 3 : 1 - (progress - 0.3) * 1.4;
                const opacity = progress < 0.5 ? 1 : 1 - (progress - 0.5) * 2;

                ctx.save();
                ctx.translate(sealAnimation.x, sealAnimation.y);
                ctx.scale(scale, scale);
                ctx.globalAlpha = opacity;

                // Draw wax seal
                ctx.fillStyle = '#8B0000';
                ctx.beginPath();
                ctx.arc(0, 0, 40, 0, Math.PI * 2);
                ctx.fill();

                // Seal pattern
                ctx.fillStyle = '#FFD700';
                ctx.font = 'bold 32px serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('𓂀', 0, 0);

                ctx.restore();
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            window.removeEventListener('resize', updateSize);
        };
    }, [sealAnimation]);

    // Parallax calculations
    const parallaxStyle = {
        midground: {
            transform: `translate(${(mousePos.x - 0.5) * 20}px, ${(mousePos.y - 0.5) * 20}px)`,
        },
        background: {
            transform: `translate(${(mousePos.x - 0.5) * 40}px, ${(mousePos.y - 0.5) * 40}px) scale(1.1)`,
        },
    };

    return (
        <AnimationContext.Provider value={{
            triggerScrollUnroll,
            triggerRoyalSeal,
            triggerInkReveal,
            isTransitioning
        }}>
            {/* Canvas for effects */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-[100]"
            />

            {/* Torch lighting effect */}
            <div className="fixed inset-0 pointer-events-none z-[90]">
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60 animate-torch-flicker-slow" />
            </div>

            {/* Slow shadow crawl */}
            <div className="fixed inset-0 pointer-events-none z-[85] overflow-hidden">
                <div className="absolute -left-full top-0 w-[200%] h-full bg-gradient-to-r from-transparent via-black/30 to-transparent animate-shadow-crawl" />
            </div>

            {/* Parallax background layer */}
            <div
                className="fixed inset-0 -z-10 transition-transform duration-300 ease-out"
                style={parallaxStyle.background}
            />

            {/* Parallax midground layer (hieroglyphs) */}
            <div
                className="fixed inset-0 pointer-events-none z-[5] transition-transform duration-200 ease-out"
                style={parallaxStyle.midground}
            >
                {['𓂀', '𓆣', '𓇋', '☥', '𓁹', '𓆃'].map((symbol, i) => (
                    <div
                        key={i}
                        className="absolute text-primary/5 text-9xl animate-hieroglyph-glow-pulse"
                        style={{
                            left: `${10 + i * 15}%`,
                            top: `${20 + (i % 3) * 30}%`,
                            animationDelay: `${i * 5}s`,
                            animationDuration: '5s',
                        }}
                    >
                        {symbol}
                    </div>
                ))}
            </div>

            {/* Scroll unroll transition */}
            {isTransitioning && (
                <div className="fixed inset-0 z-[105] pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-orange-950/40 to-background animate-scroll-unroll" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="text-8xl text-primary animate-seal-stamp drop-shadow-[0_0_30px_rgba(218,165,32,0.8)]">
                            𓂀
                        </div>
                    </div>
                </div>
            )}

            {children}
        </AnimationContext.Provider>
    );
};