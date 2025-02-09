import { useContext } from "react"
import homeImage from "../images/PIA08653.jpg"
import { AuthContext } from "../context/AuthContext"


function Home() {
  // Subscribe Home to context

  const {user} =useContext (AuthContext)

  return (
    <>
    {user?  <h6>Welcome {user.email}</h6> : <h6>No user logged in</h6>}
   
    <div><img src={homeImage} alt="" style={{ width: "300px" }}/></div>
    
    </>
  )
}

export default Home