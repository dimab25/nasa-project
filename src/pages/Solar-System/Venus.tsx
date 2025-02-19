import { Link } from "react-router";
import useFetchHook from "../../hooks/useFetchHook";
import { Bodies } from "../../types/customTypes";
import { Button } from "react-bootstrap";
import { useEffect, useRef } from "react";


function Venus() {
  const { data } = useFetchHook<Bodies>(
    "https://api.le-systeme-solaire.net/rest/bodies/venus"
  );
 const topElement = useRef<HTMLDivElement | null>(null)
     useEffect(() => {
         
         if (topElement) {
            topElement.current?.scrollIntoView({
           behavior: 'smooth',
           block: 'start',
           inline: 'nearest',
         });
         }
        
       }, []);
 
  return (
    <>
     
      <div className="singlePlanetContainer" ref={topElement}>
      <div className="headlinePlanet">
          <Link to={`/uranus`}>
          <Button variant="outline-success"  >{"<"} </Button>
          </Link>
          <h2>{data?.englishName} </h2>{" "}
          <Link to={`/earth`}>
          <Button variant="outline-success"  >{">"} </Button>
          </Link>{" "}
        </div>
        <p>
          Definition: Often called Earth's "twin" because of its similar size,
          Venus has a thick atmosphere of carbon dioxide, creating a runaway
          greenhouse effect that makes it the hottest planet in the solar
          system. It also rotates in the opposite direction of most planets.
        </p>
        <p>Gravity: {data?.gravity}</p>
        <p>Radius: {data?.equaRadius} kilometres</p>
        {data?.isPlanet === true ? <p>Type: Planet</p> : <p>Type: Moon</p>}
       
          <p>Moons: none</p>
        

        <div className="iframeContainer">
          <iframe
            src="https://eyes.nasa.gov/apps/solar-system/#/venus?featured=false&detailPanel=false&logo=false&search=false&shareButton=false&menu=false&collapseSettingsOptions=true&hideFullScreenToggle=true&locked=true&hideExternalLinks=true"
            style={{ height: "500px", width: "100%" }}
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default Venus;
