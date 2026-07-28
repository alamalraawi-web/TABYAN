"use client";

import { useMemo, useState, type ReactElement, type SVGProps } from "react";
import { useTibyanNavigation } from "@/components/tibyan-shell";

type IconProps = SVGProps<SVGSVGElement>;
type Flow = "instant" | "clinic" | "hospital" | "lab" | null;

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  degree: string;
  privileges: string;
  rating: number;
  workplace: string;
  available: string;
  queue: number;
};

function ArrowIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M19 12H5M11 18l-6-6 6-6" /></svg>;
}
function CloseIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="m6 6 12 12M18 6 6 18" /></svg>;
}
function ChevronIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="m6 9 6 6 6-6" /></svg>;
}
function CheckIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="m5 12 4 4L19 6" /></svg>;
}
function InstantIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <circle cx="24" cy="24" r="18" fill="currentColor" opacity=".1" />
      <path d="M12 15h24v14H22l-7 6v-6h-3V15Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M18 21h12M18 25h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="36" cy="14" r="4" fill="currentColor" className="icon-pulse" />
      <path d="M34.4 14h3.2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function ClinicIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path d="M8 39V17l16-9 16 9v22H8Z" fill="currentColor" opacity=".1" />
      <path d="M10 38V18l14-8 14 8v20H10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M19 38V27h10v11M14 23h4M30 23h4M14 28h4M30 28h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M24 13v8M20 17h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="icon-breathe" />
    </svg>
  );
}
function HospitalIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path d="M7 40V14h34v26H7Z" fill="currentColor" opacity=".1" />
      <path d="M9 39V15h30v24H9Z" stroke="currentColor" strokeWidth="2" />
      <path d="M18 39V29h12v10M15 20h5M28 20h5M15 25h5M28 25h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M24 8v10M19 13h10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="icon-breathe" />
    </svg>
  );
}
function LabIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path d="M19 8h10M21 8v12L11 36a3 3 0 0 0 2.6 4.5h20.8A3 3 0 0 0 37 36L27 20V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 32h18M18 27h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 35c2-2 4-2 6 0s4 2 6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="icon-wave" />
      <circle cx="34.5" cy="13.5" r="3.5" fill="currentColor" className="icon-pulse" />
    </svg>
  );
}
function DoctorIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <circle cx="24" cy="13" r="7" fill="currentColor" opacity=".1" />
      <circle cx="24" cy="13" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M10 41v-5a14 14 0 0 1 28 0v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 28v4a3.5 3.5 0 1 0 7 0v-4M31 28v4M29 30h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M20 17c2.5 1.5 5.5 1.5 8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 8c3-3 15-3 18 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className="icon-breathe" />
    </svg>
  );
}
function QueueIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <circle cx="12" cy="14" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="28" cy="14" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="20" cy="11" r="3.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 31v-2a7 7 0 0 1 7-7M35 31v-2a7 7 0 0 0-7-7M11 31v-3a9 9 0 0 1 18 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="34" cy="8" r="2.4" fill="currentColor" className="icon-pulse" />
    </svg>
  );
}
function MapIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <path d="m6 10 9-4 10 4 9-4v24l-9 4-10-4-9 4V10Z" fill="currentColor" opacity=".1" />
      <path d="m7 11 8-3.5 10 4 8-3.5v21l-8 3.5-10-4L7 32V11Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M15 7.5V29M25 11.5V33" stroke="currentColor" strokeWidth="1.4" opacity=".7" />
      <path d="M20 14a4 4 0 0 1 4 4c0 3-4 7-4 7s-4-4-4-7a4 4 0 0 1 4-4Z" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="20" cy="18" r="1.4" fill="currentColor" className="icon-pulse" />
    </svg>
  );
}

const specialties = [
  "الطب العام",
  "طب الأسرة",
  "الباطنة العامة",
  "طب الأطفال",
  "حديثو الولادة",
  "القلب والأوعية الدموية",
  "جراحة القلب",
  "الأمراض الصدرية والتنفسية",
  "الأنف والأذن والحنجرة",
  "العيون",
  "الجلدية",
  "التجميل والليزر",
  "النساء والولادة",
  "العقم وأطفال الأنابيب",
  "العظام",
  "الروماتيزم والمفاصل",
  "المخ والأعصاب",
  "جراحة المخ والأعصاب",
  "الطب النفسي",
  "العلاج النفسي",
  "الغدد الصماء والسكري",
  "الجهاز الهضمي والكبد",
  "الكلى والمسالك البولية",
  "أمراض الدم",
  "الأورام",
  "المناعة والحساسية",
  "الأمراض المعدية",
  "الجراحة العامة",
  "جراحة الأطفال",
  "جراحة الأوعية الدموية",
  "جراحة التجميل",
  "التخدير والعناية المركزة",
  "طب الطوارئ",
  "طب الألم",
  "طب الشيخوخة",
  "طب النوم",
  "طب التأهيل والعلاج الطبيعي",
  "الطب الرياضي",
  "طب الأسنان العام",
  "تقويم الأسنان",
  "جراحة الفم والوجه والفكين",
  "علاج الجذور",
  "تركيبات وزراعة الأسنان",
  "التغذية العلاجية",
  "الصيدلة السريرية",
  "الطب النووي",
  "الأشعة التشخيصية",
  "الأشعة التداخلية",
  "علم الأمراض والمختبرات",
];

