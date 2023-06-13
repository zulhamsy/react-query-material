import { useParams } from "react-router-dom"
import { Paper, Typography } from "@mui/material"
import ListItems from "./ListItems"
import ShipmentAddress from "./ShipmentAddress"
import useOrderDetails from "./useOrderDetails"
import useItemOrder from "./useItemOrder"

export default function Detail() {
  const { id } = useParams()
  const salesOrderQuery = useOrderDetails(id)
  const orderItemsQuery = useItemOrder(salesOrderQuery.data?.OrderItemsId)
  const { data: itemsData, isLoading: itemsLoading } = orderItemsQuery
  const { data: salesData, isLoading: salesLoading } = salesOrderQuery
  const priceTotal =
    itemsData?.Items.reduce((acc, curr) => acc + curr.LineTotal, 0) || 0
  const totalByRespon = salesData?.TotalAmount || 0
  return (
    <Paper
      square
      elevation={0}
      sx={{
        minHeight: "90vh",
        backgroundColor: "#f1f5f9",
        px: 5,
        py: 4,
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gridTemplateRows: "repeat(2, minmax(auto, 1fr))",
        gap: 4,
      }}
    >
      <ListItems id={id} />
      <ShipmentAddress id={id} />
      <Paper
        elevation={0}
        sx={{ gridColumn: 2, gridRow: "1/3", backgroundColor: "inherit" }}
      >
        <Typography variant="body1" color="#64748b" fontWeight={600} mb={2}>
          Order Summary
        </Typography>
        <Paper variant="outlined" sx={{ p: 2, width: "75%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <Typography variant="body1" color="#475569">
              Price total ({itemsData?.Items.length} items)
            </Typography>
            <Typography variant="body1" color="#1e293b" fontWeight={600}>
              {!itemsLoading ? `$${priceTotal}` : "Calculating..."}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <Typography variant="body1" color="#475569">
              Insurance Cost
            </Typography>
            <Typography variant="body1" color="#1e293b" fontWeight={600}>
              {itemsLoading || salesLoading
                ? "Calculating..."
                : `$${totalByRespon - priceTotal}`}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1" color="#475569" fontWeight={600} pl={2}>
              Total
            </Typography>
            <Typography variant="body1" color="primary" fontWeight={600}>
              {itemsLoading || salesLoading ? "..." : `$${totalByRespon}`}
            </Typography>
          </div>
          {/* Payment Details */}
          <Typography variant="body1" color="#94a3b8" mt={3}>
            Payment Details
          </Typography>
        </Paper>
      </Paper>
    </Paper>
  )
}
