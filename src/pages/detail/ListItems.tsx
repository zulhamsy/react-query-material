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
import useOrderDetails from "./useQuerySalesOrder.ts"
import useQueryOrderItems from "./useQueryOrderItems.ts"
import useStoreItem from "./useStoreItems.ts"
import { useEffect, useState } from "react"
import { shallow } from "zustand/shallow"
import ModalAddEdit from "./ModalAddEdit.tsx"

export default function ListItems({
  id,
}: {
  id?: string
}) {
  console.info('Lists Render')
  // query
  const salesOrderQuery = useOrderDetails(id)
  const orderItemsQuery = useQueryOrderItems(salesOrderQuery.data?.OrderItemsId)
  // query data
  const { data: salesData } = salesOrderQuery
  const { data: itemsData, isLoading: itemsLoading, isRefetching } = orderItemsQuery
  // store-related
  const {
    init: initializeStore,
    reset: resetStore,
    deleteItemById,
  } = useStoreItem((state) => state.action, shallow)
  const items = useStoreItem((state) => state.Items)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editedId, setEditedId] = useState("")

  function handleEditOnItem(id: string) {
    setDialogOpen(true)
    setEditedId(id)
  }

  function handleAddOnItems() {
    setDialogOpen(true)
    setEditedId("")
  }

  useEffect(() => {
    if (itemsData) {
      initializeStore(itemsData)
    }
  }, [itemsData, initializeStore])

  // place cleanup fn in separate useEffect -> rule of thumb
  useEffect(() => {
    return resetStore
  }, [resetStore])
  return (
    <Paper elevation={0} sx={{ width: "fit-content", bgcolor: "inherit" }}>
      <Typography variant="body1" color="#64748b" fontWeight={600} mb={2}>
        List of Items{" "}
        <Typography component="span" fontWeight={600} color="primary">
          {salesData ? "#" + salesData.id : "..."}
        </Typography>
      </Typography>
      {
        isRefetching ? (
          <Typography variant="overline" color="primary">Updating lists...</Typography>
        ) : null
      }
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
              <TableRow key={item.ProductId}>
                <TableCell>{item.ProductName}</TableCell>
                <TableCell align="right">{item.Quantity} pcs</TableCell>
                <TableCell align="right">${item.UnitPrice}</TableCell>
                <TableCell align="right">${item.LineTotal}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEditOnItem(item.ProductId)} disabled={isRefetching}>
                      <EditRounded fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => deleteItemById(item.ProductId)} disabled={isRefetching}>
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
          onClick={handleAddOnItems}
          disabled={isRefetching}
        >
          Add Items
        </Button>
      )}
      <ModalAddEdit
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        editedId={editedId}
      />
    </Paper>
  )
}
