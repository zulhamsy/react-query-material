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
import useItemStore from "./useItemsStore.ts"
import { useEffect } from "react"

export default function ListItems({ id }: { id?: string }) {
  // query
  const salesOrderQuery = useOrderDetails(id)
  const orderItemsQuery = useItemOrder(salesOrderQuery.data?.OrderItemsId)
  // query data
  const { data: salesData } = salesOrderQuery
  const { data: itemsData, isLoading: itemsLoading } = orderItemsQuery
  // store-related
  const initializeStore = useItemStore((state) => state.init)
  const resetStore = useItemStore((state) => state.reset)
  const items = useItemStore((state) => state.Items)
  const deleteItemById = useItemStore((state) => state.deleteItemById)

  useEffect(() => {
    if (itemsData) initializeStore(itemsData)
    return resetStore
  }, [itemsData])
  return (
    <Paper elevation={0} sx={{ width: "fit-content", bgcolor: "inherit" }}>
      <Typography variant="body1" color="#64748b" fontWeight={600} mb={2}>
        List of Items{" "}
        <Typography component="span" fontWeight={600} color="primary">
          {salesData ? "#" + salesData.id : "..."}
        </Typography>
      </Typography>
      <TableContainer component={Paper} elevation={2} sx={{ mb: 2 }}>
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
            {!itemsData && itemsLoading ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography variant="overline" color="#64748b">
                    Getting list of items...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : !items.length && !itemsLoading ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography variant="overline" color="#64748b">
                    No items...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : null}
            {items.map((item) => (
              <TableRow key={item.id}>
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
                    <IconButton onClick={() => deleteItemById(item.id)}>
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
        <Button
          variant="outlined"
          startIcon={<AddRounded />}
          sx={{ float: "right" }}
        >
          Add Items
        </Button>
      )}
    </Paper>
  )
}
