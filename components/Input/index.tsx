/* eslint-disable @next/next/no-img-element */
import { ChangeEventHandler, FC, LegacyRef, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';

/* Emoji mart */
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
/* Emoji mart end */

/* firebase */
import { db, storage } from '../../firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
/* firebase end */

import styles from './input.module.css';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

type Props = {
  setIsLogin: (value: boolean) => void;
}

const Input: FC<Props> = ({ setIsLogin }) => {
  const [input, setInput] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(null);
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const filePickerRef = useRef<HTMLDivElement | HTMLInputElement>(null);
  const { data: session } = useSession();

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      id: session?.user?.uid,
      username: session?.user?.name,
      userImage: session?.user?.image,
      tag: session?.user?.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile as string, 'data_url').then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadUrl,
        });
      });
    }

    setLoading(false);
    setInput('');
    setSelectedFile(null);
    setShowEmojis(false);
  };

  const addImageToPost = (e: HTMLInputEvent) => {
    const reader = new FileReader();

    const file = e?.target.files && e?.target.files[0] ? e?.target.files[0] : null;

    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target) {
        setSelectedFile(readerEvent.target.result);
      }
    };
  };

  const addEmoji = (e: any) => {
    let sym = e.unified.split('-');
    console.log('sym: ', sym);
    let codesArray: string[] = [];
    sym.forEach((el: string) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(Number(...codesArray));
    setInput(input + emoji);
  };

  const handleLogin = () => {
    setIsLogin(true);
  }

  return (
    <div className={`${styles.input} ${loading && 'opacity-60'}`}>
      <img
        src={session?.user?.image as string | undefined}
        alt=''
        className={session ? styles.image : ''}
      />

      <div className={styles.message_block}>
        <div className={`${selectedFile && 'pb-7'} ${input && 'space-y-2.5'}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
            placeholder="What's happening?"
            className={styles.textarea}
          />

          {selectedFile && (
            <div className='relative'>
              {/* TODO: rename xicon */}
              <div className={styles.xicon_block} onClick={() => setSelectedFile(null)}>
                <XIcon className={styles.xicon} />
              </div>
              <img
                src={selectedFile as string | undefined}
                alt=''
                className={styles.selected_image}
              />
            </div>
          )}
        </div>

        {!loading && (
          <div className={styles.icons_and_button}>
            <div className={styles.icons}>
              <div className='icon' onClick={() => filePickerRef?.current?.click()}>
                <PhotographIcon className={styles.icon_text} />
                <input
                  type='file'
                  hidden
                  onChange={addImageToPost as unknown as ChangeEventHandler<HTMLInputElement>}
                  ref={filePickerRef as unknown as LegacyRef<HTMLInputElement>}
                />
              </div>

              <div className='icon rotate-90'>
                <ChartBarIcon className={styles.icon_text} />
              </div>

              <div className='icon' onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiHappyIcon className={styles.icon_text} />
              </div>

              <div className='icon'>
                <CalendarIcon className={styles.icon_text} />
              </div>

              {/* Emoji mart */}
              {showEmojis && (
                <Picker
                  onSelect={addEmoji}
                  style={{
                    position: 'absolute',
                    marginTop: '465px',
                    marginLeft: -40,
                    maxWidth: '320px',
                    borderRadius: '20px',
                    zIndex: 10,
                  }}
                  theme='dark'
                />
              )}
              {/* Emoji mart end */}
            </div>
            {session ? (
              <button
                className={styles.input_button}
                disabled={!input.trim() && !selectedFile}
                onClick={sendPost}
              >
                Tweet
              </button>
            ) : (
              <button className={styles.input_button} onClick={handleLogin}>Log In</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default Input;
