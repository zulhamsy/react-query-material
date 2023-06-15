import { Button } from "@mui/material"
import useItemStore from "./useItemsStore"
import { useMutateItem } from "./useItemOrder"

export default function Header() {
  const { isItemsChanged, itemsId } = useItemStore((state) => ({
    isItemsChanged: state.isChanged,
    itemsId: state.id,
  }))
  const itemsMutation = useMutateItem()
  return (
    <div
      style={{
        marginBottom: "2rem",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {isItemsChanged ? (
        <Button
          variant="contained"
          onClick={() => itemsMutation.mutate(itemsId)}
        >
          Apply Changes
        </Button>
      ) : null}
    </div>
  )
}
