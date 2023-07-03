import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "page/home"
import Detail from "page/detail"
import { ErrorBoundary } from "react-error-boundary"
import FallbackError from "page/fallback"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detail/:id",
    element: <ErrorBoundary fallbackRender={FallbackError}><Detail /></ErrorBoundary>,
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
