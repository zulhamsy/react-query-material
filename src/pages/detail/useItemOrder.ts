import { useQuery } from "@tanstack/react-query"
import { OrderItems } from "types/sales"

export default function useItemOrder(orderItemId?: string) {
  const query = useQuery(
    ["itemsOrder", orderItemId],
    async (): Promise<OrderItems> => {
      const res = await fetch(
        `http://localhost:3000/items?OrderItemsId=${orderItemId}`,
      )
      const data = await res.json()
      return data[0]
    },
    {
      staleTime: Infinity,
      enabled: Boolean(orderItemId),
    },
  )

  return query
}
