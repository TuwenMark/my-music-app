'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaPlay } from 'react-icons/fa'

interface ListItemProps {
  image: string
  name: string
  href: string
}

const ListItem = ({ image, name, href }: ListItemProps) => {
  const router = useRouter()

  const handleClick = () => {
    // TODO: add authentication check
    router.push(href)
  }

  return (
    <button
      className="group rounded-md bg-neutral-100/10 hover:bg-neutral-100/20 pr-4 relative flex items-center gap-x-4 overflow-hidden transition"
      onClick={handleClick}
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image className="object-cover" fill src={image} alt="image" />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <div className="absolute right-5 flex justify-center items-center rounded-full bg-green-500 p-4 opacity-0 drop-shadow-md group-hover:opacity-100 hover:scale-110 transition">
        <FaPlay className="text-black" />
      </div>
    </button>
  )
}

export default ListItem
