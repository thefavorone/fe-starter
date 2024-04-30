import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <main className="flex-grow">
      <Outlet />
    </main>
  )
}

export default AuthLayout
