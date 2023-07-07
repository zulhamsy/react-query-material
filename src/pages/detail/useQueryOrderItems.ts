import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { OrderItems } from "types/sales"
import useItemStore from "./useStoreItems"

export default function useQueryOrderItems(orderItemId?: string) {
  const query = useQuery(
    ["itemsOrder", orderItemId],
    async (): Promise<OrderItems> => {
      const res = await fetch(`http://localhost:3000/items?id=${orderItemId}`, {
        headers: {
          'x-error': 'true'
        }
      })
      const data = await res.json()
      if (res.status >= 500) throw new Error(data.error + '. Server failed to return Items Data')
      if (res.status === 404) throw new Error(data.error + `. Item lists with ID ${orderItemId} not found`)
      return data[0]
    },
    {
      staleTime: Infinity,
      enabled: Boolean(orderItemId),
      useErrorBoundary: true,
      retry: 3
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
    ['mutateItem'],
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
      onSettled: (data) => {
        if (data?.id) {
          queryClient.invalidateQueries(["itemsOrder", data.id])
        }
      }
    },
  )

  return itemMutation
}
