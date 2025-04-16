'use client';

import { Playlist } from '@/types/types_song';
import Image from 'next/image';
import PlayButton from './PlayButton';

interface SongItemProps {
  data: Playlist;
  onClick: (id: string) => void;
}

const SongItem = ({ data, onClick }: SongItemProps) => {
  // const imageUrl = useLoadImage(data.image_path);
  // if (!data || !imageUrl) return null;
  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 hover:bg-neutral-400/10 cursor-pointer transition p-3"
    >
      <div className="relative aspect-square w-full h-full overflow-hidden rounded-md">
        <Image className="object-cover" src={data.image_url} fill alt="image" />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.name}</p>
        <p className="text-neutral-400 text-sm w-full truncate">
          By {data.creator}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
