'use server';

import { LoginResponse, ReturnType } from '@/types/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { cookies } from 'next/headers';
import fetch from 'node-fetch';

// Netease cloud music API base URL
const baseUrl = process.env.NETEASE_CLOUD_MUSIC_API_HOST ?? '';
// Localhost agent URL
const proxy = process.env.LOCAL_AGENT_URL ?? '';
const agent = new HttpsProxyAgent(proxy);

// Visitor login
export const loginNetease = async (): Promise<ReturnType<string>> => {
  // supabaseClient
  const supabaseClient = createServerComponentClient({ cookies });
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
  const options =
    process.env.NODE_ENV === 'development'
      ? {
          method: 'POST',
          agent: agent,
        }
      : {
          method: 'POST',
        };
  const responseData = await fetch(url, options).then((response) =>
    response.json(),
  );
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
  // supabaseClient
  const supabaseClient = createServerComponentClient({ cookies });
  const url = `${baseUrl}/register/anonimous`;

  // Login netease cloud
  const options =
    process.env.NODE_ENV === 'development'
      ? {
          method: 'POST',
          agent: agent,
        }
      : {
          method: 'POST',
        };
  const responseData = await fetch(url, options).then((response) =>
    response.json(),
  );
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
