import React from 'react';
import { Navbar, TextInput, Button, Avatar, Dropdown, DropdownDivider, DropdownItem } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header() {
  const pathv = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.theme);

  console.log("Current theme:", theme); // Log the current theme

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar className={`border-b-2 ${theme === 'dark' ? 'bg-[rgb(16,23,42)] text-gray-200' : 'bg-white text-gray-700'}`}>
      <div className="flex items-center w-full">
        <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Hiruka's</span>
          Blog
        </Link>

        <form className="ml-8" style={{ marginTop: '-10px' }}>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            style={{ width: '250px', marginLeft: '100px' }}
          />
        </form>

        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
          <AiOutlineSearch />
        </Button>

        <Navbar.Collapse>
          <div className="flex flex-col lg:flex-row lg:gap-8 ml-auto mr-36">
            <Navbar.Link as={Link} to="/" className="text-gray-900 dark:text-white hover:text-blue-500" active={pathv === "/"}>
              Home
            </Navbar.Link>
            <Navbar.Link as={Link} to="/about" className="text-gray-900 dark:text-white hover:text-blue-500" active={pathv === "/about"}>
              About
            </Navbar.Link>
            <Navbar.Link as={Link} to="/projects" className="text-gray-900 dark:text-white hover:text-blue-500" active={pathv === "/projects"}>
              Projects
            </Navbar.Link>
          </div>
        </Navbar.Collapse>

        <div className="flex gap-2 ml-auto items-center">
          <Button className="w-12 h-10 hidden sm:inline" color="gray" pill onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? <FaSun /> : <FaMoon />}
          </Button>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user"
                  img={currentUser.profilePicture}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{currentUser.username}</span>
                <span className="block truncate text-sm font-medium">{currentUser.email}</span>
              </Dropdown.Header>
              <Link to='/dashboard?tab=profile'>
                <DropdownItem>Profile</DropdownItem>
              </Link>
              <DropdownDivider />
              <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <Button className="w-20 h-9 px-1 py-0" style={{ background: 'linear-gradient(to right, #8A2BE2, #1E90FF)' }}>
                Sign In
              </Button>
            </Link>
          )}
          <Navbar.Toggle />
        </div>
      </div>
    </Navbar>
  );
}
