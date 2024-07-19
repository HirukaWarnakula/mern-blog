import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledSidebarItem = styled(Sidebar.Item)`
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
`;

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        <StyledSidebarItem
                            active={tab === 'profile'}
                            icon={HiUser}
                            className={tab === 'profile' ? 'active' : ''}
                        >
                            Profile
                        </StyledSidebarItem>
                    </Link>
                    <StyledSidebarItem icon={HiArrowSmRight} className='cursor-pointer'>
                        Sign Out
                    </StyledSidebarItem>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}