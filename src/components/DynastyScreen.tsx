import React, { useEffect, ReactNode } from "react";

interface DynastyScreenProps {
    backgroundImage: string;
    children: ReactNode;
}

const DynastyScreen: React.FC<DynastyScreenProps> = ({ backgroundImage, children }) => {
    useEffect(() => {
        const layer = document.getElementById("parallax-layer");

        const handleMove = (e: MouseEvent) => {
            if (!layer) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 6;
            const y = (e.clientY / window.innerHeight - 0.5) * 6;
            layer.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden select-none">
            {/* Faded Parallax Background */}
            <div
                id="parallax-layer"
                className="absolute inset-0 bg-center bg-cover opacity-25 scale-110 transition-transform duration-200 ease-out"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />

            {/* UI Content */}
            <div className="relative z-10 flex items-center justify-center w-full h-full p-6">
                <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 max-w-3xl w-[90%] text-center border border-yellow-900/20">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DynastyScreen;
