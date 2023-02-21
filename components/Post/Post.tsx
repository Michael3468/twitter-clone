/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, FC } from 'react';
import Moment from 'react-moment';
import { useRecoilState } from 'recoil';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';

import { modalState, postIdState } from '../../atoms/modalAtom';

import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';

import styles from './post.module.css';

export interface IPost {
  id: string;
  userImage: string;
  username: string;
  tag: string;
  timestamp: any;
  text: string;
  image: string;
  data: () => IPost;
}

interface IPostProps {
  id: string;
  post: IPost;
  postPage?: boolean;
}

const Post: FC<IPostProps> = ({ id, post, postPage }) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState<boolean>(modalState);
  const [postId, setPostId] = useRecoilState<string>(postIdState);
  const [comments, setComments] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [liked, setLiked] = useState<boolean>(false);
  const router = useRouter();

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')),
        (snapshot) => setComments(snapshot.docs),
      ),
    [id],
  );

  useEffect(
    () => onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => setLikes(snapshot.docs)),
    [id],
  );

  useEffect(
    () => setLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1),
    [likes, session?.user?.uid],
  );

  const likePost = async () => {
    if (session !== null) {
      if (liked) {
        await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
      } else {
        await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
          username: session?.user?.name,
        });
      }
    }
  };

  return (
    // TODO max-width on small size
    <div className={styles.post} onClick={() => router.push(`/${id}`)}>
      {!postPage && <img src={post?.userImage} alt='' className={styles.user_avatar} />}
      <div className={styles.body}>
        <div className={`flex ${!postPage && 'justify-between'}`}>
          {postPage && (
            <img src={post?.userImage} alt='Profile pic' className={styles.post_page_user_avatar} />
          )}

          <div className={styles.area}>
            <div className='inline-block group'>
              <h4 className={`${styles.user_name} ${!postPage && 'inline-block'}`}>
                {post?.username}
              </h4>
              <span className={`text-sm sm:text-[15px] ${!postPage && 'ml-1.5'}`}>
                @{post?.tag}
              </span>
            </div>{' '}
            ·{' '}
            <span className={styles.created_time}>
              <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
            </span>
            {!postPage && <p className={styles.text}>{post?.text}</p>}
          </div>

          <div className='icon group flex-shrink-0 ml-auto'>
            <DotsHorizontalIcon className={styles.dots_horizontal_icon} />
          </div>
        </div>

        {postPage && <p className={styles.post_page_text}>{post?.text}</p>}
        <img src={post?.image} alt='' className={styles.image} />
        <div className={`${styles.icons} ${postPage ? 'mx-auto' : ''}`}>
          {/* comments icon */}
          <div
            className='flex items-center space-x-1 group'
            onClick={(e) => {
              e.stopPropagation();
              setPostId(id);
              setIsOpen(true);
            }}
          >
            <div className='icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10 '>
              <ChatIcon className='h-5 group-hover:text-[#1d9bf0]' />
            </div>
            {comments.length > 0 && (
              <span className='group-hover:text-[#1d9bf0] text-sm'>{comments.length}</span>
            )}
          </div>
          {/* comments icon end */}

          {/* trash / share icon */}
          {session?.user?.uid === post?.id ? (
            <div
              className='flex items-center space-x-1 group'
              onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc(db, 'posts', id));
                router.push('/');
              }}
            >
              <div className='icon group-hover:bg-red-600/10'>
                <TrashIcon className='h-5 group-hover:text-red-600' />
              </div>
            </div>
          ) : (
            <div className='flex items-center space-x-1 group'>
              <div className='icon group-hover:bg-green-500/10'>
                <SwitchHorizontalIcon className='h-5 group-hover:text-green-600' />
              </div>
            </div>
          )}
          {/* trash / share icon end */}

          {/* like icon */}
          <div
            className='flex items-center space-x-1 group'
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            <div className='icon group-hover:bg-pink-600/10'>
              {liked ? (
                <HeartIconFilled className='h-5 text-pink-600' />
              ) : (
                <HeartIcon className='h-5 group-hover:text-pink-600' />
              )}
            </div>
            {likes.length > 0 && (
              <span className={`group-hover:text-pink-600 text-sm ${liked && 'text-pink-600'}`}>
                {likes.length}
              </span>
            )}
          </div>
          {/* like icon end */}

          {/* share icon */}
          <div className='icon group'>
            <ShareIcon className='h-5 group-hover:text-[#1d9bf0]' />
          </div>
          {/* share icon end */}

          {/* chat icon */}
          <div className='icon group'>
            <ChartBarIcon className='h-5 group-hover:text-[#1d9bf0]' />
          </div>
          {/* chat icon end */}
        </div>
      </div>
    </div>
  );
};

export default Post;
