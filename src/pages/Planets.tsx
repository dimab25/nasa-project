import mercury from "../images/mercury.jpg";
import earth from "../images/earth.webp";
import venus from "../images/venus.webp";
import uranus from "../images/uranus.jpg";
import pluto from "../images/pluto.jpg";

function Planets() {
  

  fetch('https://api.le-systeme-solaire.net/rest/bodies/')
  .then((response) => response.json())
  .then((data) => {
    
    const planets = data.bodies.filter(body => body.isPlanet);
    console.log(planets);  


  });

  return (
    <div className="planetsContainer">
      <div className="planetsDiv">
         <img src={mercury} alt="" style={{ width: "300px" }}/>
         <h6>Titel</h6>
         <p>Informations</p>
         <p>Details</p>
      </div>
      <div> <img src={earth} alt="" style={{ width: "300px" }}/><h6>Titel</h6>
         <p>Informations</p>
         <p>Details</p></div>
      <div><img src={venus} alt="" style={{ width: "300px" }}/><h6>Titel</h6>
         <p>Informations</p>
         <p>Details</p></div>
      <div><img src={uranus} alt="" style={{ width: "300px" }}/><h6>Titel</h6>
         <p>Informations</p>
         <p>Details</p></div>
      <div><img src={pluto} alt="" style={{ width: "300px" }}/><h6>Titel</h6>
         <p>Informations</p>
         <p>Details</p></div>
    
    </div>

  )
}

export default Planets