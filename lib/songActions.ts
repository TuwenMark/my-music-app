'use server';

import { ReturnType } from '@/types/types';
import { Song } from '@/types/types_song';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const getSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return data || [];
};

export const getSongsByUserId = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies });
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  // TODO: feedback with error message if user is not logged in
  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', sessionData.session?.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return data ?? [];
};

export const getSongsByTitle = async (title: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies });
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (!title) {
    return await getSongs();
  }

  // TODO: feedback with error message if user is not logged in
  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('title', `%${title}%`)
    .eq('user_id', sessionData.session?.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return data || [];
};

export const getSongById = async (id: string): Promise<ReturnType<Song>> => {
  if (!id) {
    return { success: false, error: 'Params error' };
  }
  const supabaseClient = createServerComponentClient({ cookies });
  const { data, error } = await supabaseClient
    .from('songs')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    console.log(error.message);
    return { success: false, error: 'Internal error' };
  }
  if (!data) {
    return { success: false, error: 'Song not found' };
  }
  return { success: true, data: data };
};
