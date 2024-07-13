import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex justify-between">
        {/* Left Section */}
        <div className="">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Hiruka's</span>
            Blog
          </Link>
        </div>

        {/* Right Section */}
        <div className="">
          {/* Placeholder for right section content */}
        </div>
      </div>
    </div>
  );
}
