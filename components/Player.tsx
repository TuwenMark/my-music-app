'use client';

import usePlayer from '@/hooks/usePlayer';
import { refreshAndExecute } from '@/lib/actions';
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

  // TODO: Optimize this param
  useEffect(() => {
    const fetchData = async () => {
      if (!activeId) return null;
      setLoading(true);
      try {
        const {
          success: urlSuccess,
          data: urlData,
          error: urlError,
        } = await refreshAndExecute(() => getSongUrlById(activeId));
        const {
          success: songSuccess,
          data: songData,
          error: songError,
        } = await getSongById(activeId);
        if (!urlSuccess || !songSuccess) {
          return toast.error(urlError ?? songError ?? 'Get song failed!');
        }
        if (urlData && songData) {
          setSongUrl(urlData);
          setSong(songData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeId]);

  // If data unloaded， null
  if (loading || !song || !songUrl) return null;

  return (
    <div className="flex absolute bottom-0 w-full h-[80px] bg-black py-2 px-4">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;
