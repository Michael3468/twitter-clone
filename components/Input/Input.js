/* eslint-disable @next/next/no-img-element */
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';

import { useRef, useState } from 'react';

/* Emoji mart */
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
/* Emoji mart end */

/* firebase */
import { db, storage } from '../../firebase';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { useSession } from 'next-auth/react';
/* firebase end */

import styles from './input.module.css';

function Input() {
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);
  const { data: session } = useSession();

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      id: session.user.uid,
      username: session.user.name,
      userImage: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
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

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const addEmoji = (e) => {
    let sym = e.unified.split('-');
    console.log('sym: ', sym);
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  return (
    <div className={`${styles.input} ${loading && 'opacity-60'}`}>
      <img src={session.user.image} alt="" className={styles.image} />
      <div className={styles.message_block}>
        <div className={`${selectedFile && 'pb-47'} ${input && 'space-y-2.5'}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows="2"
            placeholder="What's happening?"
            className={styles.textarea}
          />

          {selectedFile && (
            <div className="relative">
              <div
                className={styles.xicon_block}
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className={styles.xicon} />
              </div>
              <img
                src={selectedFile}
                alt=""
                className={styles.selected_image}
              />
            </div>
          )}
        </div>

        {!loading && (
          <div className={styles.icons_and_button}>
            <div className={styles.icons}>
              <div
                className="icon"
                onClick={() => filePickerRef.current.click()}
              >
                <PhotographIcon className={styles.icon_text} />
                <input
                  type="file"
                  hidden
                  onChange={addImageToPost}
                  ref={filePickerRef}
                />
              </div>

              <div className="icon rotate-90">
                <ChartBarIcon className={styles.icon_text} />
              </div>

              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiHappyIcon className={styles.icon_text} />
              </div>

              <div className="icon">
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
                  theme="dark"
                />
              )}
              {/* Emoji mart end */}
            </div>
            <button
              className={styles.input_button}
              disabled={!input.trim() && !selectedFile}
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Input;
