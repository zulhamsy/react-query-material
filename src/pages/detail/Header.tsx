import { Button, Snackbar } from "@mui/material"
import useItemStore from "./useStoreItems"
import { useMutateItem } from "./useQueryOrderItems"
import { useState } from "react"
import { useIsFetching, useIsMutating } from "@tanstack/react-query"

export default function Header() {
  const isItemsChanged = useItemStore((state) => state.isChanged)
  const isFetchingItems = useIsFetching(['itemsOrder'])
  const isMutatingItems = useIsMutating(['mutateItem'])
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
          disabled={Boolean(isFetchingItems) || Boolean(isMutatingItems)}
          onClick={() =>
            itemsMutation.mutate(undefined, {
              onSuccess: () => setShowAlert(true),
            })
          }
        >
          {isMutatingItems ? 'Loading' : "Apply Changes"}
        </Button>
      ) : null}
    </div>
  )
}
