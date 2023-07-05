import { useQuery } from "@tanstack/react-query"
import { SalesOrder } from "types/sales"

export default function useQuerySalesOrder(orderId?: string) {
  const query = useQuery(
    ["orderDetails", orderId],
    async (): Promise<SalesOrder> => {
      const res = await fetch(`http://localhost:3000/order?id=${orderId}`, {
        headers: {
          'x-error': 'true'
        }
      })
      const data = await res.json()
      if (res.status >= 500) throw new Error(data.error + '. Server failed to return Order Data')
      if (res.status === 404) throw new Error(data.error + `. Order with ID ${orderId} not found`)
      return data[0]
    },
    {
      staleTime: Infinity,
      enabled: Boolean(orderId),
      retry: 3,
      useErrorBoundary: true
    },
  )

  return query
}
