/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';

import { onSnapshot, doc, addDoc, collection, serverTimestamp } from '@firebase/firestore';

import { Dialog, Transition } from '@headlessui/react';

import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';

import { IPost } from '../Post';

import { modalState, postIdState } from '../../atoms/modalAtom';
import { db } from '../../firebase';

import styles from './modal.module.css';
import globalStyles from '../../styles/globals.module.css';

function Modal() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState<boolean>(modalState);
  const [postId, setPostId] = useRecoilState<string>(postIdState);
  const [post, setPost] = useState<IPost>();
  const [comment, setComment] = useState<string>('');
  const router = useRouter();

  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', postId), (snapshot: any) => {
        setPost(snapshot.data());
      }),
    [postId],
  );

  const sendComment = async (e: any) => {
    e.preventDefault();

    await addDoc(collection(db, 'posts', postId, 'comments'), {
      comment: comment,
      username: session?.user?.name,
      tag: session?.user?.tag,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });

    setIsOpen(false);
    setComment('');

    router.push(`/${postId}`);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className={styles.dialog} onClose={setIsOpen}>
        <div className={styles.transition_childs}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className={styles.dialog_overlay} />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className={styles.modal}>
              <div className={styles.modal_caption}>
                <div
                  className={`${styles.x_icon_button} ${globalStyles.hoverAnimation}`}
                  onClick={() => setIsOpen(false)}
                >
                  <XIcon className={styles.x_icon} />
                </div>
              </div>

              <div className={styles.comments}>
                <div className='w-full'>
                  <div className={styles.user}>
                    <span className={styles.line_between_user_images} />
                    <img src={post?.userImage} alt='' className={styles.user_image} />
                    <div>
                      <div className='inline-block group'>
                        <h4 className={styles.user_name}>{post?.username}</h4>
                        <span className={styles.user_nickname}>@{post?.tag}</span>
                      </div>{' '}
                      ·{' '}
                      <span className={styles.comment_added_time}>
                        <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                      </span>
                      <p className={styles.comment_text}>{post?.text}</p>
                    </div>
                  </div>

                  <div className={styles.new_comment}>
                    <img
                      src={session?.user?.image as string | undefined}
                      alt=''
                      className={styles.new_comment_user_avatar}
                    />

                    <div className={styles.comment_area}>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder='Tweet your replay'
                        rows={2}
                        className={styles.comment_area_text}
                      />

                      <div className={styles.comment_area_icons_buttons}>
                        <div className={styles.comment_area_icons}>
                          <div className='icon'>
                            <PhotographIcon className={styles.icon_style} />
                          </div>

                          <div className='icon rotate-90'>
                            <ChartBarIcon className={styles.icon_style} />
                          </div>

                          <div className='icon'>
                            <EmojiHappyIcon className={styles.icon_style} />
                          </div>

                          <div className='icon'>
                            <CalendarIcon className={styles.icon_style} />
                          </div>
                        </div>

                        <button
                          className={styles.comment_area_buttons}
                          type='submit'
                          onClick={sendComment}
                          disabled={!comment.trim()}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
