import * as React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Container } from "./Container";
import { LayoutContext } from "@/contexts/layout.context";

export function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  const [isFaqExpanded, setIsFaqExpanded] = React.useState(() =>
    isHomePage ? true : false
  );

  return (
    <>
      <Head>
        <title>Noble Express</title>
        <meta
          name="description"
          content="Noble: The new standard for digital asset issurance"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <LayoutContext.Provider
        value={{
          isFaqExpanded,
          setIsFaqExpanded,
        }}
      >
        <Container>
          <Header />

          {children}

          <Footer />
        </Container>
      </LayoutContext.Provider>
    </>
  );
}
