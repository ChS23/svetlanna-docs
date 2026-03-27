export type Track = "physicists" | "programmers" | "everyone";

export interface LectureInfo {
  slug: string;
  number: string;
  title: string;
  tracks: Track[];
  description: string;
}

export const TRACK_LABELS: Record<Track, string> = {
  everyone: "Для всех",
  physicists: "Для физиков",
  programmers: "Для программистов",
};

export const TRACK_STYLES: Record<Track, { bg: string; text: string; darkBg: string; darkText: string }> = {
  everyone:    { bg: "#dcfce7", text: "#15803d", darkBg: "rgba(22,101,52,0.3)",  darkText: "#86efac" },
  physicists:  { bg: "#dbeafe", text: "#1d4ed8", darkBg: "rgba(30,64,175,0.3)",  darkText: "#93c5fd" },
  programmers: { bg: "#f3e8ff", text: "#7e22ce", darkBg: "rgba(107,33,168,0.3)", darkText: "#d8b4fe" },
};

export const lectures: LectureInfo[] = [
  {
    slug: "electromagnetic-waves",
    number: "00",
    title: "Уравнения Максвелла",
    tracks: ["programmers"],
    description: "Основы электродинамики и распространение электромагнитных волн",
  },
  {
    slug: "fourier-optics",
    number: "01",
    title: "Фурье-оптика",
    tracks: ["programmers"],
    description: "Уравнение Гельмгольца, интеграл дифракции Рэлея-Соммерфельда",
  },
  {
    slug: "angular-spectrum",
    number: "02",
    title: "Метод углового спектра",
    tracks: ["programmers"],
    description: "Разложение по плоским волнам, функция отклика свободного пространства",
  },
  {
    slug: "diffractive-elements",
    number: "03",
    title: "Дифракционные оптические элементы",
    tracks: ["everyone"],
    description: "Амплитудная и фазовая модуляция, тонкая линза, дифракционный слой, SLM",
  },
  {
    slug: "backpropagation",
    number: "04",
    title: "Алгоритм обратного распространения",
    tracks: ["physicists"],
    description: "Forward и backward pass, вычисление градиентов, дельта-правило",
  },
  {
    slug: "optimization-methods",
    number: "05",
    title: "Методы оптимизации",
    tracks: ["physicists"],
    description: "Градиентный спуск, Adam, SGD, RMSProp",
  },
  {
    slug: "optical-computing",
    number: "06",
    title: "Оптические вычислители",
    tracks: ["everyone"],
    description: "D2NN, рекуррентные и свёрточные дифракционные сети",
  },
];
