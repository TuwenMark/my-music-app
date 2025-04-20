'use server';

import { ReturnType } from '@/types/types';
import {
  NeteasePlaylistDetail,
  NeteaseResponse,
  NeteaseSongDetail,
  NeteaseSongUrlData,
} from '@/types/types_netease';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { Playlist, Song } from '@/types/types_song';
import fetch from 'node-fetch';
import { loginNetease } from './loginActions';

// Netease cloud music API base URL
const baseUrl = process.env.NETEASE_CLOUD_MUSIC_API_HOST ?? '';

// Localhost agent URL
const proxy = process.env.LOCAL_AGENT_URL ?? '';
const agent = new HttpsProxyAgent(proxy);

export const getDailyRecommendPlaylist = async (): Promise<
  ReturnType<Playlist[]>
> => {
  const url = `${baseUrl}/recommend/resource`;

  // Get netease cookie from database
  const response = await loginNetease();
  if (!response.success || !response.data) {
    console.log('Get cookie error!');
    return { success: false, error: 'Login Netease Cloud failed' };
  }

  const options =
    process.env.NODE_ENV === 'development'
      ? {
          headers: {
            Cookie: response.data,
          },
          agent: agent,
        }
      : {
          headers: {
            Cookie: response.data,
          },
        };
  console.log(options); // for debuggi

  const neteaseResponse = (await fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.log(error))) as NeteaseResponse;

  const playlists = neteaseResponse?.recommend.map((data) => {
    return {
      id: data.id,
      name: data.name,
      image_url: data.picUrl,
      creator: data.creator.nickname,
    } as Playlist;
  });
  return { success: true, data: playlists };
};

export const getPlaylistDetail = async (
  id: string,
): Promise<ReturnType<Playlist>> => {
  if (!id) {
    console.log('There is no playlist id.');
    return { success: false, error: 'Please select a playlist!' };
  }

  const url = new URL(`${baseUrl}/playlist/detail`);
  url.searchParams.append('id', id);
  const options =
    process.env.NODE_ENV === 'development'
      ? {
          agent: agent,
        }
      : {};
  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      const neteasePlaylist = (data as NeteasePlaylistDetail).playlist;
      const songs = neteasePlaylist.tracks.map((track) => {
        return {
          id: track.id,
          name: track.name,
          image_url: track.al.picUrl,
          author: track.ar.map((artist) => artist.name).join(' & '),
        };
      });
      const playlist = {
        id: neteasePlaylist.id,
        name: neteasePlaylist.name,
        image_url: neteasePlaylist.coverImgUrl,
        creator: neteasePlaylist.creator.nickname,
        songs,
      } as Playlist;
      return { success: true, data: playlist };
    })
    .catch((error) => {
      console.log(error);
      return { success: false, error: 'Get playlist detail failed!' };
    });
};

export const getSongUrlById = async (
  id: string,
): Promise<ReturnType<string>> => {
  const url = new URL(`${baseUrl}/song/url`);
  url.searchParams.append('id', encodeURIComponent(id));
  const response = await loginNetease();
  if (!response.success || !response.data) {
    console.log('Get cookie error!');
    return { success: false, error: 'Login netease cloud failed!' };
  }
  const options =
    process.env.NODE_ENV === 'development'
      ? {
          headers: {
            Cookie: response.data,
          },
          agent: agent,
        }
      : {
          headers: {
            Cookie: response.data,
          },
        };
  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      return { success: true, data: (data as NeteaseSongUrlData).data[0].url };
    })
    .catch((error) => {
      console.log(error);
      return { success: false, error: 'Get song failed!' };
    });
};

export const getSongById = async (id: string): Promise<ReturnType<Song>> => {
  const url = new URL(`${baseUrl}/song/detail`);
  url.searchParams.append('ids', id);
  const options = process.env.NODE_ENV === 'development' ? { agent } : {};
  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      const track = (data as NeteaseSongDetail).songs[0];
      const song = {
        id: track.id,
        name: track.name,
        image_url: track.al.picUrl,
        author: track.ar.map((artist) => artist.name).join(' & '),
      } as Song;
      return { success: true, data: song };
    })
    .catch((error) => {
      console.log(error);
      return { success: false, error: 'Get song failed!' };
    });
};
