'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {FaTasks ,FaHome,  FaUser, FaSignOutAlt, FaClipboardList, FaCheckCircle, FaExclamationCircle , FaTimes,FaBars} from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { id } = useParams<{ id: string }>();



const menu = [
  { label: 'Dashboard', icon: <FaHome />, href: `/dashboard/${id}` },
  { label: 'Profile', icon: <FaUser />, href: `/dashboard/${id}?section=profile` },
  { label: 'Todo', icon: <FaClipboardList />, href: `/dashboard/${id}?section=todo` }, 
  { label: 'Pending', icon: <FaExclamationCircle />, href: `/dashboard/${id}?section=pending` },  
  { label: 'Complete', icon: <FaCheckCircle />, href: `/dashboard/${id}?section=complete` },  
  { label: 'Logout', icon: <FaSignOutAlt />, href: `/logout` },
];

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace('/');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-900 text-white rounded-md"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div className={`bg-blue-300 text-black min-h-screen w-60 p-6 fixed left-0 top-0 z-40 transition-all duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
     <h2 className="text-2xl text-blue-950 font-bold mb-10 inline-flex items-center">
  <FaTasks className="mr-2" /> My Tasks
</h2>

        <ul className="space-y-4">
          {menu.map((item, index) => (
            <li key={index}>
              {item.label === 'Logout' ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 cursor-pointer hover:bg-blue-700 hover:text-white p-2 rounded transition-all w-full text-left"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center gap-3 hover:bg-blue-700 hover:text-white p-2 rounded transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
