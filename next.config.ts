import type { NextConfig } from "next";
import nextra from "nextra";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './mdx-components.js'
    }
  }
};

const withNextra = nextra({
});

export default withNextra(nextConfig);
