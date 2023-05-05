import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

import Head from 'next/head';
import Feed from '../components/Feed';
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';

import { getProviders, getSession, useSession } from 'next-auth/react';
import Modal from '../components/Modal';

import followResults from '../public/json/whoToFollow.json';
import trendingResults from '../public/json/whatsHappening.json';
import { FC, useEffect, useState } from 'react';
import { IFollowResults, IProviders, ITrendingResults } from '../types';
import { GetServerSideProps } from 'next';

interface IHomeProps {
  trendingResults: ITrendingResults[];
  followResults: IFollowResults[];
  providers: IProviders;
}

export const Home: FC<IHomeProps> = ({ trendingResults, followResults, providers }) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState<boolean>(modalState);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  // noscript tag simulation
  // TODO: move this code to useJSEnabled hook
  const [isJSEnabled, setIsJSEnabled] = useState<boolean>(false);

  useEffect(() => {
    setIsJSEnabled(true);
  }, []);

  if (!isJSEnabled) {
    return <div>This App Works Better With Enabled JavaScript</div>;
  }
  // noscript tag simulation end

  if (isLogin) {
    return <Login providers={providers} />;
  }

  return (
    <div className=''>
      <Head>
        <title>Twitter</title>
        <link rel='icon' href='favicon.ico' />
      </Head>

      <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
        <Sidebar />

        <Feed setIsLogin={setIsLogin} />

        <Widgets trendingResults={trendingResults} followResults={followResults} />

        {isOpen && <Modal setIsLogin={setIsLogin} />}
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
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
};
