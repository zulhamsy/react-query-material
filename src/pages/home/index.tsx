import {
  Paper,
  Button,
  Chip,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import useHeader from "./useHeader"

export default function Home() {
  const navigate = useNavigate()
  const headerQuery = useHeader()
  return (
    <Paper
      square
      elevation={0}
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f1f5f9",
      }}
    >
      <div>
        <Typography
          variant="h4"
          variantMapping={{ h4: "h1" }}
          fontWeight={500}
          color="#94a3b8"
          textAlign="center"
          marginBottom={4}
        >
          Sales Summary
        </Typography>
        {headerQuery.data ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    "& .MuiTableCell-root": {
                      fontWeight: 600,
                    },
                  }}
                >
                  <TableCell>#</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {headerQuery.data.map((sale, index) => (
                  <TableRow key={sale.OrderId}>
                    <TableCell>{index + 1 + "."}</TableCell>
                    <TableCell>{sale.CustomerName}</TableCell>
                    <TableCell align="left">
                      <Chip
                        label={sale.OrderStatus}
                        size="small"
                        color={
                          sale.OrderStatus === "Shipped" ? "info" : "default"
                        }
                        variant={
                          sale.OrderStatus === "Pending" ? "outlined" : "filled"
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 8,
                        }}
                      >
                        <span>$</span>
                        <span>{sale.TotalAmount}</span>
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => navigate(`/detail/${sale.OrderId}`)}
                      >
                        See Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div>
            <Skeleton
              variant="rectangular"
              width={507}
              height={57}
              sx={{ marginBottom: 1 }}
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              width={507}
              height={694}
              animation="wave"
            />
          </div>
        )}
      </div>
    </Paper>
  )
}
