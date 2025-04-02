'use client'

import Header from '@/components/Header'
import LikedContent from '@/components/LikedContent'
import { getLikedSongs } from '@/lib/likedSongsActions'
import { Song } from '@/types'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Liked = () => {
  const [songs, setSongs] = useState<Song[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { success, data, error } = await getLikedSongs()
      if (!success) {
        toast.error(error ?? 'Something went wrong')
      } else {
        setSongs(data ?? [])
      }
    }

    fetchData()
  }, [])

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              <Image
                className="object-cover"
                alt="Playlist"
                src="/images/liked.png"
                fill
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">Playlist</p>
              <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs ?? []} />
    </div>
  )
}

export default Liked
