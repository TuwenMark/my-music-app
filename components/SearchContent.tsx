'use client'

import { Song } from '@/types'
import MediaItem from './MediaItem'
import LikeButton from './LikeButton'
import useOnPlay from '@/hooks/useOnPlay'

interface SearchContentProps {
  songs: Song[]
}

const SearchContent = ({ songs }: SearchContentProps) => {
  const onPlay = useOnPlay(songs)

  if (!songs || songs.length === 0) {
    return <div className="px-6 text-neutral-400">No songs found.</div>
  }

  return (
    <div className="flex flex-col w-full px-6 gap-y-2">
      {songs.map((song) => {
        return (
          <div key={song.id} className="flex items-center w-full">
            <div className="flex-1">
              <MediaItem onClick={(id: string) => onPlay(id)} data={song} />{' '}
            </div>
            <LikeButton songId={song.id} />
          </div>
        )
      })}
    </div>
  )
}

export default SearchContent
