export interface PlanetDef {
  id: string;
  nameAr: string;
  description: string;
  color: string;
  orbitRadius: number;
  /** rad/s — Mercury fastest, Neptune slowest; not to Kepler scale, chosen for a clear, legible animation. */
  angularVelocity: number;
  radius: number;
  startAngle: number;
  hasRing?: boolean;
  isEarth?: boolean;
}

export const SUN = {
  nameAr: "الشمس",
  description: "النجم المركزي للمجموعة الشمسية، ومصدر الضوء والحرارة لكل الكواكب.",
  radius: 30,
};

export const MOON = {
  nameAr: "القمر",
  description: "القمر الطبيعي للأرض، يدور حولها ويؤثر في حركة المد والجزر.",
  orbitRadius: 13,
  angularVelocity: 2.4,
  radius: 2.6,
};

export const PLANETS: PlanetDef[] = [
  {
    id: "mercury",
    nameAr: "عطارد",
    description: "أقرب الكواكب إلى الشمس وأسرعها في الدوران حولها.",
    color: "#9c9a94",
    orbitRadius: 58,
    angularVelocity: 0.9,
    radius: 4,
    startAngle: 0.4,
  },
  {
    id: "venus",
    nameAr: "الزهرة",
    description: "أشد الكواكب حرارة بسبب غلافها الجوي الكثيف.",
    color: "#e0c16c",
    orbitRadius: 82,
    angularVelocity: 0.68,
    radius: 6,
    startAngle: 2.1,
  },
  {
    id: "earth",
    nameAr: "الأرض",
    description: "الكوكب الثالث من الشمس، والوحيد المعروف بوجود حياة عليه.",
    color: "#3f7ac9",
    orbitRadius: 110,
    angularVelocity: 0.55,
    radius: 6.5,
    startAngle: 4.0,
    isEarth: true,
  },
  {
    id: "mars",
    nameAr: "المريخ",
    description: "الكوكب الأحمر، ويُعد أقرب الكواكب شبهاً بالأرض.",
    color: "#c1440e",
    orbitRadius: 136,
    angularVelocity: 0.44,
    radius: 5,
    startAngle: 1.2,
  },
  {
    id: "jupiter",
    nameAr: "المشتري",
    description: "أكبر كواكب المجموعة الشمسية، وله أكبر عدد من الأقمار.",
    color: "#d2a679",
    orbitRadius: 172,
    angularVelocity: 0.3,
    radius: 13,
    startAngle: 5.4,
  },
  {
    id: "saturn",
    nameAr: "زحل",
    description: "يشتهر بحلقاته الجليدية والصخرية البارزة.",
    color: "#e3c078",
    orbitRadius: 210,
    angularVelocity: 0.22,
    radius: 11.5,
    startAngle: 3.3,
    hasRing: true,
  },
  {
    id: "uranus",
    nameAr: "أورانوس",
    description: "كوكب جليدي يميل محوره بزاوية كبيرة جداً.",
    color: "#7fd4d9",
    orbitRadius: 245,
    angularVelocity: 0.16,
    radius: 8,
    startAngle: 0.9,
  },
  {
    id: "neptune",
    nameAr: "نبتون",
    description: "أبعد كواكب المجموعة الشمسية عن الشمس وأشدها رياحاً.",
    color: "#3b5bdb",
    orbitRadius: 278,
    angularVelocity: 0.1,
    radius: 7.8,
    startAngle: 5.9,
  },
];
