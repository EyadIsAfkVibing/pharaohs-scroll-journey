import { useNavigate } from "react-router-dom";
import { EgyptianButton } from "@/components/EgyptianButton";
import { SandParticles } from "@/components/SandParticles";
import homeBg from "@/assets/home-bg.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${homeBg})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      </div>

      {/* Sand Particles Animation */}
      <SandParticles />

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 px-4 animate-hieroglyph-fade">
        {/* Title with Golden Gradient */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gradient-gold animate-glow-pulse">
          رحلة عبر الأسرات الفرعونية
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          استكشف عظمة مصر القديمة في رحلة تفاعلية عبر العصور
        </p>

        {/* Decorative Egyptian Elements */}
        <div className="flex justify-center items-center gap-4 text-4xl text-primary/40">
          <span>𓂀</span>
          <span>𓆣</span>
          <span>𓁢</span>
        </div>

        {/* Start Journey Button */}
        <div className="pt-8">
          <EgyptianButton
            onClick={() => navigate("/dynasty/1")}
            variant="primary"
            icon={<span className="text-2xl">𓂀</span>}
          >
            ابدأ الرحلة
          </EgyptianButton>
        </div>

        {/* Bottom Decorative Line */}
        <div className="pt-12">
          <div className="h-1 w-64 mx-auto bg-gradient-gold rounded-full opacity-50" />
        </div>
      </div>
    </div>
  );
};

export default Home;
