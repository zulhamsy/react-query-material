import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "page/home"
import Detail from "page/detail"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
  {
    path: "*",
    element: <div>404 Page Not Found</div>,
  },
])

export default function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}
