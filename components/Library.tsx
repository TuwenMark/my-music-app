'use client'

import useAuthModal from '@/hooks/useAuthModel'
import useUploadModal from '@/hooks/useUploadModel'
import { useUser } from '@/hooks/useUser'
import { Song } from '@/types'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'
import MediaItem from './MediaItem'

interface LibraryProps {
  songs: Song[]
}

const Library = ({ songs }: LibraryProps) => {
  const authModal = useAuthModal()
  const { user } = useUser()
  const uploadModal = useUploadModal()

  const onClick = () => {
    if (!user) {
      return authModal.onOpen()
    }
    // TODO: Check for subscription
    return uploadModal.onOpen()
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={26}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col mt-4 px-3 gap-y-2">
        {songs.map((song) => (
          <MediaItem key={song.id} onClick={() => {}} data={song} />
        ))}
      </div>
    </div>
  )
}

export default Library
