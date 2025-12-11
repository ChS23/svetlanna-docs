import type { Metadata } from "next";
import "nextra-theme-docs/style.css";
import "../globals.css";

export const metadata: Metadata = {
  title: "OCAC: Optical Computing Academic Course",
  description: "Первый открытый академический курс по оптическим вычислениям от ИТМО",
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
