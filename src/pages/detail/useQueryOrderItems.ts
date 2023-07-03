import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { OrderItems } from "types/sales"
import useItemStore from "./useStoreItems"

export default function useQueryOrderItems(orderItemId?: string) {
  const query = useQuery(
    ["itemsOrder", orderItemId],
    async (): Promise<OrderItems> => {
      const res = await fetch(`http://localhost:3000/items?id=${orderItemId}`)
      const data = await res.json()
      if (data.length) return data[0]
      throw new Error('Items not found')
    },
    {
      staleTime: Infinity,
      enabled: Boolean(orderItemId),
      useErrorBoundary: true,
      retry: 1
    },
  )

  return query
}

export function useMutateItem() {
  const { updatedItems, itemsId } = useItemStore((state) => ({
    updatedItems: state.Items,
    itemsId: state.id,
  }))
  const queryClient = useQueryClient()
  const itemMutation = useMutation(
    async (): Promise<OrderItems> => {
      const res = await fetch(`http://localhost:3000/items/${itemsId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Items: updatedItems }),
      })
      return res.json()
    },
    {
      onSuccess: (data) =>
        queryClient.invalidateQueries(["itemsOrder", data.id]),
    },
  )

  return itemMutation
}
