import { useQuery } from "@tanstack/react-query"
import { Header } from "types/sales"

export default function useHeader() {
  const query = useQuery(
    ["header"],
    async (): Promise<Header[]> => {
      const res = await fetch("http://localhost:3000/header")
      return res.json()
    },
    {
      staleTime: Infinity,
    },
  )

  return query
}