const doctors: Doctor[] = [
  {
    id: "d1",
    name: "د. أحمد النور (وهمي)",
    specialty: "الطب العام",
    degree: "بورد عربي في الطب العام",
    privileges: "استشارات أولية • متابعة الحالات اليومية",
    rating: 4.8,
    workplace: "مركز تبيان الطبي",
    available: "متاح الآن",
    queue: 2,
  },
  {
    id: "d2",
    name: "د. سارة الحكيم (وهمي)",
    specialty: "طب الأسرة",
    degree: "زمالة طب الأسرة",
    privileges: "متابعة الأسرة • الأمراض المزمنة",
    rating: 4.9,
    workplace: "عيادات تبيان الأسرية",
    available: "اليوم 6:00 مساءً",
    queue: 1,
  },
  {
    id: "d3",
    name: "د. خالد أمين (وهمي)",
    specialty: "الباطنة العامة",
    degree: "استشاري باطنة عامة",
    privileges: "ضغط • سكري • متابعة شاملة",
    rating: 4.7,
    workplace: "مستشفى الصفوة",
    available: "اليوم 8:00 مساءً",
    queue: 3,
  },
  {
    id: "d4",
    name: "د. ريم الصغير (وهمي)",
    specialty: "طب الأطفال",
    degree: "استشارية طب أطفال",
    privileges: "نمو • حميات • متابعة الأطفال",
    rating: 4.9,
    workplace: "مستشفى الرحمة للأطفال",
    available: "متاحة الآن",
    queue: 2,
  },
  {
    id: "d5",
    name: "د. مازن الرفاعي (وهمي)",
    specialty: "حديثو الولادة",
    degree: "زمالة حديثي الولادة",
    privileges: "متابعة الخدج • تغذية حديثي الولادة",
    rating: 4.8,
    workplace: "مركز الأم والطفل",
    available: "غدًا 10:00 صباحًا",
    queue: 1,
  },
  {
    id: "d6",
    name: "د. ليان القلب (وهمي)",
    specialty: "القلب والأوعية الدموية",
    degree: "استشارية قلب وأوعية",
    privileges: "ضغط • خفقان • متابعة القلب",
    rating: 4.9,
    workplace: "مركز القلب المتقدم",
    available: "اليوم 7:30 مساءً",
    queue: 4,
  },
  {
    id: "d7",
    name: "د. طارق نبيل (وهمي)",
    specialty: "جراحة القلب",
    degree: "زمالة جراحة قلب",
    privileges: "استشارات ما قبل وبعد الجراحة",
    rating: 4.8,
    workplace: "مستشفى القلب الدولي",
    available: "الخميس 5:00 مساءً",
    queue: 2,
  },
  {
    id: "d8",
    name: "د. نهى الصدر (وهمي)",
    specialty: "الأمراض الصدرية والتنفسية",
    degree: "استشارية صدرية",
    privileges: "ربو • حساسية • ضيق التنفس",
    rating: 4.8,
    workplace: "مركز التنفس المتكامل",
    available: "متاحة الآن",
    queue: 2,
  },
  {
    id: "d9",
    name: "د. وائل السمع (وهمي)",
    specialty: "الأنف والأذن والحنجرة",
    degree: "استشاري أنف وأذن وحنجرة",
    privileges: "جيوب • سمع • لوز",
    rating: 4.7,
    workplace: "عيادات السمع والتوازن",
    available: "اليوم 9:00 مساءً",
    queue: 3,
  },
  {
    id: "d10",
    name: "د. هناء البصيرة (وهمي)",
    specialty: "العيون",
    degree: "استشارية عيون",
    privileges: "فحص نظر • جفاف • احمرار",
    rating: 4.9,
    workplace: "مركز البصيرة",
    available: "غدًا 4:00 مساءً",
    queue: 1,
  },
  {
    id: "d11",
    name: "د. مريم الصفاء (وهمي)",
    specialty: "الجلدية",
    degree: "استشارية جلدية",
    privileges: "جلد • شعر • حساسية",
    rating: 4.8,
    workplace: "مركز الصفاء للجلدية",
    available: "متاحة الآن",
    queue: 2,
  },
  {
    id: "d12",
    name: "د. رنا الجمال (وهمي)",
    specialty: "التجميل والليزر",
    degree: "استشارية تجميل وليزر",
    privileges: "ليزر • بشرة • استشارات تجميل",
    rating: 4.7,
    workplace: "عيادات نوفا",
    available: "الأربعاء 6:00 مساءً",
    queue: 1,
  },
  {
    id: "d13",
    name: "د. أمل الحياة (وهمي)",
    specialty: "النساء والولادة",
    degree: "استشارية نساء وولادة",
    privileges: "متابعة حمل • صحة المرأة",
    rating: 4.9,
    workplace: "مستشفى الحياة للنساء",
    available: "اليوم 5:30 مساءً",
    queue: 3,
  },
  {
    id: "d14",
    name: "د. يوسف الأمل (وهمي)",
    specialty: "العقم وأطفال الأنابيب",
    degree: "استشاري عقم وأطفال أنابيب",
    privileges: "تقييم خصوبة • خطط علاجية",
    rating: 4.9,
    workplace: "مركز الأمل للخصوبة",
    available: "السبت 11:00 صباحًا",
    queue: 2,
  },
  {
    id: "d15",
    name: "د. فهد الحركة (وهمي)",
    specialty: "العظام",
    degree: "استشاري عظام",
    privileges: "آلام مفاصل • إصابات • كسور",
    rating: 4.8,
    workplace: "مركز الحركة",
    available: "متاح الآن",
    queue: 4,
  },
  {
    id: "d16",
    name: "د. إيمان المفاصل (وهمي)",
    specialty: "الروماتيزم والمفاصل",
    degree: "استشارية روماتيزم",
    privileges: "التهاب مفاصل • مناعة",
    rating: 4.8,
    workplace: "عيادات التوازن",
    available: "غدًا 7:00 مساءً",
    queue: 2,
  },
  {
    id: "d17",
    name: "د. سامر الذهن (وهمي)",
    specialty: "المخ والأعصاب",
    degree: "استشاري مخ وأعصاب",
    privileges: "صداع • دوار • تنميل",
    rating: 4.9,
    workplace: "مركز الأعصاب المتقدم",
    available: "اليوم 8:30 مساءً",
    queue: 3,
  },
  {
    id: "d18",
    name: "د. نادر الجراح (وهمي)",
    specialty: "جراحة المخ والأعصاب",
    degree: "استشاري جراحة مخ وأعصاب",
    privileges: "استشارات جراحية متقدمة",
    rating: 4.8,
    workplace: "مستشفى النخبة العصبي",
    available: "الأحد 4:00 مساءً",
    queue: 1,
  },
  {
    id: "d19",
    name: "د. ليلى السكينة (وهمي)",
    specialty: "الطب النفسي",
    degree: "استشارية طب نفسي",
    privileges: "قلق • اكتئاب • نوم",
    rating: 4.9,
    workplace: "مركز السكينة",
    available: "متاحة الآن",
    queue: 2,
  },
  {
    id: "d20",
    name: "د. عمر الطمأنينة (وهمي)",
    specialty: "العلاج النفسي",
    degree: "أخصائي علاج نفسي سريري",
    privileges: "جلسات معرفية وسلوكية",
    rating: 4.8,
    workplace: "عيادات الطمأنينة",
    available: "اليوم 9:00 مساءً",
    queue: 1,
  },
  {
    id: "d21",
    name: "د. مها التوازن (وهمي)",
    specialty: "الغدد الصماء والسكري",
    degree: "استشارية غدد وسكري",
    privileges: "سكري • غدة درقية • هرمونات",
    rating: 4.9,
    workplace: "مركز التوازن الهرموني",
    available: "غدًا 6:00 مساءً",
    queue: 3,
  },
  {
    id: "d22",
    name: "د. راشد الهضم (وهمي)",
    specialty: "الجهاز الهضمي والكبد",
    degree: "استشاري جهاز هضمي وكبد",
    privileges: "قولون • معدة • كبد",
    rating: 4.8,
    workplace: "مركز الهضم والكبد",
    available: "متاح الآن",
    queue: 2,
  },
  {
    id: "d23",
    name: "د. باسم النقاء (وهمي)",
    specialty: "الكلى والمسالك البولية",
    degree: "استشاري كلى ومسالك",
    privileges: "حصوات • التهابات • وظائف كلى",
    rating: 4.7,
    workplace: "مركز النقاء",
    available: "اليوم 7:00 مساءً",
    queue: 2,
  },
  {
    id: "d24",
    name: "د. نوال الدم (وهمي)",
    specialty: "أمراض الدم",
    degree: "استشارية أمراض دم",
    privileges: "فقر دم • سيولة • صفائح",
    rating: 4.8,
    workplace: "مركز أمراض الدم",
    available: "الخميس 10:00 صباحًا",
    queue: 1,
  },
  {
    id: "d25",
    name: "د. حسان الأمل (وهمي)",
    specialty: "الأورام",
    degree: "استشاري أورام",
    privileges: "استشارة علاجية • متابعة",
    rating: 4.9,
    workplace: "مركز الأمل للأورام",
    available: "الأحد 5:00 مساءً",
    queue: 2,
  },
  {
    id: "d26",
    name: "د. شهد المناعة (وهمي)",
    specialty: "المناعة والحساسية",
    degree: "استشارية مناعة وحساسية",
    privileges: "حساسية • مناعة • ربو تحسسي",
    rating: 4.8,
    workplace: "مركز المناعة",
    available: "متاحة الآن",
    queue: 2,
  },
  {
    id: "d27",
    name: "د. ياسر الوقاية (وهمي)",
    specialty: "الأمراض المعدية",
    degree: "استشاري أمراض معدية",
    privileges: "حمى • عدوى • متابعة",
    rating: 4.7,
    workplace: "مستشفى الوقاية",
    available: "غدًا 8:00 مساءً",
    queue: 1,
  },
  {
    id: "d28",
    name: "د. حمزة الجراحة (وهمي)",
    specialty: "الجراحة العامة",
    degree: "استشاري جراحة عامة",
    privileges: "فتق • مرارة • استشارات جراحية",
    rating: 4.8,
    workplace: "مستشفى الجراحة الحديثة",
    available: "اليوم 6:30 مساءً",
    queue: 3,
  },
  {
    id: "d29",
    name: "د. سليم الطفل (وهمي)",
    specialty: "جراحة الأطفال",
    degree: "استشاري جراحة أطفال",
    privileges: "استشارات جراحية للأطفال",
    rating: 4.8,
    workplace: "مستشفى الطفل",
    available: "السبت 4:00 مساءً",
    queue: 1,
  },
  {
    id: "d30",
    name: "د. عادل الشريان (وهمي)",
    specialty: "جراحة الأوعية الدموية",
    degree: "استشاري أوعية دموية",
    privileges: "دوالي • شرايين • قدم سكري",
    rating: 4.9,
    workplace: "مركز الشريان",
    available: "الأحد 7:30 مساءً",
    queue: 2,
  },
  {
    id: "d31",
    name: "د. دانا الشكل (وهمي)",
    specialty: "جراحة التجميل",
    degree: "استشارية جراحة تجميل",
    privileges: "تجميل علاجي وترميمي",
    rating: 4.7,
    workplace: "مركز التجميل المتقدم",
    available: "الخميس 6:00 مساءً",
    queue: 1,
  },
  {
    id: "d32",
    name: "د. محمود الأمان (وهمي)",
    specialty: "التخدير والعناية المركزة",
    degree: "استشاري تخدير وعناية مركزة",
    privileges: "تقييم قبل العمليات • عناية",
    rating: 4.8,
    workplace: "مستشفى الأمان",
    available: "غدًا 2:00 مساءً",
    queue: 1,
  },
  {
    id: "d33",
    name: "د. جلال الطوارئ (وهمي)",
    specialty: "طب الطوارئ",
    degree: "استشاري طب طوارئ",
    privileges: "فرز عاجل • تقييم سريع",
    rating: 4.9,
    workplace: "مركز الطوارئ المتقدم",
    available: "متاح الآن",
    queue: 5,
  },
  {
    id: "d34",
    name: "د. سمر الراحة (وهمي)",
    specialty: "طب الألم",
    degree: "استشارية طب ألم",
    privileges: "آلام مزمنة • أعصاب • مفاصل",
    rating: 4.8,
    workplace: "مركز الراحة",
    available: "اليوم 5:00 مساءً",
    queue: 2,
  },
  {
    id: "d35",
    name: "د. ناصر الحكمة (وهمي)",
    specialty: "طب الشيخوخة",
    degree: "استشاري طب شيخوخة",
    privileges: "متابعة كبار السن • أدوية متعددة",
    rating: 4.8,
    workplace: "مركز الحكمة",
    available: "غدًا 9:00 صباحًا",
    queue: 1,
  },
  {
    id: "d36",
    name: "د. عائشة النوم (وهمي)",
    specialty: "طب النوم",
    degree: "استشارية طب نوم",
    privileges: "أرق • شخير • انقطاع النفس",
    rating: 4.9,
    workplace: "مركز النوم الصحي",
    available: "الأربعاء 8:00 مساءً",
    queue: 2,
  },
  {
    id: "d37",
    name: "د. وليد التعافي (وهمي)",
    specialty: "طب التأهيل والعلاج الطبيعي",
    degree: "استشاري تأهيل",
    privileges: "تأهيل بعد الإصابات والعمليات",
    rating: 4.8,
    workplace: "مركز التعافي",
    available: "متاح الآن",
    queue: 2,
  },
  {
    id: "d38",
    name: "د. رامي الأداء (وهمي)",
    specialty: "الطب الرياضي",
    degree: "استشاري طب رياضي",
    privileges: "إصابات رياضية • لياقة",
    rating: 4.8,
    workplace: "مركز الأداء الرياضي",
    available: "اليوم 7:00 مساءً",
    queue: 3,
  },
  {
    id: "d39",
    name: "د. سناء الابتسامة (وهمي)",
    specialty: "طب الأسنان العام",
    degree: "طبيبة أسنان عامة",
    privileges: "فحص • تنظيف • ألم أسنان",
    rating: 4.8,
    workplace: "مركز الابتسامة",
    available: "متاحة الآن",
    queue: 2,
  },
  {
    id: "d40",
    name: "د. جود الاصطفاف (وهمي)",
    specialty: "تقويم الأسنان",
    degree: "استشارية تقويم أسنان",
    privileges: "تقويم شفاف وثابت",
    rating: 4.9,
    workplace: "مركز الاصطفاف",
    available: "الخميس 5:00 مساءً",
    queue: 1,
  },
  {
    id: "d41",
    name: "د. معاذ الوجه (وهمي)",
    specialty: "جراحة الفم والوجه والفكين",
    degree: "استشاري جراحة فم وفكين",
    privileges: "خلع جراحي • مفصل الفك",
    rating: 4.8,
    workplace: "مركز الوجه والفكين",
    available: "السبت 6:00 مساءً",
    queue: 1,
  },
  {
    id: "d42",
    name: "د. هبة الجذور (وهمي)",
    specialty: "علاج الجذور",
    degree: "أخصائية علاج جذور",
    privileges: "علاج عصب • إعادة علاج",
    rating: 4.7,
    workplace: "عيادات الجذور",
    available: "غدًا 4:00 مساءً",
    queue: 2,
  },
  {
    id: "d43",
    name: "د. أنس الزراعة (وهمي)",
    specialty: "تركيبات وزراعة الأسنان",
    degree: "استشاري زراعة وتركيبات",
    privileges: "زراعة • تيجان • جسور",
    rating: 4.9,
    workplace: "مركز الزراعة السنية",
    available: "الأحد 11:00 صباحًا",
    queue: 1,
  },
  {
    id: "d44",
    name: "د. رشا الغذاء (وهمي)",
    specialty: "التغذية العلاجية",
    degree: "أخصائية تغذية علاجية",
    privileges: "خطط غذائية • أمراض مزمنة",
    rating: 4.9,
    workplace: "مركز التغذية الذكية",
    available: "متاحة الآن",
    queue: 3,
  },
  {
    id: "d45",
    name: "د. حسام الدواء (وهمي)",
    specialty: "الصيدلة السريرية",
    degree: "صيدلي سريري استشاري",
    privileges: "تداخلات دوائية • مراجعة علاج",
    rating: 4.8,
    workplace: "مركز الدواء الآمن",
    available: "اليوم 8:00 مساءً",
    queue: 2,
  },
  {
    id: "d46",
    name: "د. بيان النووي (وهمي)",
    specialty: "الطب النووي",
    degree: "استشارية طب نووي",
    privileges: "فحوصات نووية • متابعة علاج",
    rating: 4.7,
    workplace: "مركز الطب النووي",
    available: "الأربعاء 10:00 صباحًا",
    queue: 1,
  },
  {
    id: "d47",
    name: "د. فواز الصورة (وهمي)",
    specialty: "الأشعة التشخيصية",
    degree: "استشاري أشعة تشخيصية",
    privileges: "أشعة مقطعية • رنين • سونار",
    rating: 4.8,
    workplace: "مركز الصورة الطبية",
    available: "متاح الآن",
    queue: 2,
  },
  {
    id: "d48",
    name: "د. لينا التدخل (وهمي)",
    specialty: "الأشعة التداخلية",
    degree: "استشارية أشعة تداخلية",
    privileges: "إجراءات تشخيصية وعلاجية",
    rating: 4.8,
    workplace: "مستشفى التدخل الذكي",
    available: "الاثنين 3:00 مساءً",
    queue: 1,
  },
  {
    id: "d49",
    name: "د. أيمن المختبر (وهمي)",
    specialty: "علم الأمراض والمختبرات",
    degree: "استشاري علم الأمراض",
    privileges: "تحليل نتائج • جودة مختبرية",
    rating: 4.9,
    workplace: "مختبرات تبيان المركزية",
    available: "اليوم 6:00 مساءً",
    queue: 2,
  }
];

