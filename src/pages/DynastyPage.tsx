import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { dynasties } from "@/data/dynasties";
import { EgyptianButton } from "@/components/EgyptianButton";
import { FloatingHieroglyph } from "@/components/FloatingHieroglyph";
import { ChevronRight, ChevronLeft, Home } from "lucide-react";

const DynastyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Hooks inside the component
  const [isAnimating, setIsAnimating] = useState(true);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 12;
      setParallax({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation effect
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
  }, [id]);

  const dynastyId = parseInt(id || "1");
  const dynasty = dynasties.find((d) => d.id === dynastyId);
  const isFirst = dynastyId === 1;
  const isLast = dynastyId === dynasties.length;

  if (!dynasty) {
    navigate("/");
    return null;
  }

  const handleNext = () => {
    if (!isLast) navigate(`/dynasty/${dynastyId + 1}`);
  };

  const handlePrevious = () => {
    if (!isFirst) navigate(`/dynasty/${dynastyId - 1}`);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Scene (faded + blur + parallax) */}
      <div
        className="fixed inset-0 -z-10 overflow-hidden"
        style={{
          backgroundImage: `url(${dynasty.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          opacity: 0.3,
          transform: `translate(${parallax.x}px, ${parallax.y}px) scale(1.08)`,
          transition: "transform 120ms ease-out",
          willChange: "transform",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Floating Hieroglyphs */}
      <FloatingHieroglyph symbol="𓂀" position="top-left" delay={0} />
      <FloatingHieroglyph symbol="𓆣" position="top-right" delay={0.5} />
      <FloatingHieroglyph symbol="𓁢" position="bottom-left" delay={1} />
      <FloatingHieroglyph symbol="𓃭" position="bottom-right" delay={1.5} />

      {/* Content Container */}
      <div className="relative min-h-screen flex flex-col">
        {/* Header with Home Button */}
        <header className="p-6">
          <EgyptianButton
            onClick={() => navigate("/")}
            variant="secondary"
            className="text-sm py-3 px-6"
            icon={<Home className="w-4 h-4" />}
          >
            العودة للرئيسية
          </EgyptianButton>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div
            className={`max-w-4xl w-full transition-all duration-800 ${isAnimating
              ? "opacity-0 translate-y-10"
              : "opacity-100 translate-y-0"
              }`}
          >
            {/* Papyrus Frame Content */}
            <div
              className="rounded-3xl p-8 md:p-12 space-y-6"
              style={{
                backgroundColor: "rgba(245, 222, 179, 0.95)",
                border: "4px solid rgba(210, 180, 140, 0.8)",
                boxShadow:
                  "0 20px 60px rgba(0, 0, 0, 0.5), inset 0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Dynasty Number */}
              <div className="text-center">
                <span
                  className="inline-block px-6 py-2 rounded-full font-bold text-sm"
                  style={{
                    backgroundColor: "rgba(212, 175, 55, 0.3)",
                    color: "#8B6914",
                  }}
                >
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-3xl md:text-5xl font-bold text-center"
                style={{ color: "#4A3C1F" }}
              >
                {dynasty.title}
              </h1>

              {/* Period */}
              <p
                className="text-xl md:text-2xl text-center font-semibold"
                style={{ color: "#6B5530" }}
              >
                {dynasty.period}
              </p>

              {/* Decorative Divider */}
              <div
                className="flex justify-center items-center gap-3 text-2xl"
                style={{ color: "#8B7355" }}
              >
                <span>𓊃</span>
                <div
                  className="h-0.5 w-16 rounded-full"
                  style={{ backgroundColor: "#D4AF37" }}
                />
                <span>𓊃</span>
              </div>

              {/* Description */}
              <p
                className="text-lg md:text-xl leading-relaxed text-center font-['Tajawal']"
                style={{ color: "#5A4A35" }}
              >
                {dynasty.description}
              </p>

              {/* Decorative Bottom Element */}
              <div className="flex justify-center pt-4">
                <div
                  className="w-32 h-1 rounded-full opacity-60"
                  style={{
                    background:
                      "linear-gradient(90deg, #D4AF37, #F4D03F, #D4AF37)",
                  }}
                />
              </div>
            </div>
          </div>
        </main>

        {/* Navigation Footer */}
        <footer className="p-6">
          <div className="max-w-4xl mx-auto flex justify-between items-center gap-4">
            {/* Previous Button */}
            <EgyptianButton
              onClick={handlePrevious}
              variant="secondary"
              disabled={isFirst}
              className={isFirst ? "opacity-50 cursor-not-allowed" : ""}
              icon={<ChevronRight className="w-5 h-5" />}
            >
              السابق
            </EgyptianButton>

            {/* Progress Indicator */}
            <div className="flex gap-2">
              {dynasties.map((d) => (
                <div
                  key={d.id}
                  className={`h-2 w-8 rounded-full transition-all duration-300 ${d.id === dynastyId
                    ? "bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]"
                    : "bg-muted"
                    }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <EgyptianButton
              onClick={handleNext}
              variant="primary"
              disabled={isLast}
              className={isLast ? "opacity-50 cursor-not-allowed" : ""}
              icon={<ChevronLeft className="w-5 h-5" />}
            >
              التالي
            </EgyptianButton>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DynastyPage;
