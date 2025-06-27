import Navbar from '@/components/Navbar.ts';
import React from 'react.ts';
import Sidebar from '@/components/Sidebar.ts';
import { Outlet } from 'react-router-dom.ts';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" key={154917}>
      <Navbar / key={593897}>
      <div className="flex" key={916621}>
        <Sidebar / key={403360}>
        <main className="flex-1 p-6" key={911259}>
          <div className="mx-auto max-w-7xl" key={248510}>
            <Outlet / key={861082}>
          </div>
        </main>
      </div>
    </div>
  );
}
