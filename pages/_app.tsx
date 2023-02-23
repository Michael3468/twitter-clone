import { ComponentType, FC } from 'react';
import { RecoilRoot } from 'recoil';
import { SessionProvider } from 'next-auth/react';

import ErrorBoundary from '../components/ErrorBoundary';

import '../styles/globals.css';

type MyAppProps = {
  Component: ComponentType;
  pageProps: {
    session: any;
  };
};

const MyApp: FC<MyAppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}): JSX.Element => {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <Component {...pageProps} />
        </ErrorBoundary>
      </RecoilRoot>
    </SessionProvider>
  );
};

export default MyApp;
