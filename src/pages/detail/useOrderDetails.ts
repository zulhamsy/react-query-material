import { useQuery } from "@tanstack/react-query"
import { SalesOrder } from "types/sales"

export default function useOrderDetails(orderId?: string) {
  const query = useQuery(
    ["orderDetails", orderId],
    async (): Promise<SalesOrder> => {
      const res = await fetch(`http://localhost:3000/order?OrderId=${orderId}`)
      const data = await res.json()
      return data[0]
    },
    {
      staleTime: Infinity,
      enabled: Boolean(orderId),
    },
  )

  return query
}
