'use client'

import usePlayer from '@/hooks/usePlayer'
import { Song } from '@/types'
import { useEffect, useState } from 'react'
import { AiFillForward, AiFillBackward } from 'react-icons/ai'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import useSound from 'use-sound'
import LikeButton from './LikeButton'
import MediaItem from './MediaItem'
import Slider from './Slider'

interface PlayerContentProps {
  song: Song
  songUrl: string
}

const PlayerContent = ({ song, songUrl }: PlayerContentProps) => {
  const player = usePlayer()
  const [volume, setVolume] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)

  const Icon = isPlaying ? BsPauseFill : BsPlayFill
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return
    }

    const currentSong = player.ids.findIndex((id) => id === player.activeId)
    const nextSong = player.ids[currentSong + 1]

    if (!nextSong) {
      return player.setId(player.ids[0])
    }

    player.setId(nextSong)
  }

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return
    }

    const currentSong = player.ids.findIndex((id) => id === player.activeId)
    const previousSong = player.ids[currentSong - 1]

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1])
    }

    player.setId(previousSong)
  }

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
    onend: () => {
      setIsPlaying(false)
      onPlayNext()
    },
    format: ['mp3'],
  })

  useEffect(() => {
    sound?.play()
    return () => {
      sound?.unload()
    }
  }, [sound])

  const handlePlay = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1)
    } else {
      setVolume(0)
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full w-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className="flex items-center justify-end w-full col-auto md:hidden">
        <div
          className="h-10 w-10 p-1 bg-white rounded-full flex items-center justify-center cursor-pointer"
          onClick={handlePlay}
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div className="hidden md:flex justify-center items-center h-full w-full max-w-[722px] gap-x-6">
        <AiFillBackward
          onClick={onPlayPrevious}
          size={30}
          className="text-neutral-400 hover:text-white transition cursor-pointer"
        />
        <div
          onClick={handlePlay}
          className="flex justify-center items-center rounded-full h-10 w-10 p-1 bg-white cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillForward
          onClick={onPlayNext}
          size={30}
          className="text-neutral-400 hover:text-white transition cursor-pointer"
        />
      </div>

      <div className="hidden md:flex justify-end pr-2 w-full">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            size={34}
            className="cursor-pointer"
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  )
}

export default PlayerContent
