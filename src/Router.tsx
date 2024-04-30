import { Suspense, lazy, useMemo } from "react"
import {   createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom"
import Redirect from "./components/utility/redirect"

const mainRouter: RouteObject = {
  Component: lazy(() => import("./components/layouts/dashboard-layouts")),
  children: [
    {
      path: "/",
      Component: lazy(() => import("@/pages/dashboard") as never),
    },
    {
      path: "*",
      element: <Redirect to="/auth/login" replace />,
    },
  ],
}

const authRouter: RouteObject = {
  Component: lazy(() => import("./components/layouts/auth-layouts")),
  children: [
    {
      path: "auth/login",
      Component: lazy(() => import("@/pages/auth/login") as never),
    },
    {
      path: "*",
      element: <Redirect to="/auth/login" replace />,
    },
  ],
}

const Router = () => {
	const { isLoggedIn } = { isLoggedIn: true}

	const router = useMemo(() => {
    return createBrowserRouter([!isLoggedIn ? authRouter : mainRouter]);
  }, [isLoggedIn])

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<RouterProvider router={router} />
		</Suspense>
	)
}

export default Router