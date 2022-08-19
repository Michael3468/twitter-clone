import { useEffect, useState } from 'react';
<<<<<<< HEAD:components/Feed/Feed.js
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';

import Input from '../Input/Input';
import Post from '../Post';
=======
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase';

import Input from './Input';
import Post, { IPost } from './Post';
>>>>>>> develop:components/Feed.tsx

import { SparklesIcon } from '@heroicons/react/outline';
import Spinner from '../Spinner/Spinner';

import styles from './feed.module.css';
import globalstyles from '../../styles/globals.module.css';

function Feed() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot: any) => {
          setPosts(snapshot.docs);
          setLoading(true);
        }
      ),
    [db]
  );

  return (
    <div className={styles.feed}>
      <div className={styles.header}>
        <h2 className={styles.caption}>Home</h2>
        <div className={`${styles.button} ${globalstyles.hoverAnimation}`}>
          <SparklesIcon className={styles.sparkles_icon} />
        </div>
      </div>

      <Input />

      {loading ? (
        <div className="pb-72">
          {posts.map((post) => (
            <Post key={post.id} id={post.id} post={post.data()} />
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Feed;
