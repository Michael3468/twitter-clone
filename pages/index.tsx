import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

import Head from 'next/head';
import Feed from '../components/Feed';
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets/Widgets';

import { ClientSafeProvider, getProviders, getSession, LiteralUnion, useSession } from 'next-auth/react';
import Modal from '../components/Modal';

import followResults from '../components/json/whoToFollow.json';
import trendingResults from '../components/json/whatsHappening.json';
import { FC, useEffect, useState } from 'react';
import { IFollowResults, ITrendingResults } from '../types';
import { BuiltInProviderType } from 'next-auth/providers';
import { GetServerSideProps } from 'next';

interface IHomeProps {
  trendingResults: ITrendingResults[],
  followResults: IFollowResults[],
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null,
}

export const Home:FC<IHomeProps> = ({ trendingResults, followResults, providers }) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState<boolean>(modalState);

  // noscript tag simulation
  const [isJSEnabled, setIsJSEnabled] = useState(false);

  useEffect(() => {
    setIsJSEnabled(true);
  }, []);

  if (!session && isJSEnabled) {
    return <Login providers={providers} />;
  } else if (!isJSEnabled) {
    return <div>This App Works Better With Enabled JavaScript</div>;
  }
  // noscript tag simulation end

  return (
    <div className="">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />

        <Feed />

        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />

        {isOpen && <Modal />}
      </main>
    </div>
  );
}

export default Home;

export const getServerSideProps:GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}
