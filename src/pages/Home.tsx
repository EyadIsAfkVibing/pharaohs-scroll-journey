// src/pages/Home.tsx - WITH ANCIENT ANIMATIONS
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAncientAnimations } from '@/components/animations/AncientAnimationProvider';
import homeBg from "@/assets/home-bg.jpg";
import { EgyptianButton } from "@/components/EgyptianButton";
import { ScrollText } from "lucide-react";
import homeMusic from "@/assets/home-theme.mp3";
import { Music2, VolumeX } from "lucide-react";



interface Dynasty {
  id: number;
  name: string;
  period: string;
  description: string;
  pharaohs: string[];
  achievements: string[];
}

interface Era {
  title: string;
  arabicTitle: string;
  period: string;
  dynasties: Dynasty[];
  color: string;
  icon: string;
}

const Home = () => {
  const [soundOn, setSoundOn] = useState(false);
  const navigate = useNavigate();
  const { triggerScrollUnroll, triggerRoyalSeal } = useAncientAnimations();
  const [selectedEra, setSelectedEra] = useState<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);


  // Keep your existing interfaces and structure (Era -> dynasties[]).
  // We’ll use a single "summary" dynasty per era to avoid breaking your logic.

  const eras: Era[] = [
    {
      title: "العصر العتيق",
      arabicTitle: "عصر التوحيد",
      period: "3100-2686 ق.م",
      color: "from-amber-600 to-orange-700",
      icon: "👑",
      dynasties: [
        {
          id: 1,
          name: "ملخص العصر",
          period: "3100-2686 ق.م",
          description: "بداية الحضارة الفرعونية وتوحيد مصر على يد نارمر، وتأسيس العاصمة منف وتطور الكتابة.",
          pharaohs: ["نارمر", "حور عحا", "دن"],
          achievements: ["توحيد القطرين", "تأسيس منف", "بداية الكتابة"]
        }
      ]
    },
    {
      title: "الدولة القديمة",
      arabicTitle: "عصر بناة الأهرام",
      period: "2686-2181 ق.م",
      color: "from-yellow-600 to-amber-700",
      icon: "🔺",
      dynasties: [
        {
          id: 2,
          name: "ملخص العصر",
          period: "2686-2181 ق.م",
          description: "عصر الأهرامات الكبرى وذروة العمارة الحجرية وتطور الإدارة المركزية.",
          pharaohs: ["زوسر", "خوفو", "خفرع", "منكاورع"],
          achievements: ["هرم سقارة المدرج", "أهرامات الجيزة", "أبو الهول"]
        }
      ]
    },
    {
      title: "الفترة الانتقالية الأولى",
      arabicTitle: "عصر الاضطراب الأول",
      period: "2181-2050 ق.م",
      color: "from-gray-600 to-gray-800",
      icon: "⚖️",
      dynasties: [
        {
          id: 3,
          name: "ملخص العصر",
          period: "2181-2050 ق.م",
          description: "مرحلة ضعف وانقسام وصعود حكام الأقاليم، انتهت بإعادة توحيد مصر لاحقًا.",
          pharaohs: ["حكام الأقاليم", "منتوحتب الثاني"],
          achievements: ["نصوص تعكس الأزمات الاجتماعية", "محاولات إعادة التوحيد"]
        }
      ]
    },
    {
      title: "الدولة الوسطى",
      arabicTitle: "عصر النهضة",
      period: "2050-1782 ق.م",
      color: "from-green-600 to-emerald-700",
      icon: "🌄",
      dynasties: [
        {
          id: 4,
          name: "ملخص العصر",
          period: "2050-1782 ق.م",
          description: "نهضة في الأدب والفنون والإدارة، إصلاحات واسعة ومشاريع ري وتوسع التجارة.",
          pharaohs: ["منتوحتب الثاني", "أمنمحات الأول", "سنوسرت الثالث", "أمنمحات الثالث"],
          achievements: ["إصلاحات إدارية", "مشاريع ري كبرى", "الأدب الكلاسيكي (قصة سنوحي)", "توسع التجارة"]
        }
      ]
    },
    {
      title: "الفترة الانتقالية الثانية",
      arabicTitle: "عصر الهكسوس",
      period: "1782-1550 ق.م",
      color: "from-red-600 to-rose-700",
      icon: "⚔️",
      dynasties: [
        {
          id: 5,
          name: "ملخص العصر",
          period: "1782-1550 ق.م",
          description: "غزو الهكسوس لشمال مصر، مقاومة طيبة، وانتهت بطردهم وإعادة التوحيد.",
          pharaohs: ["الهكسوس", "أحمس الأول"],
          achievements: ["إدخال العربات الحربية", "طرد الهكسوس", "إعادة توحيد مصر"]
        }
      ]
    },
    {
      title: "الدولة الحديثة",
      arabicTitle: "عصر الإمبراطورية",
      period: "1550-1069 ق.م",
      color: "from-blue-600 to-indigo-700",
      icon: "🌟",
      dynasties: [
        {
          id: 6,
          name: "ملخص العصر",
          period: "1550-1069 ق.م",
          description: "أزهى عصور مصر القديمة وذروة القوة العسكرية والثقافية والتوسع الخارجي.",
          pharaohs: ["أحمس الأول", "تحتمس الثالث", "حتشبسوت", "إخناتون", "توت عنخ آمون", "رمسيس الثاني"],
          achievements: ["توسيع الإمبراطورية للشام والنوبة", "معركة قادش", "ثورة دينية (آتون)", "بناء معابد ضخمة"]
        }
      ]
    },
    {
      title: "العصر المتأخر",
      arabicTitle: "عصر الانحدار",
      period: "1069-332 ق.م",
      color: "from-purple-600 to-violet-700",
      icon: "🕰",
      dynasties: [
        {
          id: 7,
          name: "ملخص العصر",
          period: "1069-332 ق.م",
          description: "فترة ضعف وتدخلات أجنبية مع محاولات إحياء، وانتهت بدخول الإسكندر الأكبر.",
          pharaohs: ["شيشنق الأول", "بسماتيك الأول", "نختنبو الأول"],
          achievements: ["محاولات إحياء مصر القديمة", "بناء معابد جديدة", "مقاومة الغزوات الأجنبية"]
        }
      ]
    }
  ];

  // Intersection Observer for scroll reveals
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.card-reveal, .text-reveal');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [selectedEra]);

  const handleDynastyClick = (dynastyId: number, e: React.MouseEvent) => {
    triggerRoyalSeal(e.clientX, e.clientY);
    setTimeout(() => {
      triggerScrollUnroll();
      setTimeout(() => {
        navigate(`/dynasty/${dynastyId}`);
      }, 600);
    }, 400);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <audio id="home-music" loop src={homeMusic} />
      {/* Background with heat mirage */}
      <div className="fixed inset-0 z-0">
        <img
          src={homeBg}
          alt="Ancient Egypt"
          className="w-full h-full object-cover animate-heat-mirage"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute inset-0 golden-warmth" />
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Hero Header */}
        <header className="container mx-auto px-4 py-20 text-center">
          <div className="space-y-8">
            {/* Animated Symbols with glow pulse */}
            <div className="flex justify-center items-center gap-6 mb-8 text-reveal">
              <div className="text-7xl text-primary animate-hieroglyph-glow-pulse">𓂀</div>
              <div className="text-8xl text-primary animate-glyph-breathe">👑</div>
              <div className="text-7xl text-primary animate-hieroglyph-glow-pulse" style={{ animationDelay: '2.5s' }}>𓁹</div>
            </div>

            {/* Main Title with ink reveal */}
            <div className="relative text-reveal">
              <div className="absolute -inset-12 bg-primary/10 blur-3xl rounded-full animate-ancient-pulse" />
              <h1 className="relative text-6xl md:text-8xl font-bold text-gradient-gold drop-shadow-2xl">
                رحلة عبر الأسرات الفرعونية
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto text-reveal animate-ancient-fade">
              استكشف <span className="text-primary font-bold">30 أسرة</span> حكمت مصر لأكثر من <span className="text-primary font-bold">3000 عام</span>
            </p>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-4 pt-6 text-reveal">
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent to-primary" />
              <div className="text-4xl text-primary animate-hieroglyph-glow-pulse" style={{ animationDelay: '1s' }}>𓆣</div>
              <div className="w-24 h-0.5 bg-gradient-to-l from-transparent to-primary" />
            </div>
          </div>
        </header>

        {/* Era Selector */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {eras.map((era, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedEra(index);
                  triggerRoyalSeal(window.innerWidth / 2, window.innerHeight / 2);
                }}
                className={`
                  group relative px-8 py-4 rounded-2xl font-bold text-lg 
                  transition-all duration-1000 hover-ancient-scale button-press
                  ${selectedEra === index
                    ? 'bg-gradient-to-r ' + era.color + ' text-white scale-110 tomb-shadow'
                    : 'ancient-scroll-container text-gray-300'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl animate-glyph-breathe">{era.icon}</span>
                  <div className="text-right">
                    <div className="font-bold">{era.title}</div>
                    <div className="text-xs opacity-80">{era.period}</div>
                  </div>
                </div>

                {selectedEra === index && (
                  <>
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-accent to-primary opacity-40 blur-xl animate-ancient-pulse rounded-2xl" />
                    <div className="absolute -top-2 -right-2 wax-seal w-8 h-8 rounded-full flex items-center justify-center text-xs">
                      𓂀
                    </div>
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Era Description */}
          <div className="ancient-scroll-container rounded-3xl p-8 max-w-4xl mx-auto mb-12 animate-papyrus-reveal card-reveal ancient-border">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-gradient-gold mb-2">
                  {eras[selectedEra].arabicTitle}
                </h2>
                <p className="text-xl text-primary">{eras[selectedEra].period}</p>
              </div>
              <div className="text-7xl animate-glyph-breathe">{eras[selectedEra].icon}</div>
            </div>
          </div>
        </section>

        {/* Dynasty Cards */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {eras[selectedEra].dynasties.map((dynasty, index) => (
              <div
                key={dynasty.id}
                onClick={(e) => handleDynastyClick(dynasty.id, e)}
                className="card-reveal group cursor-pointer"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Glow on hover */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${eras[selectedEra].color} opacity-0 group-hover:opacity-100 blur-xl transition-all duration-1000 rounded-3xl`} />

                {/* Card */}
                <div className="relative ancient-scroll-container rounded-3xl p-8 hover-ancient-scale tomb-shadow ancient-border hieroglyph-pattern">
                  {/* Hieroglyph Background */}
                  <div className="absolute top-8 right-8 text-9xl text-primary/5 group-hover:animate-hieroglyph-glow-pulse transition-all duration-1000 select-none">
                    {['𓂀', '𓆣', '𓇋', '☥'][dynasty.id % 4]}
                  </div>

                  {/* Top Border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                  {/* Header */}
                  <div className="relative flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-5xl animate-glyph-breathe">{eras[selectedEra].icon}</div>
                        <div>
                          <h3 className="text-3xl font-bold text-gradient-gold">
                            {dynasty.name}
                          </h3>
                          <p className="text-accent text-sm font-medium">{dynasty.period}</p>
                        </div>
                      </div>
                    </div>

                    {/* Dynasty Number Badge */}
                    <div className="relative">
                      <div className="absolute -inset-3 bg-primary/30 rounded-full blur-lg animate-ancient-pulse" />
                      <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${eras[selectedEra].color} flex items-center justify-center border-2 border-primary/50 tomb-shadow group-hover:scale-110 transition-transform duration-700`}>
                        <span className="text-2xl font-bold text-white">{dynasty.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-lg leading-relaxed mb-6 relative z-10">
                    {dynasty.description}
                  </p>

                  {/* Pharaohs */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl animate-glyph-breathe">👑</span>
                      <span className="text-sm text-gray-400 font-semibold">الفراعنة الرئيسيون:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {dynasty.pharaohs.map((pharaoh, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full text-primary border border-primary/30 text-sm font-medium hover-ancient-scale"
                        >
                          {pharaoh}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl animate-glyph-breathe">🏛️</span>
                      <span className="text-sm text-gray-400 font-semibold">الإنجازات:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {dynasty.achievements.map((achievement, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-full text-accent border border-accent/30 text-sm font-medium"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-6 relative overflow-hidden rounded-xl group/btn button-press">
                    <div className={`absolute inset-0 bg-gradient-to-r ${eras[selectedEra].color} opacity-90`} />
                    <div className="relative py-4 text-center text-white font-bold text-lg">
                      استكشف التفاصيل ←
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 text-center">
          <div className="space-y-4">
            <div className="flex justify-center gap-4 text-4xl">
              <span className="text-primary animate-hieroglyph-glow-pulse">𓂀</span>
              <span className="text-accent animate-hieroglyph-glow-pulse" style={{ animationDelay: '2.5s' }}>☥</span>
              <span className="text-primary animate-hieroglyph-glow-pulse" style={{ animationDelay: '5s' }}>𓁹</span>
            </div>
            <p className="text-gray-400">
              © 2025 رحلة عبر الأسرات الفرعونية
            </p>
          </div>
        </footer>
        <div className="flex justify-center">
          <EgyptianButton
            onClick={() => navigate("/credits")}
            variant="secondary"
            icon={<ScrollText className="w-5 h-5" />}
            className="mt-8"
          >
            صفحة الشكر والتقدير
          </EgyptianButton>
        </div>
        <div className="mt-8 flex justify-center">
          <EgyptianButton
            onClick={() => {
              const audio = document.getElementById("home-music") as HTMLAudioElement;
              if (soundOn) audio.pause();
              else audio.play();
              setSoundOn(!soundOn);
            }}
            variant="secondary"
            icon={soundOn ? <VolumeX className="w-4 h-4" /> : <Music2 className="w-4 h-4" />}
            className="text-xs px-4 py-2"
          >
            {soundOn ? "إيقاف" : "تشغيل"}
          </EgyptianButton>
        </div>

      </div>
    </div>
  );
};

export default Home;