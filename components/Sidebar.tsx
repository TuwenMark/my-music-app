'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import Box from './Box'
import SidebarItem from './SidebarItem'
import Library from './Library'
import { Song } from '@/types'

interface SidebarProps {
  children: React.ReactNode
  songs: Song[]
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const pathName = usePathname()

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
    [pathName]
  )

  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((route) => (
              <SidebarItem key={route.label} {...route}></SidebarItem>
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="flex-1 overflow-y-auto py-2 h-full">{children}</main>
    </div>
  )
}

export default Sidebar
