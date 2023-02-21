import { SessionProvider } from 'next-auth/react';
import { ComponentType, FC } from 'react';
import { RecoilRoot } from 'recoil';
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
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
};

export default MyApp;
