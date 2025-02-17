import { useContext } from "react";
// import homeImage from "../images/PIA08653.jpg"
import { AuthContext } from "../context/AuthContext";
import animation from "../images/animationSpace.mp4";
import { Link } from "react-router";

function Home() {
  // Subscribe Home to context

  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="homeContainer">
        {user ? (
          <div className="overlayHome">
            <p> Welcome </p>
            <p>Human Species {user.email} </p>
            <p>to Uniscope.</p>
            <p>Ready to explore?</p>
            <Link to={"/about"}>
            <button>Klick here</button></Link>
          </div>
        ) : (
          <div className="overlayHome">
            <p>Welcome to NasaPage.</p>

            <p>Ready to explore?</p>
            <Link to={"/about"}>
            <button>Klick here</button></Link>
          </div>
        )}

        <video
          className="animation"
          src={animation}
          autoPlay
          loop
          muted
        ></video>
      </div>
    </>
  );
}

export default Home;
