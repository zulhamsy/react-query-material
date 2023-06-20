import { OrderItems, ProductItem } from "types/sales"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

type ItemStore = OrderItems & {
  isChanged: boolean
  deleteItemById: (id: string) => void
  addNewItem: (payload: Omit<ProductItem, "ProductId" | "LineTotal">) => void
  editItemById: (
    payload: Omit<ProductItem, "LineTotal" | "ProductName">,
  ) => void
  getItemById: (id: string) => ProductItem
  init: (payload: OrderItems) => void
  reset: () => void
}

const useItemStore = create<ItemStore>()(
  devtools((set, get) => {
    return {
      isChanged: false,
      id: "",
      Items: [],
      getItemById: (id) => {
        const items = get().Items
        return items.filter((item) => item.ProductId === id)[0]
      },
      editItemById: (payload) => {
        set(
          (state) => {
            const newItems = state.Items.map((item) => {
              if (item.ProductId === payload.ProductId) {
                return {
                  ...payload,
                  LineTotal: payload.Quantity * payload.UnitPrice,
                  ProductName: item.ProductName,
                }
              }
              return item
            })
            return {
              Items: newItems,
              isChanged: true,
            }
          },
          false,
          "editItemById",
        )
      },
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
      addNewItem: (payload) => {
        const ProductId = new Date().getTime().toString()
        const LineTotal = payload.Quantity * payload.UnitPrice
        set(
          (state) => ({
            Items: [...state.Items, { ProductId, LineTotal, ...payload }],
            isChanged: true,
          }),
          false,
          "addNewItem",
        )
      },
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
