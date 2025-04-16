import Header from '@/components/Header';
import ListItem from '@/components/ListItem';
import PageContent from '@/components/PageContent';
import { getDailyRecommendPlaylist } from '@/lib/neteasecloud/songActions';
import toast from 'react-hot-toast';

export const revalidate = 0;

export default async function Home() {
  const { success, data, error } = await getDailyRecommendPlaylist();

  if (!success) {
    toast.error(error ?? 'Get daily recommend playlist failed!');
  }

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            ></ListItem>
          </div>
        </div>
        <div className="mt-2 mb-7 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-xl font-semibold">
              Daily Recommend Playlist
            </h1>
          </div>
          <div>
            <PageContent playlists={data ?? []} />
          </div>
        </div>
      </Header>
    </div>
  );
}
