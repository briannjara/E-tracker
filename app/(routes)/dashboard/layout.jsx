"use client";
import React from 'react';
import SideNav from './_components/SideNav';
import DashboardHeader from './_components/DashboardHeader';
import WelcomeMessage from '../../_components/WelcomeMessage';

const DashboardLayout = ({children}) => {
  return (
    <div className='flex bg-gray-900 text-white'>
        <SideNav />
        <div className='flex-1 overflow-y-auto'>
            <DashboardHeader />
            <div className='p-6'>
                <WelcomeMessage />
                {children}
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout;
