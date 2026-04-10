"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export function Comments() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="mt-12 not-prose">
      <Giscus
        repo="ChS23/svetlanna-docs"
        repoId="R_kgDOQmoN-A"
        category="General"
        categoryId="DIC_kwDOQmoN-M4C5anu"
        mapping="url"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        lang="ru"
        loading="lazy"
      />
    </div>
  );
}
