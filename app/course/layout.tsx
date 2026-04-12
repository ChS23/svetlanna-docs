import type { Metadata } from "next";
import "nextra-theme-docs/style.css";
import "../globals.css";

export const metadata: Metadata = {
  title: "OCAC: Optical Computing Academic Course",
  description: "The first comprehensive course on optical computing, covering fundamental principles, key technologies, and practical applications. Designed for students, researchers, and professionals interested in the field of optical computing by the CompPhysLab team at ITMO University.",
};

export default function CourseLayout({
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
