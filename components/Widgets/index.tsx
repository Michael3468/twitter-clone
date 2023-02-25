import { FC } from 'react';
import Image from 'next/image';

import { SearchIcon } from '@heroicons/react/outline';
import Trending from '../Trending';

import styles from './widgets.module.css';

import { IFollowResults, ITrendingResults } from '../../types';

interface IWidgetsProps {
  trendingResults: ITrendingResults[];
  followResults: IFollowResults[];
}

const Widgets: FC<IWidgetsProps> = ({ trendingResults, followResults }) => {
  return (
    <div className={styles.widgets}>
      {/* search */}
      <div className={styles.search}>
        <div className={styles.search__bar}>
          <SearchIcon className={styles.search__icon} />
          <input type='text' className={styles.search__input} placeholder='Search Twitter' />
        </div>
      </div>
      {/* search end */}

      {/* trending */}
      <div className={styles.trending}>
        <h4 className={styles.trending__caption}>{`What's happening`}</h4>

        {trendingResults.map((result, index: number) => (
          <Trending key={index} result={result} />
        ))}

        <button className={styles.trending__button}>Show more</button>
      </div>
      {/* trending end */}

      {/* follow */}
      <div className={styles.follow}>
        <h4 className={styles.follow__caption}>Who to follow</h4>

        {followResults.map((result, index: number) => (
          <div key={index} className={styles.follow__item}>
            <Image
              src={`/img/whoToFollow/${result.userImg}`}
              alt={result.username}
              width={50}
              height={50}
              objectFit='cover'
              className='rounded-full'
            />
            <div className={styles.follow__item_text}>
              <h4 className={styles.follow__item_text_username}>{result.username}</h4>
              <h5 className={styles.follow__item_text_tag}>{result.tag}</h5>
            </div>
            <button className={styles.follow__item_button}>Follow</button>
          </div>
        ))}

        <button className={styles.follow__button}>Show more</button>
      </div>
      {/* follow end */}
    </div>
  );
};

export default Widgets;
