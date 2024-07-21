// components/Header.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const router = useRouter();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const logout = () => {
    // Implement your logout logic here
    router.push('/'); // Redirect to login page after logout
  };

  return (
    <header className="bg-white text-white shadow2 p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md p-2 mr-4"
        >
          {isSidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-black"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-black"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
        <div className="text-xl font-bold text-black">Dashboard</div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setDropdownVisible(true)}
        onMouseLeave={() => setDropdownVisible(false)}
      >
        <button
          className="flex items-center focus:outline-none"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <span className="ml-2 mr-2 text-black">Daniel Z</span>


        </button>

        {isDropdownVisible && (
          <div
            className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow1 w-44 dark:bg-gray-700"
          >
            <ul className=" bg-white  rounded py-2 px-2 text-sm text-gray-700 dark:text-gray-200">
              <li className='text-black flex items-center gap-1 p-2 hover:bg-gray-700 dark:hover:bg-gray-700 rounded-md dark:hover:text-white'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>

                <a href="#" className="block   ">Profile</a>
              </li>
              <li className= 'text-black flex items-center gap-1 p-2 hover:bg-gray-700 dark:hover:bg-gray-700 rounded-md dark:hover:text-white'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
    </svg>
                <button
                  onClick={logout}
                  className="w-full text-left block "
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
