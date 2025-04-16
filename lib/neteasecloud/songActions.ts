'use server';

import {
  NeteasePlaylistDetail,
  NeteaseResponse,
  NeteaseSongDetail,
  NeteaseSongUrlData,
} from '@/types/types_netease';
import { Playlist, Song } from '@/types/types_song';
import fetch from 'node-fetch';
import { loginNetease } from './loginActions';

// Netease cloud music API base URL
const baseUrl = process.env.NETEASE_CLOUD_MUSIC_API_HOST ?? '';

export const getDailyRecommendPlaylist = async (): Promise<Playlist[]> => {
  const url = `${baseUrl}/recommend/resource`;

  // Get netease cookie from database
  const response = await loginNetease();
  if (!response.success || !response.data) {
    console.log('Get cookie error!');
    return [];
  }

  const neteaseResponse = (await fetch(url, {
    headers: {
      Cookie: response.data,
    },
  })
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
  return playlists;
};

export const getPlaylistDetail = async (
  id: string,
): Promise<Playlist | null> => {
  if (!id) {
    return null;
  }

  const url = new URL(`${baseUrl}/playlist/detail`);
  url.searchParams.append('id', id);
  return fetch(url, {})
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
      return {
        id: neteasePlaylist.id,
        name: neteasePlaylist.name,
        image_url: neteasePlaylist.coverImgUrl,
        creator: neteasePlaylist.creator.nickname,
        songs,
      } as Playlist;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const getSongUrlById = async (id: string): Promise<string> => {
  const url = new URL(`${baseUrl}/song/url`);
  url.searchParams.append('id', encodeURIComponent(id));
  const response = await loginNetease();
  if (!response.success || !response.data) {
    console.log('Get cookie error!');
    return '';
  }
  return fetch(url, {
    headers: {
      Cookie: response.data,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return (data as NeteaseSongUrlData).data[0].url;
    })
    .catch((error) => {
      console.log(error);
      return '';
    });
};

export const getSongById = async (id: string): Promise<Song | null> => {
  const url = new URL(`${baseUrl}/song/detail`);
  url.searchParams.append('ids', id);
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const track = (data as NeteaseSongDetail).songs[0];
      return {
        id: track.id,
        name: track.name,
        image_url: track.al.picUrl,
        author: track.ar.map((artist) => artist.name).join(' & '),
      } as Song;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};
