import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

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
`;

export default function DashSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    const handleSignout = async () => {

        try{
          const res = await fetch('/api/user/signout', {
            method: 'POST',
            
          });
          const data = await res.json();
          if(!res.ok){
            console.log(data.message);
          }else{
            dispatch(signoutSuccess());
      
          }
      
        }catch(error){
          console.log(error.message);
        }
      };

    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        <StyledSidebarItem
                            className={tab === 'profile' ? 'active' : ''}
                        >
                            <HiUser className="icon" />
                            Profile
                        </StyledSidebarItem>
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

