import Header from '@/components/Header'
import SearchContent from '@/components/SearchContent'
import SearchInput from '@/components/SearchInput'
import { getSongsByTitle } from '@/lib/songActions'
import { SearchParams } from 'next/dist/server/request/search-params'

interface SearchProps {
  searchParams: Promise<SearchParams>
}

export const revalidate = 0

const Search = async ({ searchParams }: SearchProps) => {
  const params = await searchParams
  const songs = await getSongsByTitle(params?.title?.toString() ?? '');

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white font-semibold text-3xl">Search</h1>
          <SearchInput />
          <SearchContent songs={songs} />
        </div>
      </Header>
    </div>
  )
}

export default Search
