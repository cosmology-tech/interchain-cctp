import Head from "next/head";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Container } from "./Container";

export function Layout({ children }: { children: React.ReactNode }) {
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

      <Container>
        <Header />

        {children}

        <Footer />
      </Container>
    </>
  );
}
