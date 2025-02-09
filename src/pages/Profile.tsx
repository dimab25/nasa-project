import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"


function Profile() {
 const {user} =useContext (AuthContext)

  return (
    <>
    <h5>Here you can find your account informations.</h5>
    <h6>User E-Mail: {user?.email}</h6>
    <h6>{user?.id}</h6>
    <h6>{user?.userName}</h6>
    </>
  )
}

export default Profile