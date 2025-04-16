'use server';

import { LoginResponse, ReturnType } from '@/types/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import fetch from 'node-fetch';

// supabaseClient
const supabaseClient = createServerComponentClient({ cookies });
// Netease cloud music API base URL
const baseUrl = process.env.NETEASE_CLOUD_MUSIC_API_HOST ?? '';

// Visitor login
export const loginNetease = async (): Promise<ReturnType<string>> => {
  const url = `${baseUrl}/register/anonimous`;

  // Get netease cloud cookie from database
  const { data, error: queryError } = await supabaseClient
    .from('netease_users')
    .select('*')
    .single();
  if (queryError) {
    console.log(queryError);
    return { success: false, error: 'Login failed!' };
  }
  // If exists, return
  if (data) {
    return { success: true, data: data.cookie };
  }

  // If not exists，login netease cloud
  const responseData = await fetch(url, {
    method: 'POST',
  }).then((response) => response.json());
  const loginResponse = responseData as LoginResponse;
  const cookieArray = loginResponse.cookie.replace(/\s+/g, '').split(';');
  const index = cookieArray.findIndex((item) => item.startsWith('MUSIC_A='));

  // Store cookie in the database
  const { error: insertError } = await supabaseClient
    .from('netease_users')
    .insert({
      id: loginResponse.userId,
      cookie: cookieArray[index],
    });
  if (insertError) {
    console.log(insertError);
    return { success: false, error: 'Login failed!' };
  }

  return { success: true, data: cookieArray[index] };
};

export const refreshCookie = async (): Promise<ReturnType<string>> => {
  const url = `${baseUrl}/register/anonimous`;

  // Login netease cloud
  const responseData = await fetch(url, {
    method: 'POST',
  }).then((response) => response.json());
  const loginResponse = responseData as LoginResponse;
  const cookieArray = loginResponse.cookie.replace(/\s+/g, '').split(';');
  const index = cookieArray.findIndex((item) => item.startsWith('MUSIC_A='));

  // Refresh cookie in the database
  const { data } = await supabaseClient
    .from('netease_users')
    .select('*')
    .single();
  const { error: insertError } = await supabaseClient
    .from('netease_users')
    .update({
      cookie: cookieArray[index],
    })
    .eq('id', data?.id);
  if (insertError) {
    console.log(insertError);
    return { success: false, error: 'Login failed!' };
  }

  return { success: true, data: cookieArray[index] };
};
