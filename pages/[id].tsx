// TODO imports order
import { useRouter } from 'next/router';
import { getProviders, getSession, useSession } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import Head from 'next/head';

import Comment, { IComment } from '../components/Comment/Comment';
import Login from '../components/Login/Login';
import Modal from '../components/Modal/Modal';
import Post, { IPost } from '../components/Post/Post';
import Sidebar from '../components/Sidebar/Sidebar';
import Widgets from '../components/Widgets/Widgets';

import { modalState } from '../atoms/modalAtom';

import followResults from '../components/json/whoToFollow.json';
import trendingResults from '../components/json/whatsHappening.json';

import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';

import { db } from '../firebase';

import { ArrowLeftIcon } from '@heroicons/react/solid';
import { IFollowResults, IProviders, ITrendingResults } from '../types';
import { GetServerSideProps } from 'next';

import globalStyles from '../styles/globals.module.css';

interface IPostPageProps {
  trendingResults: ITrendingResults[];
  followResults: IFollowResults[];
  providers: IProviders;
}

const PostPage: FC<IPostPageProps> = ({ trendingResults, followResults, providers }) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState<boolean>(modalState);
  const [comments, setComments] = useState<IComment[]>([]);
  const [post, setPost] = useState<IPost>({
    id: '',
    userImage: '',
    username: '',
    tag: '',
    timestamp: 0,
    text: '',
    image: '',
    data: () => post,
  });

  const router = useRouter();
  const id = router.query.id as unknown as string;

  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', id), (snapshot: any) => {
        setPost(snapshot.data());
      }),
    [id],
  );

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')),
        (snapshot: any) => setComments(snapshot.docs),
      ),
    [id],
  );

  if (!session) return <Login providers={providers} />;

  return (
    <div className=''>
      <Head>
        <title>{`${post?.username} on Twitter: "${post?.text}"`}</title>
        <link rel='icon' href='favicon.ico' />
      </Head>

      {/* TODO styles to module */}
      <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
        <Sidebar />

        {/* post with comments */}
        <div className='flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]'>
          {/* header */}
          <div className='flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black'>
            <div
              className={`${globalStyles.hoverAnimation} w-9 h-9 flex items-center justify-center xl:px-0`}
              onClick={() => router.push('/')}
            >
              <ArrowLeftIcon className='h-5 text-white' />
            </div>
            Tweet
          </div>
          {/* header end */}

          {post !== null && <Post id={id} post={post} postPage />}

          {/* comments */}
          {comments.length > 0 && (
            <div className='pb-72'>
              {comments.map((comment) => (
                <Comment key={comment.id} id={comment.id} comment={comment.data()} />
              ))}
            </div>
          )}
          {/* comments end */}
        </div>
        {/* post with comments end */}

        <Widgets trendingResults={trendingResults} followResults={followResults} />

        {isOpen && <Modal />}
      </main>
    </div>
  );
};

export default PostPage;

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
