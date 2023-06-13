import { create } from "zustand"

type CountState = {
  count: number
  anotherCount: number
  increaseCountByOne: () => void
}

const useSimpleStore = create<CountState>((set) => ({
  count: 0,
  anotherCount: 100,
  increaseCountByOne: () => set((state) => ({ count: state.count + 1 })),
}))

export default useSimpleStore
