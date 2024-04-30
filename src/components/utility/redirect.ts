import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Redirect = ({ to, replace }: { to: string; replace?: boolean }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, { replace });
  }, [navigate, replace, to]);

  return null
};

export default Redirect
