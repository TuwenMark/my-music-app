'use client'

import { getSongById } from '@/lib/songActions'
import { Song } from '@/types'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const useGetSongById = (id: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [song, setSong] = useState<Song | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const { success, data, error } = await getSongById(id)
      if (!success) {
        return toast.error(error ?? 'Something went wrong')
      }

      setSong(data)
      setIsLoading(false)
    }

    fetchData()
  }, [id])

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  )
}

export default useGetSongById
