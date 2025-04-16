'use client';

import { Playlist } from '@/types/types_song';
import { useRouter } from 'next/navigation';
import SongItem from './SongItem';

interface PageContentProps {
  playlists: Playlist[];
}

const PageContent = ({ playlists }: PageContentProps) => {
  // const onPlay = useOnPlay(songs);
  const router = useRouter();

  if (!playlists || playlists.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">No playlist recommended.</div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {playlists.map((playlist) => (
        <SongItem
          key={playlist.id}
          data={playlist}
          // onClick={(id: string) => onPlay(id)}
          onClick={() => router.push(`/playlist/${playlist.id}`)}
        />
      ))}
    </div>
  );
};

export default PageContent;
