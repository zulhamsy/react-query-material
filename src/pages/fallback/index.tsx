import { Box, Button, Paper, Typography } from "@mui/material";

export default function FallbackError({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
	// console.log(error)
	return (
		<Box minHeight='100vh' width='100%' display="flex" justifyContent="center" alignItems="center" bgcolor="#e2e8f0">
			<Box textAlign="center">
				<Typography variant="h2" fontWeight={500} color="#334155" gutterBottom>F*ck!</Typography>
				<Typography variant="subtitle1" color="#64748b" component="p" mb={6}>Something goes wrong. Please refresh or contact Administrator</Typography>
				<Paper sx={{
					textAlign: 'left',
					bgcolor: '#f1f5f9',
					p: 2,
					mb: 3
				}} elevation={0}>
					<Typography variant="subtitle2" component="p" color="#64748b" mb={1}>Possible cause :</Typography>
					<Typography variant="subtitle2" component="p" color="#334155" maxWidth='60ch'>{error.message}</Typography>
				</Paper>
				<Button variant="outlined" onClick={resetErrorBoundary}>Try again</Button>
			</Box>
		</Box>
	)
}
