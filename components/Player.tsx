'use client';

import usePlayer from '@/hooks/usePlayer';
import { refreshCookie } from '@/lib/neteasecloud/loginActions';
import { getSongById, getSongUrlById } from '@/lib/neteasecloud/songActions';
import { Song } from '@/types/types_song';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PlayerContent from './PlayerContent';

const Player = () => {
  // TODO: Optimize this component
  const { activeId } = usePlayer();
  const [songUrl, setSongUrl] = useState('');
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const { song } = useGetSongById(activeId || '')

  // TODO: Optimize this param
  // const songUrl = useLoadSong(song!)
  useEffect(() => {
    const fetchData = async () => {
      if (!activeId) return null;
      setLoading(true);
      try {
        let urlData = await getSongUrlById(activeId);
        let songData = await getSongById(activeId);
        if (!urlData || !songData) {
          // refresh cookie and retry
          refreshCookie();
          urlData = await getSongUrlById(activeId);
          songData = await getSongById(activeId);
        }
        if (urlData && songData) {
          setSongUrl(urlData);
          setSong(songData);
        }
      } catch (error) {
        toast.error('Song not found!');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeId]);

  // 如果数据未加载完成，返回 null
  if (loading || !song || !songUrl) return null;

  return (
    <div className="flex absolute bottom-0 w-full h-[80px] bg-black py-2 px-4">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;
