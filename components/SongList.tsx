'use client';

import useOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/types/types_song';
import LikeButton from './LikeButton';
import MediaItem from './MediaItem';

const SongList = ({ songs }: { songs: Song[] }) => {
  const onPlay = useOnPlay(songs);

  if (!songs || songs.length === 0) {
    return <div className="px-6 text-neutral-400">No songs found.</div>;
  }

  return (
    <div className="flex flex-col w-full px-6 gap-y-2">
      {songs.map((song) => {
        return (
          <div key={song.id} className="flex items-center w-full">
            <div className="flex-1">
              <MediaItem onClick={(id: string) => onPlay(id)} data={song} />{' '}
            </div>
            <LikeButton songId={song.id} />
          </div>
        );
      })}
    </div>
  );
};

export default SongList;
