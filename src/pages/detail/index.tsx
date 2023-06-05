import { useParams } from "react-router-dom"
import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material"
import { AddRounded, EditRounded, Delete } from "@mui/icons-material"
import useOrderDetails from "./useOrderDetails"
import useItemOrder from "./useItemOrder.ts"

export default function Detail() {
  const { id } = useParams()
  const salesOrderQuery = useOrderDetails(id)
  const orderItemsQuery = useItemOrder(salesOrderQuery.data?.OrderItemsId)
  const { data: salesData } = salesOrderQuery
  const { data: itemsData, isLoading: itemsLoading } = orderItemsQuery
  return (
    <Paper
      square
      elevation={0}
      sx={{
        minHeight: "90vh",
        backgroundColor: "#f1f5f9",
        px: 8,
        py: 10,
      }}
    >
      <Paper
        elevation={0}
        sx={{ width: "fit-content", px: 4, py: 3, bgcolor: "inherit" }}
      >
        <Typography color="#64748b" fontWeight={600} mb={2}>
          List of items {salesData ? "#" + salesData.OrderId : "..."}
        </Typography>
        <TableContainer component={Paper} elevation={1} sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  "& .MuiTableCell-root": {
                    fontWeight: 600,
                  },
                }}
              >
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsData?.Items.map((item) => (
                <TableRow key={item.ProductId}>
                  <TableCell>{item.ProductName}</TableCell>
                  <TableCell align="right">{item.Quantity} pcs</TableCell>
                  <TableCell align="right">${item.UnitPrice}</TableCell>
                  <TableCell align="right">${item.LineTotal}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton>
                        <EditRounded fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {itemsLoading ? null : (
          <Button variant="outlined" startIcon={<AddRounded />}>
            Add Items
          </Button>
        )}
      </Paper>
    </Paper>
  )
}
