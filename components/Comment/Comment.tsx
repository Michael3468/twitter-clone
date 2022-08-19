/* eslint-disable @next/next/no-img-element */

import Moment from 'react-moment';

import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
} from '@heroicons/react/outline';
import { FC } from 'react';

import styles from './comment.module.css';

export interface IComment {
  userImage: string,
  username: string,
  tag: string,
  timestamp: any,
  comment: string,
  id: string,
}

interface ICommentProps {
  id: string,
  comment: IComment,
}

const Comment:FC<ICommentProps> = ({ id, comment }) => {
  return (
    <div className={styles.comment}>
      <img src={comment?.userImage} alt="" className={styles.image} />
      <div className={styles.comment_body}>
        {/* comment */}
        <div className={styles.comment_block}>
          <div className={styles.comment_text}>
            <div className={styles.comment_userinfo}>
              <h4 className={styles.comment_username}>{comment?.username}</h4>
              <span className={styles.comment_usertag}>@{comment?.tag} </span>
            </div>{' '}
            ·{' '}
            <span className={styles.timestamp}>
              <Moment fromNow>{comment?.timestamp.toDate()}</Moment>
            </span>
            <p className={styles.message}>
              {comment?.comment}
            </p>
          </div>
          <div className={styles.dots_icon_block}>
            <DotsHorizontalIcon className={styles.dots_icon} />
          </div>
        </div>
        {/* comment end */}

        {/* menu icons */}
        <div className={styles.icon_menu}>
          <div className={styles.chat_icon_block}>
            <ChatIcon className={styles.icon} />
          </div>

          <div className={styles.heart_icon_group}>
            <div className={styles.heart_icon_block}>
              <HeartIcon className={styles.heart_icon} />
            </div>
            <span className={styles.heart_icon_counter}></span>
          </div>

          <div className={styles.chat_icon_group}>
            <ShareIcon className={styles.icon} />
          </div>

          <div className={styles.chat_icon_group}>
            <ChartBarIcon className={styles.icon} />
          </div>
        </div>
        {/* menu icons end */}
      </div>
    </div>
  );
}
export default Comment;
