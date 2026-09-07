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
  // Return children directly, without the Nextra Layout wrapper.
  // This works because the root layout already provides html/body.
  return (
    <div className="x:isolate">
      {children}
    </div>
  );
}
