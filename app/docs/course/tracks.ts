export type Track = "physicists" | "programmers" | "everyone";

export interface LectureInfo {
  slug: string;
  number: string;
  title: string;
  tracks: Track[];
  description: string;
}

export const TRACK_LABELS: Record<Track, string> = {
  everyone: "For everyone",
  physicists: "For physicists",
  programmers: "For programmers",
};

export const TRACK_STYLES: Record<Track, { bg: string; text: string; darkBg: string; darkText: string }> = {
  everyone: { bg: "#dcfce7", text: "#15803d", darkBg: "rgba(22,101,52,0.3)", darkText: "#86efac" },
  physicists: { bg: "#dbeafe", text: "#1d4ed8", darkBg: "rgba(30,64,175,0.3)", darkText: "#93c5fd" },
  programmers: { bg: "#f3e8ff", text: "#7e22ce", darkBg: "rgba(107,33,168,0.3)", darkText: "#d8b4fe" },
};

export const lectures: LectureInfo[] = [
  {
    slug: "electromagnetic-waves",
    number: "00",
    title: "Maxwell's equations",
    tracks: ["programmers"],
    description: "Foundations of electrodynamics and propagation of electromagnetic waves",
  },
  {
    slug: "fourier-optics",
    number: "01",
    title: "Fourier Optics",
    tracks: ["programmers"],
    description: "Helmholtz equation, Rayleigh-Sommerfeld diffraction integral",
  },
  {
    slug: "angular-spectrum",
    number: "02",
    title: "Angular Spectrum Method",
    tracks: ["programmers"],
    description: "Plane wave decomposition, free-space response function",
  },
  {
    slug: "diffractive-elements",
    number: "03",
    title: "Diffractive Optical Elements",
    tracks: ["everyone"],
    description: "Amplitude and phase modulation, thin lens, diffractive layer, SLM",
  },
  {
    slug: "backpropagation",
    number: "04",
    title: "Backpropagation",
    tracks: ["physicists"],
    description: "Forward and backward pass, common schema",
  },
  {
    slug: "optimization-methods",
    number: "05",
    title: "Optimization Methods",
    tracks: ["physicists"],
    description: "Gradient descent, Adam, SGD",
  },
  {
    slug: "optical-computing",
    number: "06",
    title: "Optical Computers",
    tracks: ["everyone"],
    description: "D2NN, Diffractive Recurrent Neural Networks, Diffractive Convolutional Neural Networks",
  },
];
