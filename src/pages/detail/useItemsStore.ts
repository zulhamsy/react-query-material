import { OrderItems } from "types/sales"
import { create } from "zustand"

type ItemStore = OrderItems & {
  deleteItemById: (id: string) => void
  init: (payload: OrderItems) => void
  reset: () => void
}

const useItemStore = create<ItemStore>((set) => {
  return {
    OrderItemsId: "",
    Items: [],
    deleteItemById: (id) =>
      set((state) => {
        const newItems = state.Items.filter((item) => item.ProductId !== id)
        return {
          Items: newItems,
        }
      }),
    init: (payload) =>
      set(() => ({
        OrderItemsId: payload.OrderItemsId,
        Items: payload.Items,
      })),
    reset: () => set(() => ({ OrderItemsId: "", Items: [] })),
  }
})

export default useItemStore
