import { useRouter } from 'next/router';
import { getProviders, getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import Head from 'next/head';

import Comment from '../components/Comment';
import Login from '../components/Login';
import Modal from '../components/Modal';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets/Widgets';

import { modalState } from '../atoms/modalAtom';

import followResults from '../components/json/whoToFollow.json';
import trendingResults from '../components/json/whatsHappening.json';

import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

import { db } from '../firebase';

import { ArrowLeftIcon } from '@heroicons/react/solid';

function PostPage({ trendingResults, followResults, providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', id), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  if (!session) return <Login providers={providers} />;

  return (
    <div className="">
      <Head>
        <title>{`${post?.username} on Twitter: "${post?.text}"`}</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />

        {/* post with comments */}
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
          {/* header */}
          <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
            <div
              className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
              onClick={() => router.push('/')}
            >
              <ArrowLeftIcon className="h-5 text-white" />
            </div>
            Tweet
          </div>
          {/* header end */}

          <Post id={id} post={post} postPage />
          {/* comments */}
          {comments.length > 0 && (
            <div className="pb-72">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  comment={comment.data()}
                />
              ))}
            </div>
          )}
          {/* comments end */}
        </div>
        {/* post with comments end */}

        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />

        {isOpen && <Modal />}
      </main>
    </div>
  );
}
export default PostPage;

export async function getServerSideProps(context) {
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
