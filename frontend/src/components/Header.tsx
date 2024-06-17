import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href='/'>
        <h1 className="text-2xl font-bold">nFacFy</h1>
          </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="upload" className="hover:text-gray-400 transition duration-300">
                Upload Song
              </Link>
            </li>
            <li>
              <Link href="account" className="hover:text-gray-400 transition duration-300">
                User's Songs
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
