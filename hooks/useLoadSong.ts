'use client';

import { Song } from '@/types/types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const useLoadSong = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return;
  }

  const { data } = supabaseClient.storage
    .from('songs')
    .getPublicUrl(song.song_path);

  return data.publicUrl;
};

export default useLoadSong;
