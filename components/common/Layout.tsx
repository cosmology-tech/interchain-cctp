import * as React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { envConfig } from '@/config/env';
import { Header } from './Header';
import { Footer } from './Footer';
import { Container } from './Container';
import { LayoutContext } from '@/contexts/layout.context';

export function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  const [isFaqExpanded, _setIsFaqExpanded] = React.useState(() => (isHomePage ? true : false));

  const setIsFaqExpanded = React.useCallback(
    (isExpanded: boolean) => {
      _setIsFaqExpanded(isExpanded);

      const faqList = document.getElementById('faq-list');

      if (faqList && isExpanded) {
        faqList.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [_setIsFaqExpanded]
  );

  return (
    <>
      <Head>
        <title>{envConfig.appName}</title>
        <meta name="description" content="Interchain CCTP app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <LayoutContext.Provider
        value={{
          isFaqExpanded,
          setIsFaqExpanded
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
