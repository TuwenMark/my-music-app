import Link from 'next/link'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

interface SidebarItemProps {
  icon: IconType
  label: string
  active?: boolean
  href: string
}

const SidebarItem = ({ icon: Icon, label, active, href }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex flex-row h-auto w-full items-center gap-x-4 font-medium text-neutral-400 cursor-pointer hover:text-white transition py-1`,
        active && 'text-white'
      )}
    >
      <Icon size={26} />
      <p className="truncate w-full">{label}</p>
    </Link>
  )
}

export default SidebarItem
