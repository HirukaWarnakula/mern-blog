import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { signoutSuccess } from '../redux/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const StyledSidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  color: #ffffff;
  padding-left: 5px; /* Adjust this value as needed to move the icons */
  
  &.active {
    background-color: #4a5568;
    color: #ffffff;
  }
  
  &:hover {
    background-color: #2d3748;
  }
  
  .icon {
    margin-right: 10px;
  }

  margin-bottom: 10px; /* Adjust this value to control the space between items */
`;
export default function DashSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [tab, setTab] = useState('');
    const { theme } = useSelector(state => state.theme);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

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
        <Sidebar className={`sidebar ${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700'}`}>
            <Sidebar.Items>
                <Sidebar.ItemGroup className="flex flex-col gap-5">
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item
                            active={tab === 'profile'}
                            icon={HiUser}
                            label={currentUser.isAdmin ? 'Admin' : 'User'}
                            labelColor='dark'
                            as='div'
                        >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Link to='/dashboard?tab=posts'>
                        <Sidebar.Item
                            active={tab === 'posts'}
                            icon={HiDocumentText}
                            as='div'
                        >
                            Posts
                        </Sidebar.Item>
                    </Link>
                    <StyledSidebarItem className='cursor-pointer' onClick={handleSignout}>
                        <HiArrowSmRight className="icon" />
                        Sign Out
                    </StyledSidebarItem>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
