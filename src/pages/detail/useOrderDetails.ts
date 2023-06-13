import { useQuery } from "@tanstack/react-query"
import { SalesOrder } from "types/sales"

export default function useOrderDetails(orderId?: string) {
  const query = useQuery(
    ["orderDetails", orderId],
    async (): Promise<SalesOrder> => {
      try {
        const res = await fetch(
          `http://localhost:3000/order?OrderId=${orderId}`,
        )
        const data: SalesOrder[] = await res.json()
        if (data.length) return data[0]
        throw new Error("Data not found")
      } catch (err) {
        throw new Error("Data not found")
      }
    },
    {
      staleTime: Infinity,
      enabled: Boolean(orderId),
      retry: 3,
    },
  )

  return query
}
