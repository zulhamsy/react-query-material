import { Alert, AlertTitle } from "@mui/material"
import useQueryOrderItems from "./useQueryOrderItems"
import useQuerySalesOrder from "./useQuerySalesOrder"

export default function AlertReconnect({ id }: { id?: string }) {
	const { failureCount: orderFailureCount, data } = useQuerySalesOrder(id)
	const { failureCount: itemFailureCount } = useQueryOrderItems(data?.OrderItemsId)
	return (
		<>
			{
				orderFailureCount || itemFailureCount ? (
					<Alert severity="info">
						<AlertTitle>Reconnecting...</AlertTitle>
						Trying to get {orderFailureCount ? "Order's" : "Item's"} Data ({orderFailureCount || itemFailureCount}x)
					</Alert>
				) : null
			}
		</>
	)
}
