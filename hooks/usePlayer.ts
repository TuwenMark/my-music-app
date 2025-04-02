import { create } from 'zustand'

interface PlayerStore {
  ids: string[]
  activeId: string | undefined
  setId: (id: string) => void
  setIds: (ids: string[]) => void
  reset: () => void
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id) => set({ activeId: id }),
  setIds: (ids) => set({ ids: ids }),
  reset: () => set({ activeId: undefined, ids: [] }),
}))

export default usePlayer
