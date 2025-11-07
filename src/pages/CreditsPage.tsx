import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const contributors = [
    "Eyad Ahmed Fouad",
    "Ahmed Nasr",
    "Adham Ahmed",
    "Omar Haitham",
    "Amr Hanafi",
    "Eyad Ahmed Hassanien",
    "Fatima Tamer",
    "Roqaia Ahmed",
    "Jana Hisham",
    "Sogoud Samir",
    "Habiba Moustafa"
];

const CreditsPage = () => {
    const [isAnimating, setIsAnimating] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setIsAnimating(false), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12 text-center relative overflow-hidden"
            style={{
                backgroundImage: "url('/textures/papyrus.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Torchlight Flicker */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.05),transparent_70%)] animate-flicker" />
            </div>

            {/* Hieroglyph Drift */}
            <span className="absolute text-3xl text-yellow-700 opacity-20 animate-hiero top-10 left-10">𓂀</span>
            <span className="absolute text-4xl text-yellow-600 opacity-20 animate-hiero bottom-12 right-16">𓆣</span>

            {/* Scroll Reveal Container */}
            <div
                className="transition-transform transition-opacity duration-1000 ease-out origin-top z-10"
                style={{
                    transform: isAnimating ? "scaleY(0.8)" : "scaleY(1)",
                    opacity: isAnimating ? 0 : 1,
                }}
            >
                {/* Cartouche Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-yellow-700 border-4 border-yellow-700 px-6 py-3 rounded-full tracking-widest shadow-md mb-6">
                    الشكر والتقدير
                </h1>

                {/* Decorative Divider */}
                <div className="flex justify-center items-center gap-3 text-2xl text-yellow-600 mb-6">
                    <span>𓊃</span>
                    <div className="h-0.5 w-16 rounded-full bg-yellow-600" />
                    <span>𓊃</span>
                </div>

                {/* Message */}
                <p className="text-lg md:text-xl max-w-2xl text-muted-foreground leading-relaxed mb-8">
                    هذا المشروع مستوحى من عظمة الحضارة المصرية القديمة، وقد تم تطويره بروح التعاون والإبداع.
                    نتقدم بجزيل الشكر لكل من ساهم في إنجاحه.
                </p>

                {/* Teacher Highlight */}
                <div className="my-10 flex flex-col items-center">
                    <div className="flex items-center gap-4 text-4xl md:text-5xl font-extrabold text-yellow-700 animate-glow">
                        <span>𓂀</span>
                        <span className="px-6 py-3 border-4 border-yellow-700 rounded-full shadow-lg bg-yellow-50 glowy-gold">
                            Ms. Hager Eldeeb
                        </span>

                        <span>𓂀</span>
                    </div>
                    <p className="mt-4 text-lg text-yellow-800 font-semibold">
                        معلمتنا الفاضلة
                    </p>
                </div>


                {/* Contributors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-semibold text-yellow-800">
                    {contributors.map((name, index) => {
                        const isGlowy = name === "Eyad Ahmed Fouad" || name === "Adham Ahmed" || name === "Ahmed Nasr" || name === "Fatima Tamer";
                        return (
                            <span
                                key={index}
                                className={isGlowy ? "glowy-gold" : "animate-glow"}
                            >
                                {name}
                            </span>
                        );
                    })}
                </div>


                {/* Return Button */}
                <div className="mt-12">
                    <button
                        onClick={() => navigate("/")}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-700 text-white font-semibold shadow-md hover:bg-yellow-800 transition"
                    >
                        <Home className="w-5 h-5" />
                        العودة للرئيسية
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-6 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} جميع الحقوق محفوظة</p>
                </div>
            </div>
        </div>
    );
};

export default CreditsPage;
