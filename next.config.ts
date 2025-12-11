import type { NextConfig } from "next";
import nextra from "nextra";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './mdx-components.js'
    }
  }
};

const withNextra = nextra({
  latex: {
    renderer: "katex",
    options: {
      output: "htmlAndMathml",
      strict: "ignore",
      trust: true,
      macros: {
        "\\R": "\\mathbb{R}",
        "\\C": "\\mathbb{C}",
        "\\N": "\\mathbb{N}",
        "\\Z": "\\mathbb{Z}",
        "\\vec": "\\mathbf",
      },
    },
  },
});

export default withNextra(nextConfig);
