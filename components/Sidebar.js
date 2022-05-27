import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
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
    </div>
  );
}
export default Sidebar;
