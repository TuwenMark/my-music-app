'use client'

import useGetSongById from '@/hooks/useGetSongById'
import useLoadSong from '@/hooks/useLoadSong'
import usePlayer from '@/hooks/usePlayer'
import PlayerContent from './PlayerContent'

const Player = () => {
  // TODO: Optimize this component
  const { activeId } = usePlayer()
  const { song } = useGetSongById(activeId || '')
  // TODO: Optimize this param
  const songUrl = useLoadSong(song!)
  if (!song || !songUrl) {
    return null
  }
  return (
    <div className="flex absolute bottom-0 w-full h-[80px] bg-black py-2 px-4">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  )
}

export default Player
