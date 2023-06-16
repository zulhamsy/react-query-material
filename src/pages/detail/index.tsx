import { useParams } from "react-router-dom"
import { Paper } from "@mui/material"
import ListItems from "./ListItems"
import ShipmentAddress from "./ShipmentAddress"
import OrderSummary from "./OrderSummary"
import Header from "./Header"

export default function Detail() {
  const { id } = useParams()

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
      <Header />
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
