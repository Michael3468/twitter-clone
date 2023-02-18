import { FC } from 'react';

import styles from './sidebarLink.module.css';
import globalStyles from '../../styles/globals.module.css';

type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element;

interface ISidebarLinkProps {
  text: string;
  Icon: HeroIcon;
  active?: any;
}

const SidebarLink: FC<ISidebarLinkProps> = ({ text, Icon, active }) => {
  return (
    <div className={`${styles.link} ${globalStyles.hoverAnimation} ${active && 'font-bold'}`}>
      <Icon className={styles.link_icon} />
      <span className={styles.link_text}>{text}</span>
    </div>
  );
};

export default SidebarLink;
