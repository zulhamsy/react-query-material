import { useParams } from "react-router-dom"
import { Button, Paper } from "@mui/material"
import ListItems from "./ListItems"
import ShipmentAddress from "./ShipmentAddress"
import useItemStore from "./useItemsStore"
import OrderSummary from "./OrderSummary"

export default function Detail() {
  const { id } = useParams()
  // store related
  const isChanged = useItemStore((state) => state.isChanged)
  return (
    <Paper
      elevation={0}
      sx={{
        minHeight: "90vh",
        backgroundColor: "#f1f5f9",
        px: 5,
        py: 4,
      }}
    >
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {isChanged ? <Button variant="contained">Apply Changes</Button> : null}
      </div>
      <Paper
        square
        elevation={0}
        sx={{
          backgroundColor: "inherit",
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gridTemplateRows: "repeat(2, minmax(auto, 1fr))",
          gap: 4,
        }}
      >
        <ListItems id={id} />
        <ShipmentAddress id={id} />
        <OrderSummary id={id} />
      </Paper>
    </Paper>
  )
}
