import { ReactNode, useContext } from "react"
import { AuthContext } from "../context/AuthContext";

type ProtectedRouteProps ={
    children:ReactNode
}

function ProtectedRoute({children}:ProtectedRouteProps) {
    // console.log("Protected children", children);
    // 9. Subscribe to the context and use the elements available
    const {user} = useContext(AuthContext)
  return (
    <>
    <h6>Inside a protected Route</h6>
    {user ? children : <h2>You have to login to view this information</h2> }
    </>
    
  )
}

export default ProtectedRoute