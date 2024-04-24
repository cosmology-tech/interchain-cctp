import Head from "next/head";
import { Box } from "@interchain-ui/react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Container } from "./Container";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Head>
        <title>Noble Express</title>
        <meta
          name="description"
          content="Noble: The new standard for digital asset issurance"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />

      {children}

      <Footer />
    </Container>
  );
}
