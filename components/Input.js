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
/* Emoji mart */

function Input() {
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);

  const filePickerRef = useRef(null);

  const addImageToPost = () => {};

  return (
    // del overflow-y-scroll
    <div className={`border-b border-gray-700 p-3 flex space-x-3`}>
      <img src="" alt="" className="h-11 w-11 rounded-full cursor-pointer" />
      <div className="w-full divide-y divide-gray-700">
        <div className={``}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows="2"
            placeholder="What's happening?"
            className="bg-transparent w-full min-h-[50px] outline-none text-[#d9d9d9] text-lg placeholder-gray-700 tracking-wide"
          />

          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className="text-white h-5" />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center relative">
            <div className="icon" onClick={() => filePickerRef.current.click()}>
              <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
              <input
                type="file"
                hidden
                onChange={addImageToPost}
                ref={filePickerRef}
              />
            </div>

            <div className="icon rotate-90">
              <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
              <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            <div className="icon">
              <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            {/* Emoji mart */}
            {showEmojis && (
              <Picker
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
            {/* Emoji mart */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Input;
