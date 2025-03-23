import Header from '@/components/Header'
import SearchInput from '@/components/SearchInput'
import { getSongsByTitle } from '@/lib/songActions'

interface SearchProps {
  searchParams: {
    title: string
  }
}

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams?.title)

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white font-semibold text-3xl">Search</h1>
          <SearchInput />
        </div>
      </Header>
    </div>
  )
}

export default Search
