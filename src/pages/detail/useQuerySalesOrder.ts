import { useQuery } from "@tanstack/react-query"
import { SalesOrder } from "types/sales"

export default function useQuerySalesOrder(orderId?: string) {
  const query = useQuery(
    ["orderDetails", orderId],
    async (): Promise<SalesOrder> => {
      const res = await fetch(`http://localhost:3000/order?id=${orderId}`)
      const data = await res.json()
      if (res.status !== 200) throw new Error(data.error)
      return data[0]
    },
    {
      staleTime: Infinity,
      enabled: Boolean(orderId),
      retry: 1,
      useErrorBoundary: true
    },
  )

  return query
}
