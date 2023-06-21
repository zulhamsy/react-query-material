import { useEffect, useState } from "react"
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material"
import useItemStore from "./useItemsStore"

export default function ModalAddEdit({
  dialogOpen,
  setDialogOpen,
  editedId,
}: {
  dialogOpen: boolean
  setDialogOpen: React.Dispatch<typeof dialogOpen>
  editedId: string
}) {
  const {
    getItemById: getEditedItem,
    addNewItem,
    editItemById,
  } = useItemStore((state) => state.action)
  const [productName, setProductName] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    if (editedId) {
      const editedItem = getEditedItem(editedId)
      setProductName(editedItem.ProductName)
      setQuantity(editedItem.Quantity)
      setPrice(editedItem.UnitPrice)
      return
    }
    setProductName("")
    setQuantity(1)
    setPrice(0)
  }, [editedId])

  function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (editedId) {
      editItemById({
        ProductId: editedId,
        Quantity: quantity,
        UnitPrice: price,
      })
    } else {
      addNewItem({
        ProductName: productName,
        Quantity: quantity,
        UnitPrice: price,
      })
    }
    setDialogOpen(false)
  }

  return (
    <Dialog open={dialogOpen}>
      <DialogTitle>
        {editedId ? `Edit Items #${editedId}` : "Add New Items"}
      </DialogTitle>
      <Box
        p={3}
        pt={1}
        display="flex"
        flexDirection="column"
        gap={3}
        component={"form"}
        onSubmit={handleSubmitForm}
      >
        <TextField
          id="productName"
          label="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          autoComplete="off"
          disabled={Boolean(editedId)}
        />
        <TextField
          id="quantity"
          label="Quantity"
          type="number"
          value={quantity.toString()}
          onChange={(e) => {
            if (Number(e.target.value) < 1) return
            setQuantity(Number(e.target.value))
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">pcs</InputAdornment>,
          }}
          inputProps={{
            style: {
              MozAppearance: "textfield",
            },
          }}
        />
        <TextField
          id="price"
          label="Price"
          type="number"
          value={price.toString()}
          onChange={(e) => {
            if (Number(e.target.value) < 0) return
            setPrice(Number(e.target.value))
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          inputProps={{
            style: {
              MozAppearance: "textfield",
            },
          }}
        />
        <Box display="flex" gap={2} justifyContent="center" mt={3}>
          <Button
            sx={{ display: "block" }}
            variant="contained"
            size="large"
            type="submit"
          >
            {editedId ? "Save Changes" : "Add Items"}
          </Button>
          <Button
            sx={{ display: "block" }}
            size="large"
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
