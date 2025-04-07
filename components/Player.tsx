'use client'

import useGetSongById from "@/hooks/useGetSongById"
import useLoadSong from "@/hooks/useLoadSong"
import usePlayer from "@/hooks/usePlayer"

const Player = () => {
  // TODO: Optimize this component
  const player = usePlayer()
  console.log(player)
  const {song} = useGetSongById(player.activeId || "")
  const songUrl = song ? useLoadSong(song) : null
  console.log(songUrl)
  if (!song || !songUrl) {
   return null
  }
  return <div className="flex bottom-0 w-full h-[80px] bg-black py-2 px-4">Player!</div>
}

export default Player
