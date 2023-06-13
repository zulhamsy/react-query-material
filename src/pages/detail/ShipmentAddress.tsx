import { Chip, Paper, Typography } from "@mui/material"
import useOrderDetails from "./useOrderDetails"

export default function ShipmentAddress({ id }: { id?: string }) {
  const salesOrderQuery = useOrderDetails(id)
  return (
    <Paper elevation={0} sx={{ backgroundColor: "inherit", gridColumn: 1 }}>
      <Typography variant="body1" color="#64748b" fontWeight={600} mb={1}>
        Shipping Address
      </Typography>
      {salesOrderQuery.isLoading && !salesOrderQuery.data ? (
        <Typography variant="overline" color="#64748b">
          Finding address...
        </Typography>
      ) : null}
      {salesOrderQuery.data ? (
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "inherit",
            px: 3,
            py: 2,
            width: "fit-content",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "1",
              }}
            >
              <Typography
                variant="body1"
                color="#475569"
                fontWeight={700}
                component="p"
                mb={1}
              >
                {salesOrderQuery.data?.CustomerName}{" "}
              </Typography>
              <Chip
                label={<Typography variant="caption">Primary</Typography>}
                color="primary"
                size="small"
              />
            </div>
            <Typography variant="body2" color="#64748b">
              {salesOrderQuery.data?.ShippingAddress.Street},{" "}
              {salesOrderQuery.data?.ShippingAddress.City},{" "}
              {salesOrderQuery.data?.ShippingAddress.State}
            </Typography>
            <Typography variant="body2" color="#64748b">
              {salesOrderQuery.data?.ShippingAddress.ZipCode}
            </Typography>
            <Typography variant="body2" color="#64748b">
              {salesOrderQuery.data?.ShippingAddress.Country}
            </Typography>
          </div>
        </Paper>
      ) : null}
    </Paper>
  )
}
