/* eslint-disable @next/next/no-img-element */
import SidebarLink from './SidebarLink';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

import { HomeIcon } from '@heroicons/react/solid';
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
import { signOut, useSession } from 'next-auth/react';

function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      {/* twitter icon */}
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
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
      <div className="mt-4 mb-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} active />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>

      {/* twitter button */}
      <button className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
        Tweet
      </button>

      {/* user icon */}
      <div
        className="text-[#d9d9d9] flex items-center justify-center hoverAnimation xl:ml-auto mt-auto py-7"
        onClick={signOut}
      >
        <img
          src={session?.user?.image}
          alt=""
          className="h-10 w-10 rounded-full xl:mr-2.5 bg-black"
        />
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">{session?.user?.name}</h4>
          <p className="text-[#6e767d]">@{session?.user?.tag}</p>
        </div>
        <DotsHorizontalIcon className="h-5 hidden xl:inline ml-3" />
      </div>
    </div>
  );
}
export default Sidebar;
