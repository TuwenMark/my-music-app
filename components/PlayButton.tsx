import { FaPlay } from 'react-icons/fa'

const PlayButton = () => {
  return (
    <button className="p-4 rounded-full bg-green-500 flex items-center translate translate-y-1/4 drop-shadow-md transition opacity-0 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
      <FaPlay className="text-black" />
    </button>
  )
}

export default PlayButton
