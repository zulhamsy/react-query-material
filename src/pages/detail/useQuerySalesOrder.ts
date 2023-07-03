import { useQuery } from "@tanstack/react-query"
import { SalesOrder } from "types/sales"

export default function useQuerySalesOrder(orderId?: string) {
  const query = useQuery(
    ["orderDetails", orderId],
    async (): Promise<SalesOrder> => {
      const res = await fetch(`http://localhost:3000/order?id=${orderId}`)
      const data: SalesOrder[] = await res.json()
      if (data.length) return data[0]
      throw new Error("Data not found")
    },
    {
      staleTime: Infinity,
      enabled: Boolean(orderId),
      retry: 1,
    },
  )

  return query
}
