'use client'

import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types'
import Image from 'next/image'

interface MediaItem {
  data: Song
  onClick?: (id: string) => void
}

const MediaItem = ({ data, onClick }: MediaItem) => {
  const imageUrl = useLoadImage(data.image_path)
  const handleClick = () => {
    if (onClick) return onClick(data.id)

    // TODO: Default turn on player
  }
  return (
    <div
      className="flex items-center gap-x-3 w-full p-2 cursor-pointer hover:bg-neutral-800/50 rounded-md"
      onClick={handleClick}
    >
      <div className="relative min-w-[48px] min-h-[48px] rounded-md overflow-hidden">
        <Image className="object-cover" src={imageUrl} fill alt="image" />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">{data.author}</p>
      </div>
    </div>
  )
}

export default MediaItem
