import { Button, Snackbar } from "@mui/material"
import useItemStore from "./useItemsStore"
import { useMutateItem } from "./useItemOrder"
import { useState } from "react"

export default function Header() {
  const { isItemsChanged, itemsId } = useItemStore((state) => ({
    isItemsChanged: state.isChanged,
    itemsId: state.id,
  }))
  const itemsMutation = useMutateItem()
  const [showAlert, setShowAlert] = useState(false)
  return (
    <div
      style={{
        marginBottom: "2rem",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Snackbar
        open={showAlert}
        autoHideDuration={2000}
        onClose={() => setShowAlert(false)}
        message="Perubahan tersimpan"
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      />
      {isItemsChanged ? (
        <Button
          variant="contained"
          onClick={() =>
            itemsMutation.mutate(itemsId, {
              onSuccess: () => setShowAlert(true),
            })
          }
        >
          Apply Changes
        </Button>
      ) : null}
    </div>
  )
}
