import type { Metadata } from "next";
import "nextra-theme-docs/style.css";
import "../globals.css";

export const metadata: Metadata = {
  title: "SVETlANNa - Simulation of free-space optical set-ups",
  description: "Open-source Python library for simulating free-space optical setups and neuromorphic systems such as Diffractive Neural Networks",
};

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Возвращаем children напрямую без Nextra Layout wrapper
  // Это работает потому что root layout уже предоставляет html/body
  return (
    <div className="x:isolate">
      {children}
    </div>
  );
}
