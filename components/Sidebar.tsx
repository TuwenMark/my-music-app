'use client';

import usePlayer from '@/hooks/usePlayer';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import Box from './Box';
import Library from './Library';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathName = usePathname();
  const player = usePlayer();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: 'Home',
        active: pathName !== '/search',
        href: '/',
      },
      {
        icon: BiSearch,
        label: 'Search',
        active: pathName === '/search',
        href: '/search',
      },
    ],
    [pathName],
  );

  return (
    <div
      className={twMerge(
        `flex h-full`,
        player.activeId ? 'h-[calc(100%-80px)]' : '',
      )}
    >
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((route) => (
              <SidebarItem key={route.label} {...route}></SidebarItem>
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library />
        </Box>
      </div>
      <main className="flex-1 overflow-y-auto py-2 h-full">{children}</main>
    </div>
  );
};

export default Sidebar;
