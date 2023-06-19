import { OrderItems } from "types/sales"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

type ItemStore = OrderItems & {
  isChanged: boolean
  deleteItemById: (id: string) => void
  init: (payload: OrderItems) => void
  reset: () => void
}

const useItemStore = create<ItemStore>()(
  devtools((set) => {
    return {
      isChanged: false,
      id: "",
      Items: [],
      deleteItemById: (id) =>
        set(
          (state) => {
            const newItems = state.Items.filter((item) => item.ProductId !== id)
            return {
              Items: newItems,
              isChanged: true,
            }
          },
          false,
          "deleteItemById",
        ),
      init: (payload) =>
        set(
          () => ({
            id: payload.id,
            Items: payload.Items,
            isChanged: false,
          }),
          false,
          "initialize",
        ),
      reset: () =>
        set(() => ({ id: "", Items: [], isChanged: false }), false, "reset"),
    }
  }),
)

export default useItemStore
