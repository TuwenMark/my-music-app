'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { ReturnType, Song } from '@/types';

export const getLikedSong = async (
  songId: string,
  userId: string,
): Promise<ReturnType<Song>> => {
  const supabaseClient = createServerComponentClient({ cookies });

  if (!songId || !userId)
    return { success: false, error: 'Please login first!' };

  const { data, error } = await supabaseClient
    .from('liked_songs')
    .select('*')
    .eq('song_id', songId)
    .eq('user_id', userId);

  if (error) {
    console.log(error.message);
    return { success: false, error: 'Internal error' };
  }

  return { success: true, data: data[0] };
};

export const removeLikedSong = async (
  songId: string,
): Promise<ReturnType<void>> => {
  const supabaseClient = createServerComponentClient({ cookies });
  const { data: sessionData, error: sessionError } =
    await supabaseClient.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return { success: false, error: 'Internal error!' };
  }

  if (!sessionData.session?.user.id) {
    return { success: false, error: 'Please login first!' };
  }

  const { error } = await supabaseClient
    .from('liked_songs')
    .delete()
    .eq('song_id', songId)
    .eq('user_id', sessionData.session?.user.id)
    .single();

  if (error) {
    console.log(error.message);
    return { success: false, error: 'Internal error!' };
  }

  return { success: true };
};

export const addLikedSong = async (
  songId: string,
): Promise<ReturnType<void>> => {
  const supabaseClient = createServerComponentClient({ cookies });
  const { data: sessionData, error: sessionError } =
    await supabaseClient.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return { success: false, error: 'Internal error!' };
  }

  if (!sessionData.session?.user.id) {
    return { success: false, error: 'Please login first!' };
  }

  const { error } = await supabaseClient.from('liked_songs').insert({
    song_id: songId,
    user_id: sessionData.session?.user.id,
  });

  if (error) {
    console.log(error.message);
    return { success: false, error: 'Internal error!' };
  }

  return { success: true };
};

export const getLikedSongs = async (): Promise<ReturnType<Song[]>> => {
  const supabaseClient = createServerComponentClient({ cookies });
  const { data: sessionData, error: sessionError } =
    await supabaseClient.auth.getSession();
  if (sessionError) {
    console.log(sessionError.message);
    return { success: false, error: 'Internal error!' };
  }

  const userId = sessionData.session?.user.id;
  if (!userId) {
    return { success: false, error: 'Please login first!' };
  }

  const { data, error } = await supabaseClient
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', userId);
  if (error) {
    console.log(error.message);
    return { success: false, error: 'Internal error!' };
  }

  return {
    success: true,
    data: data.map((item) => ({ ...item.songs })),
  };
};