const labs = [
  { id:"l1", name:"مختبرات الدقة", distance:"1.4 كم", consultant:"د. خالد الصبري", degree:"استشاري كيمياء سريرية", rating:4.9, available:"حتى 11:00 مساءً" },
  { id:"l2", name:"مختبرات النخبة", distance:"2.7 كم", consultant:"د. أمل الهمداني", degree:"دكتوراه أحياء دقيقة", rating:4.8, available:"متاح الآن" },
  { id:"l3", name:"مختبرات الحياة", distance:"4.2 كم", consultant:"د. فهد الزبيري", degree:"استشاري أمراض دم", rating:4.7, available:"حتى 9:30 مساءً" },
];

export default function ConsultationsPage() {
  const { goBack } = useTibyanNavigation();
  const [flow, setFlow] = useState<Flow>(null);
  const [specialty, setSpecialty] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [openSpecialties, setOpenSpecialties] = useState(false);
  const [openDoctors, setOpenDoctors] = useState(false);
  const [selectedLabId, setSelectedLabId] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const availableDoctors = useMemo(() => doctors.filter(d => !specialty || d.specialty === specialty), [specialty]);
  const selectedDoctor = useMemo(() => doctors.find(d => d.id === doctorId) ?? null, [doctorId]);
  const selectedLab = useMemo(() => labs.find(l => l.id === selectedLabId) ?? null, [selectedLabId]);

  const resetFlow = () => {
    setFlow(null); setSpecialty(""); setDoctorId(""); setOpenSpecialties(false); setOpenDoctors(false); setSelectedLabId(""); setConfirmed(false);
  };

  return (
    <main dir="rtl" className="consultations-page min-h-screen overflow-x-hidden bg-[#f4fbff] text-[#073b72]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="consult-grid absolute inset-0 opacity-65" />
        <div className="absolute -right-28 top-20 h-96 w-96 rounded-full bg-[#0876d9]/12 blur-3xl" />
        <div className="absolute -left-32 top-[36rem] h-[28rem] w-[28rem] rounded-full bg-[#12b7bd]/14 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[28%] h-96 w-96 rounded-full bg-[#38c96f]/12 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <button type="button" onClick={goBack} className="mb-5 inline-flex min-h-11 items-center gap-2 rounded-2xl border border-[#0a86c7]/12 bg-white/90 px-4 text-sm font-black text-[#0876d9] shadow-[0_10px_28px_rgba(4,77,132,.08)] transition hover:-translate-y-0.5"><ArrowIcon className="h-5 w-5" />العودة</button>

        <section className="consult-hero relative overflow-hidden rounded-[2.3rem] border border-white/90 bg-white/80 p-5 shadow-[0_40px_120px_rgba(4,70,127,.14)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true"><div className="hero-scan absolute inset-y-0 w-36 bg-gradient-to-r from-transparent via-white/80 to-transparent" /><div className="absolute -left-20 -top-24 h-64 w-64 rounded-full border-[38px] border-[#0876d9]/5" /><div className="absolute -bottom-28 right-20 h-72 w-72 rounded-full border-[42px] border-[#38c96f]/5" /></div>
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0aa9ba]/20 bg-[#ecfbfb] px-4 py-2 text-xs font-black text-[#07959d]"><span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38c96f] opacity-70" /><span className="relative h-2.5 w-2.5 rounded-full bg-[#38c96f]" /></span>منصة استشارات وحجوزات طبية متكاملة</div>
              <h1 className="mt-5 text-3xl font-black leading-[1.22] text-[#064c91] sm:text-4xl lg:text-6xl">الطبيب المناسب<span className="mr-3 bg-gradient-to-l from-[#0876d9] via-[#0aa9ba] to-[#38c96f] bg-clip-text text-transparent">في الوقت المناسب</span></h1>
              <p className="mt-5 max-w-3xl text-sm font-semibold leading-8 text-[#5d839a] sm:text-base">استشارة فورية، حجز في عيادة خاصة، موعد مع استشاري مستشفى، أو حجز مختبر قريب — كل مسار مصمم بخطوات واضحة وسريعة.</p>
            </div>

            <div className="consult-universe relative mx-auto grid min-h-[330px] w-full max-w-[470px] place-items-center">
              <div className="absolute h-80 w-80 rounded-full border border-dashed border-[#0876d9]/22 sm:h-[360px] sm:w-[360px]" /><div className="absolute h-64 w-64 rounded-full border border-[#12b7bd]/18 sm:h-72 sm:w-72" /><div className="consult-aura absolute h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(8,118,217,.22)_0%,rgba(18,183,189,.12)_48%,transparent_74%)] blur-xl" />
              <div className="consult-core relative z-10 grid h-48 w-48 place-items-center rounded-[3.2rem] bg-gradient-to-br from-[#0876d9] via-[#0aa9ba] to-[#38c96f] text-white shadow-[0_34px_90px_rgba(4,86,143,.32)] sm:h-56 sm:w-56"><DoctorIcon className="h-28 w-28 sm:h-32 sm:w-32" /></div>
              {[[InstantIcon,"top-[4%] right-[17%]"],[ClinicIcon,"top-[22%] left-[3%]"],[HospitalIcon,"bottom-[9%] left-[15%]"],[LabIcon,"bottom-[5%] right-[19%]"],[QueueIcon,"top-[45%] right-[0%]"]].map(([Icon, position], index) => { const RenderIcon = Icon as (props: IconProps) => ReactElement; return <span key={index} className={`orbit-icon absolute z-20 grid h-14 w-14 place-items-center rounded-2xl border border-white/90 bg-white/95 text-[#0a98a1] shadow-[0_18px_38px_rgba(4,77,132,.16)] ${position}`} style={{ animationDelay: `${index * .3}s` }}><RenderIcon className="h-8 w-8" /></span>; })}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["الاستشارة الفورية","اختر التخصص ثم الطبيب واعرف عدد الحالات المنتظرة قبل الدخول.",InstantIcon,"instant","متاح الآن","from-[#0876d9] to-[#0aa9ba]"],
            ["العيادات الخاصة","اختر التخصص والطبيب ثم راجع المؤهلات ووقت التواجد في العيادة.",ClinicIcon,"clinic","حجز مباشر","from-[#38c96f] to-[#0aa9ba]"],
            ["استشاريو المستشفيات","احجز موعدًا مع استشاريين في المستشفيات حسب التخصص والتوفر.",HospitalIcon,"hospital","استشاريون","from-[#0aa9ba] to-[#0876d9]"],
            ["حجز المختبرات","اعرض أقرب المختبرات والمشرف الطبي والتقييم وساعات العمل.",LabIcon,"lab","حسب الموقع","from-[#0876d9] to-[#38c96f]"],
          ].map(([title, desc, Icon, itemFlow, label, gradient]) => { const RenderIcon = Icon as (props: IconProps) => ReactElement; return <article key={String(title)} className="service-card"><span className={`service-icon bg-gradient-to-br ${gradient}`}><RenderIcon className="h-10 w-10" /></span><span className="mt-5 inline-flex rounded-full bg-[#effcfc] px-3 py-1 text-[11px] font-black text-[#0a9299]">{String(label)}</span><h2 className="mt-3 text-xl font-black text-[#075dab]">{String(title)}</h2><p className="mt-3 text-sm font-semibold leading-7 text-[#658ba3]">{String(desc)}</p><button type="button" onClick={() => setFlow(itemFlow as Flow)} className="service-action">فتح المسار</button></article>; })}
        </section>
      </div>

      {flow && <div className="flow-backdrop fixed inset-0 z-[150] grid place-items-center overflow-y-auto bg-[#032f57]/55 px-4 py-8 backdrop-blur-md" onMouseDown={e => { if (e.target === e.currentTarget) resetFlow(); }}>
        <section className="flow-dialog relative w-full max-w-5xl overflow-hidden rounded-[2.2rem] border border-white/80 bg-white shadow-[0_45px_130px_rgba(1,35,67,.4)]">
          <button type="button" onClick={resetFlow} className="absolute left-4 top-4 z-30 grid h-10 w-10 place-items-center rounded-xl border border-[#0a86c7]/10 bg-white text-[#6b91a8] shadow-sm" aria-label="إغلاق"><CloseIcon className="h-5 w-5" /></button>

          {flow !== "lab" ? <div className="grid lg:grid-cols-[.76fr_1.24fr]">
            <aside className={`flow-aside ${flow === "clinic" ? "green-panel" : "blue-panel"}`}>{flow === "instant" && <InstantIcon className="h-16 w-16 text-white" />}{flow === "clinic" && <ClinicIcon className="h-16 w-16 text-white" />}{flow === "hospital" && <HospitalIcon className="h-16 w-16 text-white" />}<p className="mt-6 text-xs font-black text-[#d8fff8]">{flow === "instant" ? "استشارة فورية" : flow === "clinic" ? "عيادة خاصة" : "استشاري مستشفى"}</p><h2 className="mt-1 text-2xl font-black">{flow === "instant" ? "اختر التخصص والطبيب" : flow === "clinic" ? "حجز في عيادة خاصة" : "موعد مع استشاري"}</h2><p className="mt-4 text-sm font-semibold leading-7 text-white/80">ابدأ بالتخصص، ثم سيظهر لك الأطباء المرتبطون به فقط مع تفاصيل واضحة قبل تأكيد الطلب.</p></aside>
            <div className="p-5 sm:p-8">
              <div className="grid gap-4">
                <div className="relative"><label className="block text-sm font-black text-[#416c85]">التخصص الطبي</label><button type="button" onClick={() => setOpenSpecialties(v => !v)} className="select-trigger"><span>{specialty || "اختر التخصص"}</span><ChevronIcon className={`h-5 w-5 transition ${openSpecialties ? "rotate-180" : ""}`} /></button>{openSpecialties && <div className="select-menu">{specialties.map(item => <button type="button" key={item} onClick={() => { setSpecialty(item); setDoctorId(""); setOpenSpecialties(false); setOpenDoctors(true); }} className="select-option">{item}</button>)}</div>}</div>
                <div className="relative"><label className="block text-sm font-black text-[#416c85]">الطبيب</label><button type="button" disabled={!specialty} onClick={() => setOpenDoctors(v => !v)} className="select-trigger disabled:cursor-not-allowed disabled:opacity-50"><span>{selectedDoctor?.name || "اختر الطبيب"}</span><ChevronIcon className={`h-5 w-5 transition ${openDoctors ? "rotate-180" : ""}`} /></button>{openDoctors && specialty && <div className="select-menu">{availableDoctors.length ? availableDoctors.map(d => <button type="button" key={d.id} onClick={() => { setDoctorId(d.id); setOpenDoctors(false); }} className="select-option">{d.name}</button>) : <div className="px-4 py-3 text-sm font-bold text-[#7a96a8]">لا يوجد طبيب متاح لهذا التخصص حاليًا</div>}</div>}</div>
              </div>

              {selectedDoctor && <article className="doctor-card mt-6"><div className="flex flex-col gap-5 sm:flex-row sm:items-start"><span className="doctor-avatar"><DoctorIcon className="h-14 w-14" /></span><div className="flex-1"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-black text-[#0aa3a7]">{selectedDoctor.specialty}</p><h3 className="mt-1 text-2xl font-black text-[#075dab]">{selectedDoctor.name}</h3></div><span className="rounded-full bg-[#fff8df] px-3 py-1.5 text-xs font-black text-[#b88716]">★ {selectedDoctor.rating}</span></div><div className="mt-4 grid gap-3 sm:grid-cols-2"><InfoBox title="المؤهل" value={selectedDoctor.degree} /><InfoBox title="الامتيازات" value={selectedDoctor.privileges} /><InfoBox title="مكان العمل" value={selectedDoctor.workplace} /><InfoBox title="وقت التواجد" value={selectedDoctor.available} /></div>{flow === "instant" && <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#0a86c7]/10 bg-[#f7fcff] p-4"><QueueIcon className="h-10 w-10 shrink-0 text-[#0876d9]" /><div><p className="text-xs font-black text-[#0aa3a7]">الانتظار الحالي</p><p className="mt-1 text-sm font-black text-[#075dab]">أمامك {selectedDoctor.queue} {selectedDoctor.queue === 1 ? "حالة" : "حالات"}</p></div></div>}<div className="mt-5 grid gap-3 sm:grid-cols-2"><button type="button" className="secondary-button" onClick={() => setDoctorId("")}>اختيار طبيب آخر</button><button type="button" className="primary-button" onClick={() => setConfirmed(true)}>{flow === "instant" ? "الانضمام إلى قائمة الانتظار" : "تأكيد الموعد"}</button></div></div></div></article>}
              {confirmed && <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#38c96f]/25 bg-[#effdf4] p-4 text-[#1d8b56]"><span className="grid h-9 w-9 place-items-center rounded-full bg-white"><CheckIcon className="h-5 w-5" /></span><p className="text-sm font-black">تم تسجيل طلبك بنجاح وسيظهر لك إشعار عند اقتراب دورك.</p></div>}
            </div>
          </div> : <div className="grid lg:grid-cols-[.76fr_1.24fr]">
            <aside className="flow-aside blue-panel"><LabIcon className="h-16 w-16 text-white" /><p className="mt-6 text-xs font-black text-[#d8fff8]">حجز المختبرات</p><h2 className="mt-1 text-2xl font-black">أقرب مختبر مناسب</h2><p className="mt-4 text-sm font-semibold leading-7 text-white/80">اعرض المختبرات الأقرب حسب موقعك، مع المشرف الطبي والتقييم وساعات العمل.</p></aside>
            <div className="p-5 sm:p-8"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-black text-[#0aa3a7]">الموقع الحالي</p><h3 className="mt-1 text-xl font-black text-[#064c91]">المختبرات الأقرب إليك</h3></div><MapIcon className="h-11 w-11 text-[#0876d9]" /></div><div className="mt-5 space-y-3">{labs.map(lab => <button type="button" key={lab.id} onClick={() => setSelectedLabId(lab.id)} className={`lab-card ${selectedLabId === lab.id ? "selected" : ""}`}><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-black text-[#075dab]">{lab.name}</p><p className="mt-1 text-xs font-bold text-[#668ba2]">{lab.distance} • {lab.available}</p></div><span className="rounded-full bg-[#fff8df] px-3 py-1 text-xs font-black text-[#b88716]">★ {lab.rating}</span></div></button>)}</div>{selectedLab && <article className="doctor-card mt-5"><div className="flex items-start gap-4"><span className="doctor-avatar"><LabIcon className="h-12 w-12" /></span><div className="flex-1"><p className="text-xs font-black text-[#0aa3a7]">المشرف الطبي</p><h3 className="mt-1 text-xl font-black text-[#075dab]">{selectedLab.consultant}</h3><p className="mt-2 text-sm font-semibold text-[#658ba3]">{selectedLab.degree}</p><div className="mt-4 grid gap-3 sm:grid-cols-2"><InfoBox title="المختبر" value={selectedLab.name} /><InfoBox title="ساعات العمل" value={selectedLab.available} /></div><button type="button" className="primary-button mt-5 w-full" onClick={() => setConfirmed(true)}>تأكيد حجز المختبر</button></div></div></article>}{confirmed && <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#38c96f]/25 bg-[#effdf4] p-4 text-[#1d8b56]"><span className="grid h-9 w-9 place-items-center rounded-full bg-white"><CheckIcon className="h-5 w-5" /></span><p className="text-sm font-black">تم تأكيد الحجز وإضافة الموعد إلى حسابك.</p></div>}</div>
          </div>}
        </section>
      </div>}

      <style jsx global>{`
        .consultations-page{font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased}.consult-grid{background-image:linear-gradient(rgba(8,118,217,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(8,118,217,.04) 1px,transparent 1px);background-size:42px 42px;animation:gridMove 18s linear infinite}.consult-hero::after{content:"";position:absolute;inset:0;pointer-events:none;border-radius:inherit;background:linear-gradient(120deg,transparent 20%,rgba(255,255,255,.55) 48%,transparent 72%);transform:translateX(115%);animation:heroShine 7s ease-in-out infinite}.hero-scan{animation:heroScan 6.5s ease-in-out infinite}.hero-primary,.hero-secondary{display:inline-flex;min-height:50px;align-items:center;gap:10px;border-radius:18px;padding:0 22px;font-size:.88rem;font-weight:900;transition:.3s}.hero-primary{background:linear-gradient(135deg,#0876d9,#0aa9ba);color:#fff;box-shadow:0 18px 40px rgba(8,118,217,.24)}.hero-secondary{border:1px solid rgba(8,118,217,.14);background:#fff;color:#0876d9;box-shadow:0 10px 26px rgba(4,77,132,.08)}.hero-primary:hover,.hero-secondary:hover{transform:translateY(-4px)}.consult-universe>div:first-child{animation:universeSpin 20s linear infinite}.consult-universe>div:nth-child(2){animation:universeSpinReverse 15s linear infinite}.consult-aura{animation:auraPulse 4.8s ease-in-out infinite}.consult-core{animation:coreFloat 4.6s ease-in-out infinite}.orbit-icon{animation:orbitFloat 4s ease-in-out infinite}.service-card{position:relative;overflow:hidden;border:1px solid rgba(10,134,199,.1);border-radius:28px;background:#fff;padding:22px;box-shadow:0 22px 60px rgba(3,77,132,.08);transition:.35s}.service-card:hover{transform:translateY(-8px);border-color:rgba(12,170,184,.28);box-shadow:0 32px 82px rgba(3,88,147,.15)}.service-icon{display:grid;height:68px;width:68px;place-items:center;border-radius:20px;color:#fff;box-shadow:0 16px 38px rgba(8,118,217,.2)}.service-action,.primary-button,.secondary-button{min-height:48px;border-radius:17px;padding:0 18px;font-size:.86rem;font-weight:900;transition:.25s}.service-action,.primary-button{background:linear-gradient(135deg,#0876d9,#0aa9ba);color:#fff}.service-action{margin-top:22px;width:100%}.secondary-button{border:1px solid rgba(8,118,217,.14);background:#fff;color:#0876d9}.service-action:hover,.primary-button:hover,.secondary-button:hover{transform:translateY(-3px)}.flow-aside{position:relative;overflow:hidden;padding:28px;color:#fff}.flow-aside::after{content:"";position:absolute;width:230px;height:230px;left:-90px;top:-90px;border:30px solid rgba(255,255,255,.05);border-radius:999px}.blue-panel{background:linear-gradient(145deg,#064f97,#0876d9 55%,#0aa9ba)}.green-panel{background:linear-gradient(145deg,#1f9f63,#16b58b 55%,#0aa9ba)}.select-trigger{margin-top:8px;display:flex;min-height:52px;width:100%;align-items:center;justify-content:space-between;border:1px solid rgba(8,118,217,.15);border-radius:18px;background:#f7fcff;padding:0 16px;color:#315f7a;font-size:.88rem;font-weight:900}.select-menu{position:absolute;z-index:40;top:calc(100% + 8px);right:0;left:0;max-height:260px;overflow-y:auto;border:1px solid rgba(8,118,217,.12);border-radius:18px;background:#fff;padding:8px;box-shadow:0 22px 55px rgba(3,77,132,.16)}.select-option{width:100%;border-radius:12px;padding:11px 12px;text-align:right;color:#416c85;font-size:.84rem;font-weight:800}.select-option:hover{background:#effcfc;color:#0876d9}.doctor-card{border:1px solid rgba(10,134,199,.1);border-radius:24px;background:linear-gradient(135deg,#f9fdff,#fff);padding:20px;box-shadow:0 18px 45px rgba(3,77,132,.08)}.doctor-avatar{display:grid;height:76px;width:76px;flex-shrink:0;place-items:center;border-radius:22px;background:linear-gradient(135deg,#0876d9,#0aa9ba);color:#fff;box-shadow:0 16px 36px rgba(8,118,217,.2)}.lab-card{width:100%;border:1px solid rgba(10,134,199,.1);border-radius:18px;background:#f7fcff;padding:16px;text-align:right;transition:.25s}.lab-card:hover,.lab-card.selected{transform:translateY(-3px);border-color:rgba(10,169,186,.35);background:#effcfc}.flow-backdrop{animation:backdropIn .22s ease-out both}.flow-dialog{animation:dialogIn .38s cubic-bezier(.2,.85,.25,1.12) both}.icon-pulse{animation:livePulse 1.8s ease-in-out infinite;transform-origin:center}.icon-breathe{animation:breathe 2.4s ease-in-out infinite;transform-origin:center}.icon-wave{stroke-dasharray:18;animation:liquidWave 2.2s linear infinite}@keyframes gridMove{to{background-position:42px 42px}}@keyframes heroShine{0%,45%{transform:translateX(115%)}70%,100%{transform:translateX(-115%)}}@keyframes heroScan{0%,100%{left:-18%;opacity:0}22%{opacity:1}65%{opacity:1}82%{left:112%;opacity:0}}@keyframes universeSpin{to{transform:rotate(360deg)}}@keyframes universeSpinReverse{to{transform:rotate(-360deg)}}@keyframes auraPulse{0%,100%{opacity:.55;transform:scale(.92)}50%{opacity:1;transform:scale(1.08)}}@keyframes coreFloat{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-12px) rotate(1.5deg)}}@keyframes orbitFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-7px) scale(1.05)}}@keyframes backdropIn{from{opacity:0}to{opacity:1}}@keyframes dialogIn{from{opacity:0;transform:translateY(26px) scale(.94)}to{opacity:1;transform:translateY(0) scale(1)}}@keyframes livePulse{0%,100%{opacity:.55;transform:scale(.85)}50%{opacity:1;transform:scale(1.25)}}@keyframes breathe{0%,100%{opacity:.55;transform:scale(.95)}50%{opacity:1;transform:scale(1.08)}}@keyframes liquidWave{to{stroke-dashoffset:-18}}@media(max-width:640px){.consult-universe{min-height:290px;transform:scale(.9)}.service-card{padding:20px}}@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important}}
      `}</style>
    </main>
  );
}

function InfoBox({ title, value }: { title: string; value: string }) {
  return <div className="rounded-2xl border border-[#0a86c7]/10 bg-white p-4"><p className="text-[11px] font-black text-[#0aa3a7]">{title}</p><p className="mt-1 text-sm font-black leading-6 text-[#416c85]">{value}</p></div>;
}