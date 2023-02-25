import { useEffect, useState } from 'react';

import Input from '../Input';
import Post, { IPost } from '../Post';
import Spinner from '../Spinner';

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { SparklesIcon } from '@heroicons/react/outline';

import { db } from '../../firebase';

import styles from './feed.module.css';
import globalStyles from '../../styles/globals.module.css';

function Feed() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(
    () =>
      onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot: any) => {
        setPosts(snapshot.docs);
        setLoading(true);
      }),
    [],
  );

  return (
    <div className={styles.feed}>
      <div className={styles.header}>
        <h2 className={styles.caption}>Home</h2>
        <div className={`${styles.button} ${globalStyles.hoverAnimation}`}>
          <SparklesIcon className={styles.sparkles_icon} />
        </div>
      </div>

      <Input />

      {loading ? (
        <div className='pb-72'>
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
