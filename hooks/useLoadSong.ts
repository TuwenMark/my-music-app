'use client'

import { Song } from '@/types'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const useLoadSong = (song: Song) => {
  if (!song) return

  const supabaseClient = useSupabaseClient()

  const { data } = supabaseClient.storage
    .from('songs')
    .getPublicUrl(song.song_path)

  return data.publicUrl
}

export default useLoadSong
