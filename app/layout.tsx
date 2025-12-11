import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import type { Metadata } from "next";
import "nextra-theme-docs/style.css";

export const metadata: Metadata = {
  title: "Svetlanna Docs",
  description: "Documentation for Svetlanna",
};

const navbar = (
  <Navbar
    logo={<b>Svetlanna</b>}
    projectLink="https://github.com/CompPhysLab/SVETlANNa"
  />
);

const footer = <Footer>MIT {new Date().getFullYear()} © Svetlanna.</Footer>;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          footer={footer}
          editLink={<></>}
          feedback={{ content: <></> }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
