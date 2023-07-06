import { Button, Snackbar } from "@mui/material"
import useItemStore from "./useStoreItems"
import { useMutateItem } from "./useQueryOrderItems"
import { useState } from "react"
import { useIsFetching } from "@tanstack/react-query"

export default function Header() {
  const isItemsChanged = useItemStore((state) => state.isChanged)
  const isFetchingItems = useIsFetching(['itemsOrder'])
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
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      />
      {isItemsChanged ? (
        <Button
          variant="contained"
          disabled={Boolean(isFetchingItems)}
          onClick={() =>
            itemsMutation.mutate(undefined, {
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
