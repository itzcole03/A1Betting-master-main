import React from 'react.ts';
import ThemeToggle from './ThemeToggle.ts';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline.ts';
import { Link } from 'react-router-dom.ts';
import { Menu, Transition } from '@headlessui/react.ts';
import { useAuth } from '@/providers/useAuth.ts';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700" key={823091}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" key={220308}>
        <div className="flex h-16 justify-between" key={274959}>
          <div className="flex" key={916621}>
            <div className="flex flex-shrink-0 items-center" key={229999}>
              <Link to="/" key={324051}>
                <img alt="BetPro AI" className="h-8 w-auto" src="/logo.svg" / key={276885}>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4" key={782146}>
            <ThemeToggle / key={862563}>
            <button;
              className="rounded-full bg-white dark:bg-gray-800 p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              type="button"
             key={567712}>
              <span className="sr-only" key={658352}>View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" / key={59286}>
            </button>

            <Menu as="div" className="relative ml-3" key={848800}>
              <Menu.Button className="flex rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none" key={309846}>
                <span className="sr-only" key={658352}>Open user menu</span>
                <UserCircleIcon aria-hidden="true" className="h-8 w-8 text-gray-400" / key={422783}>
              </Menu.Button>
              <Transition;
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
               key={385349}>
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" key={861067}>
                  <Menu.Item key={832046}>
                    {({ active }) => (
                      <Link;
                        className={`${
                          active ? 'bg-gray-100 dark:bg-gray-700' : ''
                        } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                        to="/settings"
                       key={172644}>
                        Settings;
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item key={832046}>
                    {({ active }) => (
                      <button;
                        className={`${
                          active ? 'bg-gray-100 dark:bg-gray-700' : ''
                        } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                        onClick={logout}
                       key={362253}>
                        Sign out;
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}
