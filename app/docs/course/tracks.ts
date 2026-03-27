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

export const TRACK_COLORS: Record<Track, { bg: string; text: string }> = {
  everyone:    { bg: "bg-green-100 dark:bg-green-900/30",   text: "text-green-700 dark:text-green-300" },
  physicists:  { bg: "bg-blue-100 dark:bg-blue-900/30",    text: "text-blue-700 dark:text-blue-300" },
  programmers: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-300" },
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
