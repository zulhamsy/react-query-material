
export default function FallbackError({ error }: { error: Error }) {
	// console.log(error)
	return (
		<div>Something error {error.message}</div>
	)
}
