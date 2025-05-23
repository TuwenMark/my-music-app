import Header from '@/components/Header';
import SongList from '@/components/SongList';
import { getPlaylistDetail } from '@/lib/neteasecloud/songActions';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default async function Playlist({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { success, data: playlist, error } = await getPlaylistDetail(id);

  if (!success) {
    toast.error(error ?? 'Something went wrong!');
  }

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              <Image
                className="object-cover"
                alt="Playlist"
                src={playlist?.image_url ?? '/images/kenan.jpg'}
                fill
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">Playlist</p>
              <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
                {playlist?.name ?? ''}
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <SongList songs={playlist?.songs ?? []} />
    </div>
  );
}
