import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';

import Input from '../Input/Input';
import Post from '../Post';

import { SparklesIcon } from '@heroicons/react/outline';
import Spinner from '../Spinner/Spinner';

import styles from './feed.module.css';
import globalstyles from '../../styles/globals.module.css';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
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
