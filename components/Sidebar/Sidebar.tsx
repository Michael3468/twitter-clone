/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from 'next-auth/react';

// TODO rename component.tsx to index.tsx (all components)
import SidebarLink from '../SidebarLink/SidebarLink';

import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';

import styles from './sidebar.module.css';
import globalStyles from '../../styles/globals.module.css';

function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className={styles.sidebar}>
      {/* twitter icon */}
      <div className={`${styles.logo} ${globalStyles.hoverAnimation}`}>
        <FontAwesomeIcon
          style={{
            fontSize: '25px',
            color: 'white',
            width: '40px',
            height: '40px',
          }}
          icon={faTwitter}
        />
      </div>

      {/* links */}
      <div className={styles.navigation}>
        <SidebarLink text='Home' Icon={HomeIcon} active />
        <SidebarLink text='Explore' Icon={HashtagIcon} />
        <SidebarLink text='Notifications' Icon={BellIcon} />
        <SidebarLink text='Messages' Icon={InboxIcon} />
        <SidebarLink text='Bookmarks' Icon={BookmarkIcon} />
        <SidebarLink text='Lists' Icon={ClipboardListIcon} />
        <SidebarLink text='Profile' Icon={UserIcon} />
        <SidebarLink text='More' Icon={DotsCircleHorizontalIcon} />
      </div>

      {/* twitter button */}
      <button className={styles.tweet_button}>Tweet</button>

      {/* user icon */}
      <div
        className={`${styles.user_info} ${globalStyles.hoverAnimation}`}
        onClick={signOut as any}
      >
        <img
          src={session?.user?.image as string | undefined}
          alt=''
          className={styles.user_info_avatar}
        />
        <div className={styles.user_info_text}>
          <h4 className={styles.user_name}>{session?.user?.name}</h4>
          <p className={styles.user_nickname}>@{session?.user?.tag}</p>
        </div>
        <DotsHorizontalIcon className={styles.dots_horizontal_icon} />
      </div>
    </div>
  );
}
export default Sidebar;
