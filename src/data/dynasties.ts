import dynasty1 from "@/assets/dynasty-1.jpg";
import dynasty2 from "@/assets/dynasty-2.jpg";
import dynasty3 from "@/assets/dynasty-3.jpg";
import dynasty4 from "@/assets/dynasty-4.jpg";
import dynasty5 from "@/assets/dynasty-5.jpg";
import dynasty6 from "@/assets/dynasty-6.jpg";
import dynastyMiddle from "@/assets/dynasty-middle.jpg";
import dynastySecondIntermediate from "@/assets/dynastySecondIntermediate.jpg";
import dynastyNew from "@/assets/dynasty-new.jpg";
import dynastyLate from "@/assets/dynasty-late.jpg";
import narmer from "@/assets/narmer.jpg";

console.log("Dynasty image:", dynasty1);

export interface Dynasty {
  id: number;
  title: string;
  period: string;
  description: string;
  image: string;
  soundUrl?: string;
}

export const dynasties: Dynasty[] = [
  {
    id: 1,
    title: "الأسرة الأولى (العصر العتيق)",
    period: "ق. ٣١٠٠ - ٢٨٠٠ ق.م",
    description: "بداية الحكم الفرعوني وتوحيد القطرين على يد الملك نارمر. تأسيس الدولة المصرية القديمة ونظام الحكم المركزي، حيث شهدت هذه الفترة ولادة الحضارة المصرية الموحدة وظهور نظام الكتابة الهيروغليفية المتطور.",
    image: narmer,
  },
  {
    id: 2,
    title: "الدولة القديمة",
    period: "ق. ٢٦٨٦ - ٢١٨١ ق.م",
    description: "عصر الأهرامات الكبرى. أهم الملوك: زوسر (هرم سقارة المدرج)، خوفو (هرم الجيزة الأكبر)، خفرع ومنقرع. أهم الإنجازات: بناء الأهرامات الضخمة، ترسيخ الإدارة المركزية، تطور العمارة الحجرية.",
    image: dynasty1,
  },
  {
    id: 3,
    title: "الفترة الانتقالية الأولى",
    period: "ق. ٢١٨١ - ٢٠٥٠ ق.م",
    description: "مرحلة اضطراب سياسي وانهيار السلطة المركزية. أهم الأحداث: صعود نفوذ حكام الأقاليم، تراجع الاقتصاد، انقسام البلاد. انتهت بإعادة توحيد مصر على يد منتوحتب الثاني.",
    image: dynasty4,
  },
  {
    id: 4,
    title: "الدولة الوسطى",
    period: "ق. ٢٠٥٠ - ١٧٨٢ ق.م",
    description: "عصر النهضة والاستقرار. أهم الملوك: منتوحتب الثاني (موحد مصر)، أمنمحات الأول (إصلاحات إدارية)، سنوسرت الثالث (حملات النوبة)، أمنمحات الثالث (مشاريع الري). أهم الإنجازات: ازدهار الأدب (قصة سنوحي)، توسع التجارة، مشاريع زراعية كبرى.",
    image: dynastyMiddle,
  },
  {
    id: 5,
    title: "الفترة الانتقالية الثانية",
    period: "ق. ١٧٨٢ - ١٥٥٠ ق.م",
    description: "مرحلة ضعف وغزو الهكسوس لشمال مصر. أهم الأحداث: إدخال العربات الحربية، مقاومة حكام طيبة، وأخيرًا انتصار أحمس الأول الذي طرد الهكسوس وأسس الدولة الحديثة.",
    image: dynastySecondIntermediate,
  },
  {
    id: 6,
    title: "الدولة الحديثة",
    period: "ق. ١٥٥٠ - ١٠٦٩ ق.م",
    description: "أزهى عصور مصر القديمة. أهم الملوك: أحمس الأول (مؤسس الدولة الحديثة)، تحتمس الثالث (أعظم القادة العسكريين)، حتشبسوت (التجارة والبناء)، إخناتون (الثورة الدينية)، توت عنخ آمون (مقبرته الشهيرة)، رمسيس الثاني (معركة قادش والمعابد الضخمة). أهم الإنجازات: توسع الإمبراطورية حتى الشام والنوبة، ازدهار العمارة والفنون.",
    image: dynastyNew,
  },
  {
    id: 7,
    title: "العصر المتأخر",
    period: "ق. ١٠٦٩ - ٣٣٢ ق.م",
    description: "فترة ضعف وتدخلات أجنبية. أهم الملوك: شيشنق الأول (مؤسس الأسرة الليبية)، بسماتيك الأول (محاولات إحياء مصر القديمة)، نختنبو الأول (آخر الملوك الأقوياء). أهم الإنجازات: بناء بعض المعابد الجديدة، محاولات إحياء التقاليد القديمة، مقاومة الغزوات الآشورية والفارسية. انتهى بدخول الإسكندر الأكبر.",
    image: dynastyLate,
  },
];