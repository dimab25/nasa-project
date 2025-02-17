import { Link } from "react-router"

function ErrorPage() {
  return (
    <div className="profileContainer" style={{textAlign:"center"}}>
      <h5>🚀 404: Lost in Space! </h5>
     <h6>Uh-oh! It looks like you've drifted into the void. The page you're looking for is either light-years away or doesn't exist.</h6>
    
    <Link to={"/"}><p>🔭 Here you can navigate back home.</p></Link> 
    </div>
  )
}

export default ErrorPage