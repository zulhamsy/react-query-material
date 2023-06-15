import { OrderItems } from "types/sales"
import { create } from "zustand"

type ItemStore = OrderItems & {
  isChanged: boolean
  deleteItemById: (id: string) => void
  init: (payload: OrderItems) => void
  reset: () => void
}

const useItemStore = create<ItemStore>((set) => {
  return {
    isChanged: false,
    id: "",
    Items: [],
    deleteItemById: (id) =>
      set((state) => {
        const newItems = state.Items.filter((item) => item.ProductId !== id)
        return {
          Items: newItems,
          isChanged: true,
        }
      }),
    init: (payload) =>
      set((state) => ({
        id: payload.id,
        Items: payload.Items,
        isChanged: state.isChanged,
      })),
    reset: () => set(() => ({ id: "", Items: [], isChanged: false })),
  }
})

export default useItemStore
