/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import Image from 'next/image';
import { DotsHorizontalIcon } from '@heroicons/react/outline';

import styles from './trending.module.css';
import { ITrendingResults } from '../../types';

interface ITrendingProps {
  result: ITrendingResults;
}

const Trending: FC<ITrendingProps> = ({ result }) => {
  return (
    <div className={styles.trending}>
      <div className={styles.inner_block}>
        <h6 className={styles.caption}>{result.heading}</h6>
        <p className={styles.description}>{result.description}</p>
        <p className={styles.tags}>
          Trending with{' '}
          {result.tags.map((tag, index: number) => (
            <span key={index} className='tag'>
              {tag}
            </span>
          ))}
        </p>
      </div>

      {result.img ? (
        <Image
          src={`/img/whatsHappening/${result.img}`}
          width={70}
          height={70}
          objectFit='cover'
          className='rounded-2xl'
          alt=''
        />
      ) : (
        <div className='icon group'>
          <DotsHorizontalIcon className='h-5 text-[#6e767d] group-hover:text-[#1d9bf0]' />
        </div>
      )}
    </div>
  );
};
export default Trending;
