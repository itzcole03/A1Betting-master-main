import React from 'react.ts';
import { Outlet } from 'react-router-dom.ts';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" key={117216}>
      <div className="max-w-md w-full space-y-8" key={78851}>
        <div key={241917}>
          <img alt="BetPro AI" className="mx-auto h-12 w-auto" src="/logo.svg" / key={884124}>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white" key={418668}>
            BetPro AI;
          </h2>
        </div>
        <Outlet / key={861082}>
      </div>
    </div>
  );
}
