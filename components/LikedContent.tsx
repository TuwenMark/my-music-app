'use client';

import useOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/types/types_song';
import LikeButton from './LikeButton';
import MediaItem from './MediaItem';

interface LikedContentProps {
  songs: Song[];
}

const LikedContent = ({ songs }: LikedContentProps) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return <div className="w-full px-6 text-neutral-400">No liked songs.</div>;
  }
  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song) => (
        <div className="flex items-center gap-x-4 w-full" key={song.id}>
          <div className="flex-1">
            <MediaItem data={song} onClick={(id: string) => onPlay(id)} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
